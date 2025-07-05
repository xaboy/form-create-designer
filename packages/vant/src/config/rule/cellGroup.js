import {localeProps} from '../../utils';

const name = 'vanCellGroup';

export default {
    menu: 'layout',
    icon: 'icon-descriptions',
    name,
    label: '单元格',
    children: 'vanCell',
    childrenLen: 2,
    mask: false,
    rule({t}) {
        return {
            type: name,
            native: false,
            col: {show: true},
            wrap: {show: false},
            props: {
                title: t('com.' + name + '.name'),
            }
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [
            {
                type: 'input',
                field: 'title',
            },
            {
                type: 'switch',
                field: 'inset',
            },
            {
                type: 'switch',
                field: 'border',
                value: true,
            }
        ]);
    }
};
