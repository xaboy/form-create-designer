import uniqueId from '@form-create/utils/lib/unique';
import {localeProps} from '../../utils';

const label = '开关';
const name = 'switch';

export default {
    menu: 'main',
    icon: 'icon-switch',
    label,
    name,
    input: true,
    event: ['change'],
    rule({t}) {
        return {
            type: name,
            field: uniqueId(),
            title: t('com.switch.name'),
            info: '',
            $required: false,
            props: {
                activeValue: true,
                inactiveValue: false,
            },
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
        }, {type: 'ValueInput', field: 'activeValue'}, {
            type: 'ValueInput',
            field: 'inactiveValue'
        }, {type: 'ColorInput', field: 'activeColor'}, {
            type: 'ColorInput',
            field: 'inactiveColor'
        }]);
    }
};
