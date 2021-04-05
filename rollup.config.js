/*
 * @Author       : djkloop
 * @Date         : 2021-04-04 23:18:00
 * @LastEditors  : djkloop
 * @LastEditTime : 2021-04-05 12:44:31
 * @Description  : 头部注释
 * @FilePath     : /rollup.config.js
 */
const {join} = require('path');
import colors from 'chalk';
import {babel} from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import vuePlugin from 'rollup-plugin-vue';
import postcss from 'rollup-plugin-postcss';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import {visualizer} from 'rollup-plugin-visualizer';
import externals from 'rollup-plugin-node-externals';
import buble from '@rollup/plugin-buble';
import formCreateNodeResolve from './build/plugins/form-create-rollup-reslove-plugins/node-resolve';
import {not_externals, isExternal} from './build/utils/isExternal';
import copy from 'rollup-plugin-copy';
const OutputOptions = require('./build/output');
const cwd = __dirname;

const globals = {
    vue: 'Vue',
    ELEMENT: 'element-ui'
};

module.exports = {
    input: join(cwd, '/src/index.js'),
    onwarn: (warning) => {
        if (typeof warning === 'string') {
            return colors.yellow('warning');
        }
        const code = (warning.code || '').toLowerCase();
        if (code === 'mixed_exports' || code === 'missing_global_name') {
            return;
        }
        let message = warning.message;
        if (code === 'unresolved_import' && warning.source) {
            if (format !== 'umd' || context.unresolved.has(warning.source)) {
                return;
            }
            context.unresolved.add(warning.source);
            message = `${warning.source} is treated as external dependency`;
        }
        console.log(`${colors.yellow(`${code}`)}${colors.dim(':')} ${message}`);
    },
    output: OutputOptions(),
    external:Object.keys(globals || {}).filter(
        v => !/^[\.\/]/.test(v)
    ),
    plugins: [
        vuePlugin({
            css: false
        }),
        postcss(),
        externals({
            devDeps: false
        }),
        formCreateNodeResolve(),
        nodeResolve({
            extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
            preferBuiltins: true,
            jsnext: true,
            module: true
        }),
        commonjs({
            ignore: (name) => {
                return isExternal(not_externals, name);
            }
        }),
        babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**',
            extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
        }),
        replace({
            preventAssignment: true,
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        copy({
            targets: [
                {src: 'src/style/fonts', dest: 'dist/fonts'},
            ]
        }),
        buble(),
        visualizer()
    ]
};