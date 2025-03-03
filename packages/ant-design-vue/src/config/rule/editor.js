import uniqueId from '@form-create/utils/lib/unique';
import {localeProps} from '../../utils';

const label = '富文本框';
const name = 'fcEditor';

export default {
    menu: 'main',
    icon: 'icon-editor',
    label,
    name,
    input: true,
    event: ['change'],
    validate: ['string'],
    rule({t}) {
        return {
            type: name,
            field: uniqueId(),
            title: t('com.fcEditor.name'),
            info: '',
            $required: false,
            props: {},
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [{
            type: 'switch',
            field: 'disabled'
        }]);
    }
};
