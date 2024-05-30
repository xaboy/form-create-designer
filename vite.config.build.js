import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJSX from '@vitejs/plugin-vue-jsx'
import banner from 'vite-plugin-banner'
import cssnano from 'cssnano'
import visualizer from 'rollup-plugin-visualizer';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import {author, license, name, version} from './package.json'

const extnedsPlugins = [];

function getBanner(banner, pkg) {
    if (!banner || typeof banner === 'string') {
        return banner || '';
    }

    banner = {...pkg, ...(banner === true ? {} : banner)};

    const author =banner.author

    const license = banner.license || '';
    return (
        '/*!\n' +
        ' * FormCreate 可视化表单设计器\n' +
        ` * ${banner.name} v${banner.version}\n` +
        ` * (c) ${author || ''}\n` +
        (license && ` * Released under the ${license} License.\n`) +
        ' */'
    );
}

const __banner__ = {
    author: `2021-${new Date().getFullYear()} ${author}\n * Github https://github.com/xaboy/form-create-designer\n * Site https://form-create.com/`,
    license,
    name,
    version
}

// 打包生产环境才引入的插件
if (process.env.NODE_ENV === 'production') {
    // 打包依赖展示
    extnedsPlugins.push(
        visualizer({
            open: true,
            gzipSize: true,
            brotliSize: true,
        })
    );
}

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        lib: {
            entry: 'src/index.js',
            name: 'FcDesigner',
            fileName: format => `index.${format}.js`,
        },
        rollupOptions: {
            output: {
                exports: 'named',
                globals: {
                    vue: 'Vue'
                }
            },
            external: [
                'vue',
                'element-plus',
                '@form-create/element-ui'
            ],

        },
        brotliSize: true
    },
    css: {
        postcss: {
            plugins: [
                cssnano({
                    preset: 'advanced'
                })
            ]
        }
    },
    plugins: [vue(),  vueJSX(), banner(getBanner(__banner__)),cssInjectedByJsPlugin(), ...extnedsPlugins]
})
