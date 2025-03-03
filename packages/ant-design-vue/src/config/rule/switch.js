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
                checkedValue: true,
                unCheckedValue: false,
            },
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [{
            type: 'switch',
            field: 'disabled'
        }, {type: 'input', field: 'checkedChildren'}, {
            type: 'input',
            field: 'unCheckedChildren'
        }, {type: 'ValueInput', field: 'checkedValue'}, {
            type: 'ValueInput',
            field: 'unCheckedValue'
        }]);
    }
};
