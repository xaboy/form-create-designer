import uniqueId from '@form-create/utils/lib/unique';
import {localeProps} from '../../utils';

const label = '评分';
const name = 'rate';

export default {
    menu: 'main',
    icon: 'icon-rate',
    label,
    name,
    input: true,
    event: ['change'],
    validate: ['number'],
    rule({t}) {
        return {
            type: name,
            field: uniqueId(),
            title: t('com.rate.name'),
            info: '',
            $required: false,
            props: {},
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [
            {type: 'inputNumber', field: 'count', props: {min: 0}}, {
                type: 'switch',
                field: 'disabled'
            }, {type: 'switch', field: 'allowHalf'},
            {type: 'switch', field: 'allowClear', value: true},]);
    }
};
