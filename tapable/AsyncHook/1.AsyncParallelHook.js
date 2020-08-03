const { AsyncParallelHook } = require('tapable');//同步钩子
class less {
    constructor() {
        this.hook = {
            arch: new AsyncParallelHook(['name'])
        }
    }
    tap() { //注册监听函数
        this.hook.arch.tapPromise('vue', (name) => {
            return new Promise((resolve, rej) => {
                setTimeout(() => {
                    console.log('vue')
                    resolve();
                }, 1001);
            })
        });
        this.hook.arch.tapPromise('react', (name) => {
            return new Promise((resolve, rej) => {
                setTimeout(() => {
                    console.log('react', name)
                    resolve();
                }, 1000);
            })
        });
    }
    start() {
        this.hook.arch.promise('web').then(() => console.log('end'))
    }

}
let i = new less();
i.tap();
i.start();