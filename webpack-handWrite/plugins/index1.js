module.exports = class Plugin1 {
    constructor(config){
        this.config = config;
    }
    apply(compiler) {
        compiler.hooks.compile.tap('emit', () => console.log('compile'))
    }
}