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
    event: ['change', 'remove', 'preview', 'error', 'progress', 'exceed'],
    languageKey: ['clickToUpload'],
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
                onSuccess: '$FNX:const res = $inject.args[0];\nconst file = $inject.args[1];\n\nfile.url = res.data.url;'
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
        }, {type: 'switch', field: 'multiple'}, {
            type: 'input',
            field: 'action'
        }, {
            type: 'input',
            field: 'accept'
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
            field: 'beforeRemove',
            props: {
                body: true,
                button: true,
                fnx: true,
                args: [getInjectArg(t)],
                name: 'beforeRemove',
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
            type: 'switch',
            field: 'autoUpload',
            value: true
        }, {
            type: 'inputNumber',
            field: 'limit',
            props: {min: 0},
        }]);
    }
};
