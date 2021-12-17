const name = 'col';

export default {
    name,
    drag: true,
    dragBtn: false,
    inside: true,
    rule() {
        return {
            type: name,
            props: {span: 12,xs:24},
            children: []
        };
    },
    props() {
        return [
            {type: 'slider', field: 'span', title: '栅格占据的列数', value: 12, props: {min: 0, max: 24}},
            {type: 'slider', field: 'xs', title: '<768栅格占据的列数', value: 24, props: {min: 0, max: 24}},
            {type: 'slider', field: 'offset', title: '栅格左侧的间隔格数', props: {min: 0, max: 24}},
            {type: 'slider', field: 'push', title: '栅格向右移动格数', props: {min: 0, max: 24}},
            {type: 'slider', field: 'pull', title: '栅格向左移动格数', props: {min: 0, max: 24}}];
    }
};