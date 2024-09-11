import uniqueId from '@form-create/utils/lib/unique';
import {getInjectArg, localeProps, makeOptionsRule, makeTreeOptions} from '../../utils/index';

const label = '选择器';
const name = 'select';

export default {
    menu: 'main',
    icon: 'icon-select',
    label,
    name,
    event: ['change', 'visibleChange', 'removeTag', 'clear', 'blur', 'focus'],
    validate: ['string', 'number', 'array'],
    rule({t}) {
        return {
            type: name,
            field: uniqueId(),
            title: t('com.select.name'),
            info: '',
            effect: {
                fetch: ''
            },
            $required: false,
            props: {},
            options: makeTreeOptions(t('props.option'), {label: 'label', value: 'value'}, 1)
        };
    },
    watch: {
        multiple({rule}) {
            rule.key = uniqueId();
        }
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [
            makeOptionsRule(t, 'options'),
            {type: 'switch', field: 'multiple'}, {
                type: 'switch',
                field: 'disabled'
            }, {type: 'switch', field: 'clearable'}, {
                type: 'switch',
                field: 'collapseTags'
            }, {
                type: 'inputNumber',
                field: 'multipleLimit',
                props: {min: 0}
            }, {type: 'input', field: 'placeholder'}, {
                type: 'switch',
                field: 'filterable'
            }, {
                type: 'switch',
                field: 'remote',
            }, {
                type: 'FnInput',
                field: 'remoteMethod',
                props: {
                    body: true,
                    fnx: true,
                    name: 'remoteMethod',
                    args: [getInjectArg(t)],
                },
            }, {type: 'switch', field: 'allowCreate'}, {
                type: 'input',
                field: 'noMatchText'
            }, {type: 'input', field: 'noDataText'}, {
                type: 'switch',
                field: 'reserveKeyword'
            }, {type: 'switch', field: 'defaultFirstOption'}])
    }
};
