let babel = require('@babel/core');
let loaderUtils = require('loader-utils');
module.exports = function (resource) {
    let options = loaderUtils.getOptions(this);
    let cb = this.async();
    babel.transform(resource, {
        ...options,
        sourceMaps: true,
        filename: this.resourcePath
    }, function(err, result) {
        cb(err, result.code)
    })
}