import uniqueId from '@form-create/utils/lib/unique';
import {getInjectArg, localeProps} from '../../utils';

const label = '上传';
const name = 'uploader';

export default {
    menu: 'main',
    icon: 'icon-upload',
    label,
    name,
    input: true,
    event: ['oversize', 'clickUpload', 'clickPreview', 'clickReupload', 'closePreview', 'delete'],
    validate: ['array', 'string'],
    rule({t}) {
        return {
            type: name,
            field: uniqueId(),
            title: t('com.uploader.name'),
            info: '',
            $required: false,
            props: {
                action: '/',
                onSuccess: '$FNX:const res = $inject.args[0];\nconst file = $inject.args[1];\n\nfile.url = res.data.url;'
            }
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [
            {
                type: 'switch',
                field: 'disabled',
            },
            {
                type: 'input',
                field: 'accept',
            },
            {
                type: 'inputNumber',
                field: 'maxSize',
            },
            {
                type: 'inputNumber',
                field: 'maxCount',
            },
            {type: 'input', field: 'uploadName'},
            {
                type: 'input',
                field: 'action'
            }, {
                type: 'FnInput',
                field: 'onSuccess',
                warning: t('com.uploader.info'),
                props: {
                    body: true,
                    button: true,
                    fnx: true,
                    args: [getInjectArg(t)],
                    name: 'onSuccess',
                }
            },  {
                type: 'FnInput',
                field: 'beforeDelete',
                props: {
                    body: true,
                    button: true,
                    fnx: true,
                    args: [getInjectArg(t)],
                    name: 'beforeDelete',
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
            },
        ]);
    }
};
