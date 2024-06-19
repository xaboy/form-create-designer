export default function validate({t}) {
    return [
        {
            type: 'Required',
            field: '$required',
            title: t('validate.required')
        },
        {
            type: 'validate',
            field: 'validate',
            title: t('validate.rule'),
            value: []
        },
    ];
}