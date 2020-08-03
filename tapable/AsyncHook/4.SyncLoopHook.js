const { SyncLoopHook } = require('tapable');
class less {
    constructor() {
        this.hook = {
            arch: new SyncLoopHook(['name'])
        }
    }
    tap() { //注册监听函数
        let index = 0;
        this.hook.arch.tap('vue', (name) => {
            console.log('vue', name);
            return index++ === 3 ? undefined : 1
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