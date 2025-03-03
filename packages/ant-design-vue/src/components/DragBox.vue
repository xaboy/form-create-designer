<script>
import {defineComponent, h} from 'vue';
import draggable from 'vuedraggable/src/vuedraggable';

export default defineComponent({
    name: 'DragBox',
    props: ['rule', 'tag', 'formCreateInject', 'list'],
    render(ctx) {
        const attrs = {...ctx.$props.rule.props, ...ctx.$attrs};
        let _class = '_fd-' + ctx.$props.tag + '-drag _fd-drag-box';
        if (!Object.keys(ctx.$slots).length) {
            _class += ' drag-holder';
        }
        attrs.class = _class;
        attrs.modelValue = ctx.$props.list || [...ctx.$props.formCreateInject.children];

        const keys = {};
        if (ctx.$slots.default) {
            const children = ctx.$slots.default();
            children.forEach(v => {
                if (v.key) {
                    keys[v.key] = v;
                }
            })
        }
        return h(draggable, attrs, {
            item: ({element, index}) => {
                const key = element?.__fc__?.key;
                if (key) {
                    let vnode = keys['_' + element.slot];
                    if (vnode) {
                        vnode.children.forEach(v => {
                            if (v.key === key + 'fc') {
                                vnode = v
                            }
                        });
                    } else {
                        vnode = keys[key + 'fc'];
                    }
                    if (vnode) {
                        return h('div', {class: '_fc-' + ctx.$props.tag + '-item _fd-drag-item', key}, vnode);
                    }
                }
                return h('div', {class: '_fc-' + ctx.$props.tag + '-item _fd-drag-item', key: index}, null);
            }
        });
    }
});
</script>
