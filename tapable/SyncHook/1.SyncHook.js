const { SyncHook } = require('tapable');//同步钩子
class less {
    constructor() {
        this.hook = {
            arch: new SyncHook(['name'])
        }
    }
    tap() { //注册监听函数
        this.hook.arch.tap('vue', (name) => console.log('vue' + name));
        this.hook.arch.tap('react', (name) => console.log('react' + name));
    }
    start() {
        this.hook.arch.call('web')
    }

}
let i = new less();
i.tap();
i.start();