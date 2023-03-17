import uniqueId from '@form-create/utils/lib/unique';
import {localeProps, makeRequiredRule} from '../../utils';

const label = '颜色选择器';
const name = 'colorPicker';

export default {
    icon: 'icon-color',
    label,
    name,
    rule({t}) {
        return {
            type: name,
            field: uniqueId(),
            title: t('components.colorPicker.name'),
            info: '',
            $required: false,
            props: {},
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [makeRequiredRule(), {
            type: 'switch',
            field: 'disabled',
            title: '是否禁用'
        }, {
            type: 'switch',
            field: 'showAlpha',
            title: '是否支持透明度选择'
        }, {
            type: 'select',
            field: 'colorFormat',
            title: '颜色的格式',
            options: [{label: 'hsl', value: 'hsl'}, {label: 'hsv', value: 'hsv'}, {
                label: 'hex',
                value: 'hex'
            }, {label: 'rgb', value: 'rgb'}]
        }]);
    }
};
