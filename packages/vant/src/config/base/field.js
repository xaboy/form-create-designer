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
            type: 'select',
            field: 'formCreateWrap>labelAlign',
            title: t('form.labelAlign'),
            col: {show: false},
            slot: 'append',
            options: localeOptions(t, [
                {
                    label: 'center',
                    value: 'center',
                },
                {
                    label: 'left',
                    value: 'left',
                },
                {
                    label: 'right',
                    value: 'right',
                },
                {
                    label: 'top',
                    value: 'top',
                },
            ])
        }, {
            type: 'select',
            field: 'formCreateWrap>inputAlign',
            title: t('form.inputAlign'),
            col: {show: false},
            slot: 'append',
            options: localeOptions(t, [
                {
                    label: 'left',
                    value: 'left',
                },
                {
                    label: 'center',
                    value: 'center',
                },
                {
                    label: 'right',
                    value: 'right',
                },
            ])
        }, {
            type: 'SizeInput',
            field: 'formCreateWrap>labelWidth',
            title: t('form.labelWidth'),
            col: {show: false},
            slot: 'append',
            value: '',
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
        },
    ];
}
