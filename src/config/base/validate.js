export default function validate() {
    return [
        {
            type: 'select',
            field: 'type',
            value: '',
            title: '字段类型',
            options: [
                {value: '', label: '请选择'},
                {value: 'string', label: 'String'},
                {value: 'array', label: 'Array'},
                {value: 'number', label: 'Number'},
                {value: 'integer', label: 'Integer'},
                {value: 'Float', label: 'float'},
                {value: 'object', label: 'Object'},
                {value: 'date', label: 'Date'},
                {value: 'url', label: 'url'},
                {value: 'hex', label: 'hex'},
                {value: 'email', label: 'email'},
            ],
            control: {
                handle: v => v !== '',
                rule: [
                    {
                        type: 'switch',
                        field: 'required',
                        title: '必填',
                        value: false,
                    }
                ]
            }
        }
    ];
}