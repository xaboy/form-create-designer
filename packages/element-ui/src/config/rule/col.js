import {localeProps} from '../../utils';

const name = 'col';

const devices = {
    xs: '<768px',
    sm: '≥768px',
    md: '≥992px',
    lg: '≥1200px',
    xl: '≥1920px',
};

export default {
    name,
    label: '格子',
    drag: true,
    dragBtn: false,
    inside: true,
    mask: false,
    rule() {
        return {
            type: name,
            props: {span: 12},
            children: []
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [
            {type: 'slider', field: 'span', value: 12, props: {min: 0, max: 24}},
            {type: 'slider', field: 'offset', props: {min: 0, max: 24}},
            {type: 'slider', field: 'push', props: {min: 0, max: 24}},
            {type: 'slider', field: 'pull', props: {min: 0, max: 24}},
            {
                type: 'ConfigItem',
                props: {
                    label: t('props.reactive')
                },
                children: [
                    {
                        type: 'elTabs',
                        style: {
                            width: '100%'
                        },
                        slot: 'append',
                        children: Object.keys(devices).map(k => {
                            return {
                                type: 'elTabPane',
                                props: {
                                    label: devices[k]
                                },
                                style: 'padding:0 10px;',
                                children: [
                                    {
                                        type: 'slider',
                                        field: k + '>span',
                                        title: t('com.col.props.span'),
                                        value: 12,
                                        props: {min: 0, max: 24},
                                    },
                                    {
                                        type: 'slider',
                                        field: k + '>offset',
                                        title: t('com.col.props.offset'),
                                        props: {min: 0, max: 24},
                                    },
                                    {
                                        type: 'slider',
                                        field: k + '>push',
                                        title: t('com.col.props.push'),
                                        props: {min: 0, max: 24},
                                    },
                                    {
                                        type: 'slider',
                                        field: k + '>pull',
                                        title: t('com.col.props.pull'),
                                        props: {min: 0, max: 24},
                                    }
                                ]
                            };
                        })
                    }
                ]
            },
        ]);
    }
};
