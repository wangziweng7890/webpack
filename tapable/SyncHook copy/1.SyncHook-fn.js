class SyncHook { //同步钩子实现
    constructor(...args) {
        this.hooks = []
    }
    tap(name, fn) {
        this.hooks.push(fn)
    }
    call(...args) {
        this.hooks.forEach((fn) => {fn(...args)})
    }
}
let hook = new SyncHook(['name']);
hook.tapAsync('vue', (name) => console.log(name));
hook.call('test')