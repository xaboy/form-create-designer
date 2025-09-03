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
            type: 'Struct',
            field: '_control',
            name: 'control',
            value: [],
            title: t('form.control'),
            warning: t('form.controlDocument', {doc: '<a target="_blank" href="https://view.form-create.com/control" style="color: inherit;text-decoration: underline;">' + t('form.document') + '</a>'}),
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
