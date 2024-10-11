import {localeProps} from '../../utils';

const label = '面板';
const name = 'vanCollapseItem';

export default {
    icon: 'icon-cell',
    label,
    name,
    drag: true,
    dragBtn: false,
    inside: true,
    mask: false,
    rule({t}) {
        return {
            type: name,
            props: {
                title: t('com.vanCollapseItem.name')
            },
            style: {},
            children: []
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [
            {
                type: 'switch',
                field: 'disabled',
            }, {
                type: 'input',
                field: 'name',
            }, {
                type: 'input',
                field: 'title',
            },
            {
                type: 'input',
                field: 'value',
            },
            {
                type: 'input',
                field: 'label',
            }
        ]);
    }
};
