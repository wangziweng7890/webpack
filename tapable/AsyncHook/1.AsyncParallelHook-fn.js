class AsyncParallelHook { //异步钩子
    constructor(...args) {
        this.hooks = []
    }
    tapPromise(name, fn) {
        this.hooks.push(fn)
    }
    promise(...args) {
        let tasks = this.hooks.map(v=>{
            return v(...args);
        })
        return Promise.all(tasks)
    }
}
let hook = new AsyncParallelHook(['name']);
hook.tapPromise('vue', (name) => {
    return new Promise((res) => {
        setTimeout(() => {
            console.log(name);
            res()
        }, 1000);
    })
});
hook.tapPromise('react', (name) => {
    return new Promise((res) => {
        setTimeout(() => {
            console.log(name);
            res()
        }, 1000);
    })
});
hook.promise('test').then((value) => {
    console.log('end')
})