let fs = require('fs');
let loaderUtils = require('loader-utils');
let validateOptions = require('schema-utils')
module.exports = function (resource) {
    let options = loaderUtils.getOptions(this);
    let cb = this.async();
    validateOptions(schema, options, 'bannel-loader');
    if (options.filename) {
        this.addDependency(options.filename);
        fs.readFile(options.filename, 'utf8', (err, data) => {
            cb(err, `/**${data}*/${resource}`)
        })
    } else {
        cb(null, `/**${options.text}*/${resource}`)
    }
}
let schema = {
    type: 'object',
    properties: {
        text: {
            type: 'string'
        },
        filename: {
            type: 'string'
        }
    }
}