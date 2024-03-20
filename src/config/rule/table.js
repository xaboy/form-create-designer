import {localeProps} from '../../utils';

const label = '表格';
const name = 'table';
const title = ''
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
            },
            title
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [{
            type: 'input',
            field: 'title',
            title: '表名'
        }, {
            type: 'TableOptions',
            props: {
                title,
                modelValue: [{label: '姓名', key: 'name'}, {label: '年龄', key: 'age'}],
                column: [{
                    label: t('components.table.headerLabel'),
                    key: 'label'
                }, {label: t('components.table.headerName'), key: 'key'}]
            }
        }]);
    }
};
