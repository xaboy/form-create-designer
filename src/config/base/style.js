export default function field({t}) {
    return [
        {
            type: 'input',
            title: 'ID',
            field: 'id',
            wrap: {
                labelWidth: '45px'
            }
        },
        {
            type: 'input',
            title: 'Class',
            field: 'class',
            wrap: {
                labelWidth: '45px'
            }
        },
        {
            type: 'StyleConfig',
            field: 'style',
            title: '',
            value: {},
        }
    ];
}
