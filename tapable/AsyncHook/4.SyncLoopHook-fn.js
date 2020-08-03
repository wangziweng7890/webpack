//直到回调返回值为undefined，否则一直执行
class SyncLoopHook { 
    constructor(...args) {
        this.hooks = []
    }
    tap(name, fn) {
        this.hooks.push(fn)
    }
    call(...args) {
        let fns = [...this.hooks];
        let ret;
        let index = 0;
        do {
            ret = fns[index](...args);
            ret === undefined && index ++;
        } while (index !== fns.length);
    }
}
let hook = new SyncLoopHook(['name']);
let index = 0;
hook.tapAsync('vue', (name) => {
    console.log(name);
    index++;
    return index === 3 ? undefined : '继续执行'
});
hook.tapAsync('react', (name) => {
    console.log(name);
});
hook.tapAsync('node', (name) => console.log(name));
hook.call('test')