/*
 * @Author       : djkloop
 * @Date         : 2021-04-05 12:18:32
 * @LastEditors  : djkloop
 * @LastEditTime : 2021-04-05 12:45:13
 * @Description  : 头部注释
 * @FilePath     : /build/output.js
 */
const {terser} = require('rollup-plugin-terser');
const {author, license, name, version} = require('../package.json');
const getBanner = require('./utils/getBanner');
const {globals} = require('./common.var');

/// banner
const banner = {
    author: `2021-${new Date().getFullYear()} ${author}\n * Github https://github.com/xaboy/form-create-designer`,
    license,
    name,
    version
};

const OutputOptions = () => {
    const baseOutputOptions = {
        format: 'umd',
        dir: 'dist',
        globals,
        name: 'FcDesigner',
        entryFileNames: 'index.js',
        sourcemap: false,
        banner: getBanner(banner),
        sourcemapExcludeSources: false
    };

    const miniOutputOptions = Object.assign({}, baseOutputOptions, {
        entryFileNames: 'index.min.js',
        plugins: [terser()]
    });

    return [baseOutputOptions, miniOutputOptions];
};

module.exports = OutputOptions;
