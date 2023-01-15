export default function form({t}) {
    return [
        {
            type: 'radio',
            field: 'labelPosition',
            value: 'left',
            title: t('form.labelPosition'),
            options: [
                {value: 'right', label: 'right'},
                {value: 'left', label: 'left'},
                {value: 'top', label: 'top'},
            ]
        }, {
            type: 'radio',
            field: 'size',
            value: 'small',
            title: t('form.size'),
            options: [
                {value: 'large', label: 'large'},
                {value: 'default', label: 'default'},
                {value: 'small', label: 'small'},
            ]
        }, {
            type: 'input',
            field: 'labelWidth',
            value: '125px',
            title: t('form.labelWidth'),
        }, {
            type: 'switch',
            field: 'hideRequiredAsterisk',
            value: false,
            title: t('form.hideRequiredAsterisk'),
        }, {
            type: 'switch',
            field: 'showMessage',
            value: true,
            title: t('form.showMessage'),
        }, {
            type: 'switch',
            field: 'inlineMessage',
            value: false,
            title: t('form.inlineMessage'),
        }, {
            type: 'switch',
            field: 'formCreateSubmitBtn',
            value: true,
            title: t('form.submitBtn'),
        }, {
            type: 'switch',
            field: 'formCreateResetBtn',
            value: false,
            title: t('form.resetBtn'),
        },
    ];
}
