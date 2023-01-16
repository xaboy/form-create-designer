import {defineConfig} from 'vite'
import banner from 'vite-plugin-banner'
import {author, license, name, version} from './package.json'

function getBanner(banner, pkg) {
    if (!banner || typeof banner === 'string') {
        return banner || '';
    }

    banner = {...pkg, ...(banner === true ? {} : banner)};

    const author = banner.author

    const license = banner.license || '';
    return (
        '/*!\n' +
        ' * form-create 可视化表单设计器\n' +
        ` * ${banner.name} v${banner.version}\n` +
        ` * (c) ${author || ''}\n` +
        (license && ` * Released under the ${license} License.\n`) +
        ' */'
    );
}

function toCase(str) {
    return str.replace(/(-[a-z])/g, function (v) {
        return v.replace('-', '').toLocaleUpperCase();
    });
}

function upper(str) {
    return str.replace(str[0], str[0].toLocaleUpperCase());
}

const __banner__ = {
    author: `2021-${new Date().getFullYear()} ${author}\n * Github https://github.com/xaboy/form-create-designer`,
    license,
    name,
    version
}

// https://vitejs.dev/config/
export default defineConfig((env) => {
    const name = env.mode || 'en';
    return {
        build: {
            outDir: 'locale',
            lib: {
                entry: `src/locale/${name}.js`,
                name: 'FcDesigner' + upper(toCase(name)),
                fileName: name,
            },
            emptyOutDir: false,
        },

        plugins: [banner(getBanner(__banner__))]
    };
})
