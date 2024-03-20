import {localeProps} from '../../utils';

const label = '表格';
const name = 'table';

export default {
    icon: 'icon-tab',
    label,
    name,
    mask: false,
    rule() {
        return {
            type: 'table-options',
            children: [],
            props: {
                column: [{label: '姓名', key: 'name'}, {label: '年龄', key: 'age'}],
                modelValue: []
            }
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [{type: 'TableOptions', props: {modelValue: [{label: '姓名', key: 'name'}, {label: '年龄', key: 'age'}], column: [ {label: t('components.table.headerLabel'), key: 'label'},{label: t('components.table.headerName'), key: 'key'}]}}]);
    }
};
