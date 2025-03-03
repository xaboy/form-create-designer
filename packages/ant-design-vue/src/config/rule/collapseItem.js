import {localeProps} from '../../utils';
import uniqueId from '@form-create/utils/lib/unique';

const label = '面板';
const name = 'aCollapsePanel';

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
                header: t('com.aCollapsePanel.name'),
                key: uniqueId()
            },
            style: {},
            children: [],
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [{
            type: 'input',
            field: 'header',
        }, {
            type: 'input',
            field: 'key',
        }, {
            type: 'switch',
            field: 'disabled'
        }, {
            type: 'switch',
            field: 'showArrow',
            value: true,
        }]);
    }
};
