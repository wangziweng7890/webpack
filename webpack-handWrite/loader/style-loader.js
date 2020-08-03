
module.exports = function loader(source) {
    let style = `
        let style = document.createElement('style');
        style.innerHTML = ${JSON.stringify(source)};
        document.body.append(style);
    `;
    return style;
}