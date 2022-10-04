const label = '间距';
const name = 'div';

export default {
    icon: 'icon-space',
    label,
    name,
    rule() {
        return {
            type: name,
            wrap: {
                show: false
            },
            native: false,
            style: {
                width: '100%',
                height: '20px',
            },
            children: []
        };
    },
    props() {
        return [
            {
                type: 'object',
                field: 'formCreateStyle',
                native: true,
                props: {
                    rule: [
                        {
                            type: 'input',
                            field: 'height',
                            title: 'height',
                        },
                    ]
                }
            }

        ];
    }
};