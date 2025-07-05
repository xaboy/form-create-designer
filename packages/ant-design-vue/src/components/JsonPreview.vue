<template>
    <a-layout class="_fc-json-preview">
        <a-layout-header style="height:40px;" class="_fc-l-tabs">
            <div class="_fc-l-tab"
                 :class="{active: active==='rule'}"
                 @click="active='rule'"> {{ t('designer.json') }}
            </div>
            <div class="_fc-l-tab"
                 :class="{active: active==='options'}"
                 @click="active='options'"> {{ t('designer.form') }}
            </div>
        </a-layout-header>
        <a-layout-content style="padding: 8px;">
            <StructEditor ref="editor" v-model="value" @blur="handleBlur" @focus="handleFocus" format
                          style="height:100%;"></StructEditor>
        </a-layout-content>
    </a-layout>
</template>

<script>
import {defineComponent} from 'vue';
import StructEditor from './StructEditor.vue';
import {designerForm} from '../utils/form';

export default defineComponent({
    name: 'JsonPreview',
    components: {StructEditor},
    inject: ['designer'],
    data() {
        return {
            active: 'rule',
            value: this.designer.setupState.getRule(),
            oldValue: '',
        }
    },
    watch: {
        active() {
            this.updateValue();
        }
    },
    computed: {
        change() {
            if (this.active === 'rule') {
                return this.designer.setupState.children;
            } else {
                return this.designer.setupState.formOptions;
            }
        },
        t() {
            return this.designer.setupState.t;
        },
    },
    methods: {
        updateValue() {
            if (this.active === 'rule') {
                this.value = this.designer.setupState.getRule();
            } else {
                this.value = this.designer.setupState.getOptions();
            }
        },
        handleFocus() {
            this.oldValue = designerForm.toJson(this.value);
        },
        handleBlur() {
            let str;
            if (this.$refs.editor.save() && (str = designerForm.toJson(this.value)) !== this.oldValue) {
                if (this.active === 'rule') {
                    this.designer.setupState.setRule(str);
                } else {
                    this.designer.setupState.setOptions(this.value || {});
                }
            }
        }
    },
    mounted() {
        this.$watch(() => this.change, () => {
            this.updateValue();
        }, {deep: true});
    }
});
</script>

<style>
._fc-json-preview {
    display: flex;
    width: 100%;
    color: #262626;
}

._fc-json-preview .CodeMirror {
    height: 100%;
    font-size: 12px;
}
</style>
