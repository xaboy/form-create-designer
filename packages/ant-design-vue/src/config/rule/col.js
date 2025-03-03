import {localeProps} from '../../utils';

const name = 'col';

const devices = {
    xxs: '<576px',
    sm: '≥576px',
    md: '≥768px',
    lg: '≥992px',
    xl: '≥1200px',
    xxl: '≥1600px',
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
                    label: t('props.reactive'),
                },
                children: [
                    {
                        type: 'aTabs',
                        style: {
                            width: '100%'
                        },
                        slot: 'append',
                        children: Object.keys(devices).map(k => {
                            return {
                                type: 'aTabPane',
                                props: {
                                    tab: devices[k]
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
