let path = require('path');
let {parse} = require('babylon');
let traverse = require('@babel/traverse').default;
let generate = require('@babel/generator').default;
let types = require('@babel/types');
let ejs = require('ejs');
let fs = require('fs');
const { SyncHook } = require('tapable')
module.exports = class Compiler {
    constructor(config) {
        this.config = config;
        //保存入口文件路径
        this.entry = config.entry;
        //保存所有模块依赖
        this.modules = {};
        this.entryId;
        this.assets = {};
        this.root = process.cwd();
        this.hooks = {
            entryOption: new SyncHook(),
            compile: new SyncHook(),
            afterCompile: new SyncHook(),
            afterPlugins: new SyncHook(),
            run: new SyncHook(),
            emit: new SyncHook(),
            done: new SyncHook()
        }
        let plugins = this.config.plugins;
        plugins.forEach(plugin => {
            plugin.apply(this)
        });
        this.callHook('afterPlugins')
    }
    callHook(lifeStyle) {
        this.hooks[lifeStyle].call();
    }
    run() {
        this.callHook('compile');
        //执行并创建文件的依赖关系
        this.buildModule(path.resolve(this.root, this.entry), true);
        this.callHook('afterCompile');

        //发射一个文件，打包后的文件
        this.emitFile();
        this.callHook('emit');
        this.callHook('done');
    }
    //构建模块
    buildModule(modulePath, isEntry) {
        //拿到模块内容和id
        let source = this.getSource(modulePath);
        let moduleName = './' + path.relative(this.root, modulePath);
        //保存入口ID
        if (isEntry) this.entryId = moduleName;
        //解析文件得到包装内容和路径key
        let { resourceCode, dependencies } = this.parse(source, path.dirname(moduleName));
        this.modules[moduleName] = resourceCode;
        dependencies.forEach(v => this.buildModule(path.join(this.root, v), false));
        
    }
    getSource(modulePath) {
        let source = fs.readFileSync(modulePath, 'utf8');
        let rules = this.config.modules.rules;
        for (let index = 0; index < rules.length; index++) {
            const { test, use} = rules[index];
            if (test.test(modulePath)) {
                let i = use.length - 1;
                while (i >= 0) {
                    source = require(use[i--])(source)
                };
                break;
            };
            
        }
        return source;
    } 
    parse(source, parentPath) {
        //babylon解析成ast语法树
        //babylon @babel/traverse @babel/generator   @babel/types
        let ast = parse(source);
        let dependencies = []; //依赖的数组
        traverse(ast, {
            CallExpression(p) {
                let node = p.node;
                if (node.callee.name === 'require') {
                    node.callee.name = '__webpack_require__';
                    let moduleName = node.arguments[0].value;
                    moduleName = moduleName + (path.extname(moduleName) ? '' : '.js');
                    moduleName = './' + path.join(parentPath, moduleName);
                    dependencies.push(moduleName);
                    node.arguments = [types.stringLiteral(moduleName)];
                }
            }
        });
        let resourceCode = generate(ast).code;
        return { resourceCode, dependencies };
    }
    emitFile() {
        let main = path.join(this.config.output.path, this.config.output.filename);
        let templateStr = this.getSource(path.resolve(__dirname, 'main.ejs'));
        let code = ejs.render(templateStr, {
            entryId: this.entryId,
            modules: this.modules
        });
        this.assets[main] = code;
        fs.writeFileSync(main, code);
    }
}