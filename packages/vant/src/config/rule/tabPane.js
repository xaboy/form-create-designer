import {localeProps} from '../../utils';

const label = '选项卡';
const name = 'vanTab';

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
                title: t('com.vanTab.name')
            },
            children: []
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [
            {
                type: 'switch',
                field: 'disabled'
            }, {
                type: 'input',
                field: 'title',
            }, {
                type: 'input',
                field: 'name'
            }
        ]);
    }
};
