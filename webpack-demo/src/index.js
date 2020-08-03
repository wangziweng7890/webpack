import './index.css';
// import './index2.css';
// import './testless.less';
import { add, add2 } from './math';
import imgsrc from './screenshot.png';
// import Vue from 'vue';
// new Vue({
//     template: '<div>{{name}}</div>',
//     data() {
//         return {
//             name: 'wangziwen'
//         }
//     },
//     el: '#app'
// })
// import $ from 'jquery';
// import _ from 'lodash';
// import moment from 'moment';
// moment.locale('zh-cn'); 
// console.log(moment("20111031", "YYYYMMDD").fromNow())
// add(1,2)
// add2(2,1)
// if (module.hot) {
//     module.hot.accept('./print.js', function () {
//         console.log('ACCEPT THE UPDATE PRINT MODULE');
//         print()
//     })
// }
document.body.appendChild(component());
function component() {
    var element = document.createElement('div');

    // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
    element.innerHTML = '12345fdsv'
    element.click = function (params) {
        import('./print.js').then((module) => {
            mudule.print()
        })
    }
    return element;
}

// testImportSrc();
function testImportSrc() {
    let img = new Image();
    img.src = imgsrc;
    img.onload = function () {
        document.body.appendChild(img);
    };
}
// testStringSrc();
function testStringSrc() {
    const divBox = document.createElement('div');
    divBox.innerHTML = `<img src=${imgsrc} />`;
    document.body.appendChild(divBox);
}

function $ajax(url) {
    var xml = new XMLHttpRequest();
    xml.open('get', url, true);
    xml.send();
    xml.onload = function () {
        document.body.innerText = xml.response
        console.log(xml.response)
    }
}
// $ajax('/api/login');
// $ajax('/api/logout');
// $ajax('/api/test');

console.log(process.env.NODE_ENV);
[1,2,3,4].map(v=>console.log(v));
() =>{console.log(123)}
Object.assign({},{})
class A {
    constructor(name) {
        this.name = name
    }
}
