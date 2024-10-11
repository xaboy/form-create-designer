import uniqueId from '@form-create/utils/lib/unique';
import {localeProps, makeTreeOptions, makeTreeOptionsRule} from '../../utils/index';

const label = '级联选择器';
const name = 'cascader';

export default {
    menu: 'main',
    icon: 'icon-cascader',
    label,
    name,
    event: ['change', 'finish', 'close', 'clickTab'],
    validate: ['string', 'number'],
    rule({t}) {
        return {
            type: name,
            field: uniqueId(),
            title: t('com.cascader.name'),
            info: '',
            effect: {
                fetch: ''
            },
            $required: false,
            props: {
                options: makeTreeOptions(t('props.option'), {label: 'text', value: 'value'}, 3)
            }
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [
            makeTreeOptionsRule({t, to: 'props.options', label: 'text'}),
            {
                type: 'input',
                field: 'title',
            },
            {
                type: 'input',
                field: 'placeholder',
            },
            {
                type: 'switch',
                field: 'disabled',
            },
            {
                type: 'switch',
                field: 'clearable',
            },
            {
                type: 'ColorPicker',
                field: 'activeColor',
            },
        ]);
    }
};
