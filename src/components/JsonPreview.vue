<template>
    <el-container class="_fc-json-preview">
        <el-header height="40px" class="_fc-l-tabs">
            <div class="_fc-l-tab"
                 :class="{active: active==='rule'}"
                 @click="active='rule'"> {{ t('designer.json') }}
            </div>
            <div class="_fc-l-tab"
                 :class="{active: active==='options'}"
                 @click="active='options'"> {{ t('designer.form') }}
            </div>
        </el-header>
        <el-main style="padding: 8px;">
            <StructEditor ref="editor" v-model="value" @blur="handleBlur" @focus="handleFocus" format
                          style="height:100%;"></StructEditor>
        </el-main>
    </el-container>
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
            value: this.designer.getRule(),
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
                return this.designer.children;
            } else {
                return this.designer.formOptions;
            }
        },
        t() {
            return this.designer.t;
        },
    },
    methods: {
        updateValue() {
            if (this.active === 'rule') {
                this.value = this.designer.getRule();
            } else {
                this.value = this.designer.getOptions();
            }
        },
        handleFocus() {
            this.oldValue = designerForm.toJson(this.value);
        },
        handleBlur() {
            if (this.$refs.editor.save() && designerForm.toJson(this.value) !== this.oldValue) {
                if (this.active === 'rule') {
                    this.designer.setRule(this.value || []);
                } else {
                    this.designer.setOptions(this.value || {});
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
