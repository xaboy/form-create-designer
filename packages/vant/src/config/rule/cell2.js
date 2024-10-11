import {localeProps} from '../../utils';

const name = 'vanCell';

export default {
    name,
    label: '单元格子',
    dragBtn: false,
    rule({t}) {
        return {
            type: name,
            props: {
                title: t('props.title'),
                value: t('props.content'),
            }
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [
            {
                type: 'input',
                field: 'title',
            }, {
                type: 'input',
                field: 'value',
            }, {
                type: 'input',
                field: 'label',
            },
            {
                type: 'input',
                field: 'icon',
            },
            {
                type: 'input',
                field: 'url',
            },
            {
                type: 'switch',
                field: 'isLink',
            },
            {
                type: 'switch',
                field: 'center',
            }
        ]);
    }
};
