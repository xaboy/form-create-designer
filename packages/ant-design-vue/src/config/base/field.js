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
            type: 'SizeInput',
            field: 'formCreateWrap>labelCol>style>width',
            col: {show: false},
            value: '',
            title: t('form.labelCol'),
        }, {
            type: 'radio',
            field: 'formCreateWrap>widthMode',
            col: {show: false},
            value: 1,
            title: t('form.widthMode'),
            options: localeOptions(t, [
                {label: t('form.fixedWidth'), value: 1},
                {label: t('form.minMaxWidth'), value: 2},
            ]),
            props: {optionType: 'button'},
            control: [
                {value: 1, rule: ['formCreateWrap>labelCol>style>width']},
                {value: 2, rule: ['formCreateStyle>minWidth', 'formCreateStyle>maxWidth']}
            ]
        }, {
            type: 'SizeInput',
            field: 'formCreateStyle>minWidth',
            col: {show: false},
            value: '',
            title: t('form.minWidth'),
        }, {
            type: 'SizeInput',
            field: 'formCreateStyle>maxWidth',
            col: {show: false},
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
            type: 'Struct',
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
