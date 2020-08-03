class AsyncSeriesWaterfallHook { 
    constructor(...args) {
        this.hooks = []
    }
    tapAsync(name, fn) {
        this.hooks.push(fn)
    }
    callAsync(...args) {
        let finallyFn = args.pop();
        let index = 0;
        // let ret;
        let next = (error, data) => {
            if (index === this.hooks.length || error === 'error') return finallyFn();
            this.hooks[index++](data, next);
        };
        next(null, ...args);
    }
}
let hook = new AsyncSeriesWaterfallHook(['name']);
hook.tapAsync('vue', (name, cb) => {
    setTimeout(() => {
        console.log(name);
        cb('error', 'vue')
    }, 1000);
});
hook.tapAsync('react', (name, cb) => {
    setTimeout(() => {
        console.log(name);
        cb(null, 'react')
    }, 1000);
});
hook.tapAsync('node', (name, cb) => {
    setTimeout(() => {
        console.log(name);
        cb(null, 'node')
    }, 1000);
});
hook.callAsync('test', () => console.log('end'))