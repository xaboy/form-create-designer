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
            field: 'layout',
            value: 'horizontal',
            title: t('form.layout'),
            options: localeOptions(t, [
                {value: 'horizontal', label: 'horizontal'},
                {value: 'vertical', label: 'vertical'},
            ])
        }, {
            type: 'radio',
            field: 'labelAlign',
            value: 'left',
            title: t('form.layout'),
            options: localeOptions(t, [
                {value: 'left', label: 'left'},
                {value: 'right', label: 'right'},
            ])
        }, {
            type: 'switch',
            field: 'labelWrap',
            value: false,
            title: t('form.labelWrap'),
        }, {
            type: 'radio',
            field: 'size',
            value: 'small',
            title: t('form.size'),
            options: localeOptions(t, [
                {value: 'large', label: 'large'},
                {value: 'middle', label: 'middle'},
                {value: 'small', label: 'small'},
            ])
        }, {
            type: 'switch',
            field: 'colon',
            value: false,
            title: t('form.colon'),
        }, {
            type: 'SizeInput',
            field: '>form>labelCol>style>width',
            value: '',
            title: t('form.labelCol'),
        }, {
            type: 'switch',
            field: 'hideRequiredMark',
            value: false,
            title: t('form.hideRequiredMark'),
        }, {
            type: 'switch',
            field: 'scrollToFirstError',
            value: false,
            title: t('form.scrollToFirstError'),
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
