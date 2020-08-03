let loaderUtils = require('loader-utils');
require('style-loader')
function loader(resource) {
   
}
loader.pitch = function (remainingRequest) {
    let url = loaderUtils.stringifyRequest(this, '!!' + remainingRequest);
    let str = `
        let content = require(${url});
        let style = document.createElement('style');
        style.innerHTML = content;
        document.body.appendChild(style);
        `
    return str;
}
module.exports = loader;