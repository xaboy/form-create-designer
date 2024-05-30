import uniqueId from '@form-create/utils/lib/unique';
import {makeRequiredRule} from '@/utils';
import ar from 'element-ui/src/locale/lang/ar';

const label = '上传';
const name = 'upload2';

export default {
    icon: 'icon-upload',
    label,
    name,
    rule() {
        return {
            type: name,
            field: uniqueId(),
            title: '上传',
            info: '',
            $required: false,
            props: {
                listType: 'text',
                fileType: 'picture'
            }
        };
    },
    props() {
        return [makeRequiredRule(), {
            type: 'select',
            field: 'listType',
            title: '展示形式',
            value: 'text',
            options: [{label: '文字', value: 'text'}, {
                label: '缩略图',
                value: 'picture-card'
            }],
            inject: true,
            on: {
                change({api}, value) {
                    if (value === 'picture-card') {
                        api.setValue('fileType', 'picture');
                    }
                }
            }
        }, {
            type: 'select',
            field: 'fileType',
            title: '文件格式',
            value: '',
            options: [{
                label: '图片',
                value: 'picture'
            }, {
                label: 'PDF',
                value: 'pdf'
            }, {label: '不限', value: ''}]
        }, {
            type: 'select',
            field: 'uploadType',
            title: '上传方式',
            value: '',
            options: [{label: '默认', value: ''}]
        }, {
            type: 'switch',
            field: 'disabled',
            title: '是否禁用'
        }, {
            type: 'inputNumber',
            field: 'limit',
            title: '最大允许上传个数',
            props: {min: 0},
        }];
    }
};
