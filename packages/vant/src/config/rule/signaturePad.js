import uniqueId from '@form-create/utils/lib/unique';
import {localeProps} from '../../utils';

const label = '手写签名';
const name = 'signaturePad';

export default {
    menu: 'main',
    icon: 'icon-sign',
    label: label,
    name: name,
    input: true,
    mask: true,
    languageKey: ['signaturePadTip', 'signaturePadTitle', 'reset', 'ok'],
    event: ['change', 'remove'],
    rule({t}) {
        return {
            type: name,
            field: uniqueId(),
            title: t('com.signaturePad.name'),
            info: '',
            $required: false,
            props: {},
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [
            {
                type: 'ColorInput',
                field: 'penColor',
            },
            {
                type: 'switch',
                field: 'disabled',
            },
        ]);
    },
};

