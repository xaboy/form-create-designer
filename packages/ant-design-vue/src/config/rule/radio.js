import uniqueId from '@form-create/utils/lib/unique';
import {localeProps, makeOptionsRule, makeTreeOptions} from '../../utils/index';

const label = '单选框';
const name = 'radio';

export default {
    menu: 'main',
    icon: 'icon-radio',
    label,
    name,
    input: true,
    event: ['change'],
    validate: ['string', 'number'],
    rule({t}) {
        return {
            type: name,
            field: uniqueId(),
            title: t('com.radio.name'),
            info: '',
            effect: {
                fetch: ''
            },
            $required: false,
            props: {},
            options: makeTreeOptions(t('props.option'), {label: 'label', value: 'value'}, 1)
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [
            makeOptionsRule(t, 'options'),
            {type: 'switch', field: 'disabled'},
            {
                type: 'switch',
                field: 'optionType',
                props: {checkedValue: 'button', unCheckedValue: 'default'}
            }]);
    }
};
