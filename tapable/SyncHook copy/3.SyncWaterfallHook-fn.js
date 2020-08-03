//上一个回调的返回值作为参赛传入下一个回调
class SyncWaterfallHook { 
constructor(...args) {
        this.hooks = []
    }
    tap(name, fn) {
        this.hooks.push(fn)
    }
    call(...args) {
        let [first, ...others] = this.hooks;
        let ret = first(...args);
        others.reduce((pre, next) => {
            return ret = next(ret);
        }, ret)
    }
}
let hook = new SyncWaterfallHook(['name']);
hook.tapAsync('vue', (name) => {
    console.log(name);
    return 1
});
hook.tapAsync('react', (name) => {
    console.log(name);
    return 2;
});
hook.tapAsync('node', (name) => console.log(name));
hook.call('test')