import uniqueId from '@form-create/utils/lib/unique';
import {getInjectArg, localeOptions, localeProps} from '../../utils';

const label = '上传';
const name = 'upload';

export default {
    menu: 'main',
    icon: 'icon-upload',
    label,
    name,
    input: true,
    languageKey: ['clickToUpload'],
    event: ['change', 'download', 'preview', 'remove'],
    validate: ['array'],
    rule({t}) {
        return {
            type: name,
            field: uniqueId(),
            title: t('com.upload.name'),
            info: '',
            $required: false,
            props: {
                action: '/',
                onSuccess: new Function('file', 'file.url = res.response.url;')
            }
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [{
            type: 'switch',
            field: 'disabled'
        }, {
            type: 'select',
            field: 'listType',
            options: localeOptions(t, [{label: 'text', value: 'text'}, {
                label: 'picture',
                value: 'picture'
            }, {
                label: 'picture-card',
                value: 'picture-card'
            }]),
        }, {type: 'switch', field: 'multiple'}, {type: 'input', field: 'name'},
        {
            type: 'input',
            field: 'accept',
        },
        {
            type: 'input',
            field: 'action'
        }, {
            type: 'FnInput',
            field: 'beforeUpload',
            props: {
                body: true,
                button: true,
                fnx: true,
                args: [getInjectArg(t)],
                name: 'beforeUpload',
            }
        }, {
            type: 'FnInput',
            field: 'onSuccess',
            warning: t('com.upload.info'),
            props: {
                body: true,
                button: true,
                fnx: true,
                args: [getInjectArg(t)],
                name: 'onSuccess',
            }
        }, {
            type: 'FnInput',
            field: 'customRequest',
            props: {
                body: true,
                button: true,
                fnx: true,
                args: [getInjectArg(t)],
                name: 'customRequest',
            }
        }, {
            type: 'TableOptions',
            field: 'headers',
            props: {
                column: [{label: t('props.key'), key: 'label'}, {label: t('props.value'), key: 'value'}],
                valueType: 'object'
            }
        }, {
            type: 'TableOptions',
            field: 'data',
            props: {
                column: [{label: t('props.key'), key: 'label'}, {label: t('props.value'), key: 'value'}],
                valueType: 'object'
            }
        }, {
            type: 'switch',
            field: 'withCredentials'
        }, {
            type: 'inputNumber',
            field: 'maxCount',
            props: {min: 0},
        }]);
    }
};
