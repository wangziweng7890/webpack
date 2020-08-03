module.exports = function (source) {
    console.log('css-loader')
    let reg = /url\((.+?)\)/g;
    let pos = 0;
    let current;
    let arr = ['let list = [];'];
    while (current = reg.exec(source)) {
        let [martchUrl, g] = current;
        let last = reg.lastIndex - martchUrl.length;
        arr.push(`list.push(${JSON.stringify(source.slice(pos, last))});`);
        pos = reg.lastIndex;
        arr.push(`var a = require('${g}').default`);
        arr.push(`list.push("url:(" +a+")");`)
    }
    arr.push(`list.push(${JSON.stringify(source.slice(pos))})`);
    arr.push(`module.exports=list.join('')`);
    return arr.join('\r\n');
}