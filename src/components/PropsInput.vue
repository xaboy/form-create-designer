<template>
    <Struct class="_fd-props-input" :modelValue="props" @update:modelValue="onInput" :title="t('designer.customProps')">
        <i class="fc-icon icon-edit"></i>
    </Struct>

</template>

<script>
import {defineComponent} from 'vue';
import Struct from './Struct.vue';

export default defineComponent({
    name: 'PropsInput',
    components: {Struct},
    inject: ['designer'],
    data() {
        return {}
    },
    computed: {
        t() {
            return this.designer.t;
        },
        activeRule() {
            return this.designer.activeRule;
        },
        props() {
            const propsKeys = this.activeRule._fc_store?.props_keys || [];
            const props = {};
            propsKeys.forEach(k => {
                if (this.activeRule.props && this.activeRule.props[k] != null) {
                    props[k] = this.activeRule.props[k];
                }
            });
            return props;
        },
    },
    methods: {
        onInput(props) {
            if (!this.activeRule.props) {
                this.$set(this.activeRule, 'props', {});
            }
            if (!this.activeRule._fc_store) {
                this.$set(this.activeRule, '_fc_store', {});
            }
            Object.keys(this.props).forEach(k => {
                if ((props || {})[k] == null) {
                    this.$delete(this.activeRule.props, k);
                }
            });
            const keys = Object.keys(props || {});
            keys.forEach(k => {
                this.$set(this.activeRule.props, k, props[k]);
            })
            if (keys.length) {
                this.$set(this.activeRule._fc_store, 'props_keys', keys);
            } else {
                this.$delete(this.activeRule._fc_store, 'props_keys');
            }
        }
    }

});
</script>

<style>
._fd-props-input {
    display: inline-block;
    width: 16px;
}

._fd-props-input .fc-icon {
    cursor: pointer;
}
</style>
