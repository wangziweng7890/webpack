#! /usr/bin/env node

/**
 * 1.拿到当前运行目录，拿到配置文件
 */
let path = require('path');
let Compiler = require('../lib/Compiler');
let config = require(path.resolve('webpack.config.js'))
let compiler = new Compiler(config);
compiler.run()