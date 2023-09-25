import uniqueId from '@form-create/utils/lib/unique';
import {localeProps, makeRequiredRule} from '../../utils';

const label = '上传';
const name = 'upload';

export default {
    icon: 'icon-upload',
    label,
    name,
    rule({t}) {
        return {
            type: name,
            field: uniqueId(),
            title: t('components.upload.name'),
            info: '',
            $required: false,
            props: {
                action: '',
                onSuccess(res, file) {
                    file.url = res.data.url;
                }
            }
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [makeRequiredRule(), {
            type: 'select',
            field: 'list-type',
            title: '上传类型',
            value: 'text',
            options: [{label: '文字', value: 'text'}, {
                label: '图片',
                value: 'picture'
            }, {
                label: '卡片',
                value: 'picture-card'
            }]
        }, {type: 'input', field: 'action', title: '上传的地址(必填)'}, {
            type: 'Struct',
            field: 'headers',
            title: '设置上传的请求头部',
            props: {defaultValue: {}}
        }, {type: 'switch', field: 'multiple', title: '是否支持多选文件'}, {
            type: 'Struct',
            field: 'data',
            title: '上传时附带的额外参数',
            props: {defaultValue: {}}
        }, {type: 'input', field: 'name', title: '上传的文件字段名'}, {
            type: 'switch',
            field: 'withCredentials',
            title: '支持发送 cookie 凭证信息'
        }, {type: 'input', field: 'accept', title: '接受上传的文件类型（thumbnail-mode 模式下此参数无效）'}, {
            type: 'switch',
            field: 'autoUpload',
            title: '是否在选取文件后立即进行上传',
            value: true
        }, {
            type: 'switch',
            field: 'disabled',
            title: '是否禁用'
        }, {
            type: 'inputNumber',
            field: 'limit',
            title: '最大允许上传个数',
            props: {min: 0},
        }]);
    }
};
