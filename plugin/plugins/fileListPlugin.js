module.exports = class FileListPlugin {
    constructor(config) {
        this.filename = config.filename;
    }
    apply(compiler) {
        compiler.hooks.emit.tap('FileListPlugin', (compilation) => {
            let assets = compilation.assets;
            let content = `## 文件名    资源大小`;
            Object.entries(assets).forEach(([filename, statObj]) => {
                content += `-  ${filename}  ${statObj.size()}\r\n`;
            });
            assets[this.filename] = {
                source() {
                    return content;
                },
                size() {
                    return content.length
                }
            }
        })
    }
}