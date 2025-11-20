import {localeOptions, localeProps} from '../../utils';

const label = '通知';
const name = 'vanNoticeBar';

export default {
    menu: 'aide',
    icon: 'icon-alert',
    label,
    name,
    event: ['click', 'close', 'replay'],
    rule({t}) {
        return {
            type: name,
            props: {
                text: t('com.' + name + '.description'),
            },
            style: {
                width: '100%',
            },
            children: []
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [
            {
                type: 'select',
                field: 'mode',
                options: localeOptions(t, [
                    {label: 'closeable', value: 'closeable'},
                    {label: 'link', value: 'link'},
                ])
            }, {
                type: 'input',
                field: 'text',
            }, {
                type: 'ColorInput',
                field: 'color',
            }, {
                type: 'ColorInput',
                field: 'background',
            }, {
                type: 'inputNumber',
                field: 'speed',
                value: 60,
            }, {
                type: 'switch',
                field: 'scrollable',
                value: true,
            }, {
                type: 'switch',
                field: 'wrapable',
            }
        ]);
    }
};
