import uniqueId from '@form-create/utils/lib/unique';
import {localeProps, makeOptionsRule, makeTreeOptions} from '../../utils';

const label = '穿梭框';
const name = 'aTransfer';

export default {
    menu: 'main',
    icon: 'icon-transfer',
    label,
    name,
    input: true,
    event: ['change', 'search', 'selectChange'],
    validate: ['array'],
    rule({t}) {
        return {
            type: name,
            field: uniqueId(),
            modelField: 'targetKeys',
            title: t('com.aTransfer.name'),
            info: '',
            $required: false,
            props: {
                render: new Function('item', 'return item.label || item.title'),
                dataSource: makeTreeOptions(t('props.option'), {label: 'label', value: 'key'}, 1)
            }
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [
            makeOptionsRule(t, 'props.dataSource', 'label', 'key'),
            {type: 'switch', field: 'oneWay'},
            {type: 'switch', field: 'pagination'},
            {type: 'switch', field: 'showSearch'},
            {type: 'switch', field: 'showSelectAll'}, {
                type: 'TableOptions',
                field: 'titles',
                props: {
                    column: [{label: t('props.value'), key: 'value'}],
                    valueType: 'string',
                    max: 2,
                }
            }]);
    }
};
