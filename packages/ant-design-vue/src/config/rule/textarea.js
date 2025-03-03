import uniqueId from '@form-create/utils/lib/unique';
import {localeProps} from '../../utils';

const label = '多行输入框';
const name = 'textarea';

export default {
    menu: 'main',
    icon: 'icon-textarea',
    label,
    name,
    input: true,
    event: ['blur', 'focus', 'change', 'pressEnter'],
    validate: ['string'],
    rule({t}) {
        return {
            type: 'input',
            field: uniqueId(),
            title: t('com.textarea.name'),
            info: '',
            $required: false,
            props: {
                type: 'textarea'
            }
        };
    },
    props(_, {t}) {
        return localeProps(t, 'input.props', [
            {
                type: 'switch',
                field: 'disabled'
            },
            {
                type: 'inputNumber',
                field: 'maxlength',
                props: {min: 0}
            },
            {
                type: 'input',
                field: 'placeholder'
            },
            {
                type: 'switch',
                field: 'allowClear'
            },
            {
                type: 'switch',
                field: 'showCount'
            },
            {
                type: 'switch',
                field: 'autoSize',
            },
            {
                type: 'switch',
                field: 'bordered',
                value: true,
            },
        ]);
    }
};
