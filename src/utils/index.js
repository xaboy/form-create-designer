export function makeOptionsRule(to) {
    return {
        type: 'radio',
        title: '选项数据',
        field: '_optionType',
        value: 0,
        options: [
            {'label': '静态数据', 'value': 0},
            {'label': '接口数据', 'value': 1},
        ],
        props: {
            type: 'button'
        },
        control: [
            {
                value: 0,
                rule: [
                    {
                        type: 'Struct',
                        field: 'formCreate'+ upper(to).replace('.', '>'),
                        props: {defaultValue: []}
                    },
                ],
            },
            {
                value: 1,
                rule: [
                    {
                        type: 'Fetch',
                        field: 'formCreateEffect>fetch',
                        props:{
                            to
                        }
                    }
                ]
            }
        ]

    };
}

export function upper(str) {
    return str.replace(str[0], str[0].toLocaleUpperCase());
}