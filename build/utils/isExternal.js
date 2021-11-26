/*
 * @Author       : djkloop
 * @Date         : 2021-04-05 12:16:00
 * @LastEditors  : djkloop
 * @LastEditTime : 2021-04-05 12:35:07
 * @Description  : 头部注释
 * @FilePath     : /build/utils/isExternal.js
 */

const not_externals = [
    'vue',
    'Vue',
    'element-ui',
    'elementUI',
    '@form-create/element-ui',
    'view-design',
    '@form-create/iview4'
];

const isExternal = (not_externals, id) => {
    for (const external of not_externals) {
        if (
            typeof external === 'string' &&
      (id === external || id.includes(`/node_modules/${external}/`))
        ) {
            return true;
        }
    }
};

export {
    not_externals,
    isExternal
};
