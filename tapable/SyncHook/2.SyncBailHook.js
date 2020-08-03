//返回undefined继续执行，否则中断执行
const { SyncBailHook } = require('tapable');
class less {
    constructor() {
        this.hook = {
            arch: new SyncBailHook(['name'])
        }
    }
    tap() { //注册监听函数
        this.hook.arch.tap('vue', (name) => {
            console.log('vue');
            return true
        });
        this.hook.arch.tap('react', (name) => console.log('react' + name));
    }
    start() {
        this.hook.arch.call('web')
    }

}
let i = new less();
i.tap();
i.start();