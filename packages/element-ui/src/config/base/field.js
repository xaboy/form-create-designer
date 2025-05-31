import {localeOptions} from '../../utils';

export default function field({t}) {
    return [
        {
            type: 'FieldInput',
            field: 'field',
            value: '',
            title: t('form.field'),
            warning: t('warning.field'),
        }, {
            type: 'LanguageInput',
            field: 'title',
            value: '',
            title: t('form.title'),
        }, {
            type: 'LanguageInput',
            field: 'info',
            value: '',
            title: t('form.info'),
        }, {
            type: 'radio',
            field: 'formCreateWrap>widthMode',
            value: 1,
            title: t('form.widthMode'),
            options: localeOptions(t, [
                {label: t('form.fixedWidth'), value: 1},
                {label: t('form.minMaxWidth'), value: 2},
            ]),
            control: [
                {value: 1, rule: ['formCreateWrap>labelWidth']},
                {value: 2, rule: ['formCreateStyle>minWidth', 'formCreateStyle>maxWidth']}
            ]
        }, {
            type: 'SizeInput',
            field: 'formCreateWrap>labelWidth',
            value: '',
            title: t('form.labelWidth'),
        }, {
            type: 'SizeInput',
            field: 'formCreateStyle>minWidth',
            value: '',
            title: t('form.minWidth'),
        }, {
            type: 'SizeInput',
            field: 'formCreateStyle>maxWidth',
            value: '',
            title: t('form.maxWidth'),
        }, {
            type: 'Struct',
            field: '_control',
            name: 'control',
            value: [],
            title: t('form.control'),
            warning: t('form.controlDocument', {doc: '<a target="_blank" href="https://form-create.com/v3/guide/control" style="color: inherit;text-decoration: underline;">' + t('form.document') + '</a>'}),
            props: {
                defaultValue: [],
                validate(val) {
                    if (!Array.isArray(val)) return false;
                    if (!val.length) return true;
                    return !val.some(({rule}) => {
                        return !Array.isArray(rule);
                    });
                }
            }
        }, {
            type: 'HiddenConfig',
            field: '_computed>hidden',
            name: 'hidden',
            value: {},
            title: t('form.hiddenCondition'),
            props: {
                defaultValue: {},
                validate(val) {
                    return val && typeof val === 'object';
                }
            }
        },
    ];
}
