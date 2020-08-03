let loaderUtils = require('loader-utils');
let path = require('path');
let loader = function (resource) {
    let filename = loaderUtils.interpolateName(this, '[hash:8].[ext]', {
        content: resource
    });
    this.emitFile(filename, resource);//发射文件
    return `module.exports="${filename}"`
}
loader.raw = true; //二进制
module.exports = loader;
