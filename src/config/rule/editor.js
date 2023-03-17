import uniqueId from '@form-create/utils/lib/unique';
import {localeProps, makeRequiredRule} from '../../utils';

const label = '富文本框';
const name = 'fc-editor';

export default {
    icon: 'icon-editor',
    label,
    name,
    rule({t}) {
        return {
            type: name,
            field: uniqueId(),
            title: t('components.fc-editor.name'),
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
        }]);
    }
};
