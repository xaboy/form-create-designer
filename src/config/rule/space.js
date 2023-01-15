import {localeProps} from '../../utils';

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
    props(_, {t}) {
        return [
            {
                type: 'object',
                field: 'formCreateStyle',
                native: true,
                props: {
                    rule: localeProps(t, name + '.props', [
                        {
                            type: 'input',
                            field: 'height',
                            title: 'height',
                        },
                    ])
                }
            }

        ];
    }
};
