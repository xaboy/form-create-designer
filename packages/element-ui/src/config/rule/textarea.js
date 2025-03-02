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
    event: ['blur', 'focus', 'change', 'input'],
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
        return localeProps(t, name + '.props', [
            {
                type: 'switch',
                field: 'disabled'
            },
            {
                type: 'switch',
                field: 'readonly'
            },
            {
                type: 'inputNumber',
                field: 'maxlength',
                props: {min: 0}
            },
            {
                type: 'switch',
                field: 'showWordLimit'
            },
            {
                type: 'input',
                field: 'placeholder'
            },
            {
                type: 'inputNumber',
                field: 'rows',
                props: {
                    min: 0
                }
            },
            {
                type: 'switch',
                field: 'autosize'
            },
        ]);
    }
};
