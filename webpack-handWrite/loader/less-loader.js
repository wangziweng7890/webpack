let less = require('less');
module.exports = function loader (resource) {
    let css = '';
    less.render(resource, function (err, c) {
        css = c.css;
        css = css.replace(/\n/g, '\\n')
    });
    return css;
}