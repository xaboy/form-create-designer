export default function field({t}) {
    return [
        {
            type: 'input',
            title: 'ID',
            field: 'id',
        },
        {
            type: 'input',
            title: 'Class',
            field: 'class',
        },
        {
            type: 'StyleConfig',
            field: 'style',
            title: '',
            value: {},
        }
    ];
}
