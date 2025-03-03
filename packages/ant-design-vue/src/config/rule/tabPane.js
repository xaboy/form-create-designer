import {localeProps} from '../../utils';

const label = '选项卡';
const name = 'aTabPane';

export default {
    label,
    name,
    inside: true,
    drag: true,
    dragBtn: false,
    mask: false,
    rule({t}) {
        return {
            type: name,
            props: {
                tab: t('com.aTabPane.name'),
            },
            children: []
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [{type: 'input', field: 'tab'}, {
            type: 'switch',
            field: 'disabled'
        }, {type: 'input', field: 'key'}]);
    }
};
