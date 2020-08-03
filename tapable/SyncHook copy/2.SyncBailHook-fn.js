class SyncBailHook { 
    constructor(...args) {
        this.hooks = []
    }
    tap(name, fn) {
        this.hooks.push(fn)
    }
    call(...args) {
        let fns = [...this.hooks];
        let ret;
        do {
            ret = fns.shift()(...args);
        } while (ret === undefined && fns.length);
    }
}
let hook = new SyncBailHook(['name']);
hook.tapAsync('vue', (name) => console.log(name));
hook.tapAsync('react', (name) => {
    console.log(name);
    return false;
});
hook.tapAsync('node', (name) => console.log(name));
hook.call('test')