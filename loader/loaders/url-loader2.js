let loaderUtils = require('loader-utils');
let mime = require('mime');
function loader (resource) {
    let {limit} = loaderUtils.getOptions(this);
    if (limit && limit > resource.length) {
        return `module.exports="data:${mime.getType(this.resourcePath)};base64,${resource.toString('base64')}"`
    } else {
        require('./file-loader').call(this, resource);
    }
};
loader.raw = true;
module.exports = loader;