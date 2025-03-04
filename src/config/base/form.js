import {localeOptions} from '../../utils';

export default function form({t}) {
    return [
        {
            type: 'input',
            field: '>formName',
            value: '',
            title: t('form.formName'),
        }, {
            type: 'radio',
            field: 'labelPosition',
            value: 'left',
            title: t('form.labelPosition'),
            options: localeOptions(t, [
                {value: 'left', label: 'left'},
                {value: 'right', label: 'right'},
                {value: 'top', label: 'top'},
            ])
        }, {
            type: 'radio',
            field: 'size',
            value: 'small',
            title: t('form.size'),
            options: localeOptions(t, [
                {value: 'large', label: 'large'},
                {value: 'default', label: 'default'},
                {value: 'small', label: 'small'},
            ])
        }, {
            type: 'input',
            field: 'labelSuffix',
            value: '',
            title: t('form.labelSuffix'),
            style: {
                width: '150px'
            }
        }, {
            type: 'SizeInput',
            field: 'labelWidth',
            value: '125px',
            title: t('form.labelWidth'),
        }, {
            type: 'switch',
            field: 'hideRequiredAsterisk',
            value: false,
            title: t('form.hideRequiredAsterisk'),
        }, {
            type: 'switch',
            field: 'showMessage',
            value: true,
            title: t('form.showMessage'),
        }, {
            type: 'switch',
            field: 'inlineMessage',
            value: false,
            title: t('form.inlineMessage'),
        }, {
            type: 'switch',
            field: '_submitBtn>show',
            value: true,
            title: t('form.submitBtn'),
        }, {
            type: 'switch',
            field: '_resetBtn>show',
            value: false,
            title: t('form.resetBtn'),
        }, {
            type: 'FnConfig',
            field: '>_event',
            warning: t('form.controlDocument', {doc: '<a target="_blank" href="https://form-create.com/v3/guide/global-event" style="color: inherit;text-decoration: underline;">' + t('form.document') + '</a>'}),
            value: {},
            col: {show: true},
            props: {
                eventConfig: [
                    {
                        name: 'onSubmit',
                        info: t('form.onSubmit'),
                        args: ['formData', 'api'],
                    },
                    {
                        name: 'onReset',
                        info: t('form.onReset'),
                        args: ['api'],
                    },
                    {
                        name: 'onCreated',
                        info: t('form.onCreated'),
                        args: ['api'],
                    },
                    {
                        name: 'onMounted',
                        info: t('form.onMounted'),
                        args: ['api'],
                    },
                    {
                        name: 'onReload',
                        info: t('form.onReload'),
                        args: ['api'],
                    },
                    {
                        name: 'onChange',
                        info: t('form.onChange'),
                        args: ['field', 'value', 'options'],
                    },
                    {
                        name: 'beforeFetch',
                        info: t('form.beforeFetch'),
                        args: ['config', 'data'],
                    },
                ]
            },
            title: t('form.event'),
        },
    ];
}
