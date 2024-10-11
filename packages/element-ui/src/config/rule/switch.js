import uniqueId from '@form-create/utils/lib/unique';
import {localeProps} from '../../utils';

const label = '开关';
const name = 'switch';

export default {
    menu: 'main',
    icon: 'icon-switch',
    label,
    name,
    event: ['change'],
    rule({t}) {
        return {
            type: name,
            field: uniqueId(),
            title: t('com.switch.name'),
            info: '',
            $required: false,
            props: {},
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [{
            type: 'switch',
            field: 'disabled'
        }, {
            type: 'inputNumber',
            field: 'width',
            props: {min: 0},
        }, {type: 'input', field: 'activeText'}, {
            type: 'input',
            field: 'inactiveText'
        }, {type: 'input', field: 'activeValue'}, {
            type: 'input',
            field: 'inactiveValue'
        }, {type: 'ColorInput', field: 'activeColor'}, {
            type: 'ColorInput',
            field: 'inactiveColor'
        }]);
    }
};
