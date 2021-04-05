<script>
import draggable from 'vuedraggable';

export default {
    name: 'DragBox',
    props: ['rule', 'subRule', 'tag'],
    components: {
        draggable
    },
    functional: true,
    render(h, context) {
        const subRule = context.props.rule || {};
        let _class = context.props.tag + '-drag drag-box';
        if (!context.children.length) {
            _class += ' ' + context.props.tag + '-holder';
        }
        subRule.class = _class;
        return h('draggable', {...context.props.rule, on: context.listeners}, context.children);
    }
};
</script>
