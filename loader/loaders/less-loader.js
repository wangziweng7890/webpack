let less = require('less');
module.exports = function (resource) {
    console.log('less-loader')
    let css = '';
    less.render(resource, (err, result) => {
        css += result.css;
    });
    return css;
}