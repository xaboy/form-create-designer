/*
 * @Author       : djkloop
 * @Date         : 2021-04-05 01:44:28
 * @LastEditors  : djkloop
 * @LastEditTime : 2021-04-05 12:35:22
 * @Description  : 头部注释
 * @FilePath     : /build/plugins/form-create-rollup-reslove-plugins/node-resolve.js
 */
import {nodeResolve} from '@rollup/plugin-node-resolve';
import {not_externals, isExternal} from '../../utils/isExternal';

export default (options) => {
    const plugin = nodeResolve({
        extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
        preferBuiltins: true,
        jsnext: true,
        module: true,
    });

    return {
        name: 'form-create-node-resolve',
        async resolveId(importee, importer) {
            const id = await plugin.resolveId(
                importee,
                importer || 'src/__no_importer__.js'
            );
            if (id && typeof id.id === 'string') {
                if (isExternal(not_externals, id.id)) {
                    return false;
                }
            }

            return id;
        }
    };
};
