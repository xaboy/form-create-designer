<template>
    <div id="app">
        <div class="_fc-t-header">
            <img class="_fc-t-logo" src="http://form-create.com/logo.png">
            <div class="_fc-t-name">form-create-designer</div>
            <div class="_fc-t-menu">
                <el-button size="mini" icon="fc-icon icon-import" @click="setJson"> 导入JSON</el-button>
                <el-button size="mini" icon="fc-icon icon-import" @click="setOption"> 导入Options</el-button>
                <el-button size="mini" type="primary" @click="showJson">生成JSON</el-button>
                <el-button size="mini" type="success" @click="showOption">生成Options</el-button>
                <el-button size="mini" type="danger" @click="showTemplate">生成组件</el-button>
            </div>
        </div>
        <fc-designer ref="designer"/>

        <ElFooter class="_fc-copyright" height="30px">
          <div class="_fc-b-item">
            <el-popover
                placement="top"
                width="400"
                trigger="hover">
              <el-image src="http://form-create.com/img/donation.jpg"></el-image>
              <span slot="reference">赞助</span>
            </el-popover>
          </div> <span style="margin: 0 5px;">|</span>
          <div class="_fc-b-item">
              <iframe src="https://ghbtns.com/github-btn.html?user=xaboy&amp;repo=form-create-designer&amp;type=star&amp;count=true&amp;size=mini" frameborder="0" scrolling="0" width="90" height="21" title="GitHub"></iframe>
          </div> <span style="margin: 0 5px;">|</span>
          <div class="_fc-b-item">
            <a href='https://gitee.com/xaboy/form-create-designer/stargazers' style="display: inline-flex;"><img src='https://gitee.com/xaboy/form-create-designer/badge/star.svg?theme=dark' alt='gitee'/></a>
          </div>
        </ElFooter>

        <el-dialog :title="title[type]" :visible.sync="state" class="_fc-t-dialog">
            <div ref="editor" v-if="state"></div>
            <span style="color: red;" v-if="err">输入内容格式有误!</span>
            <span slot="footer" class="dialog-footer" v-if="type > 2">
            <el-button @click="state = false" size="small">取 消</el-button>
            <el-button type="primary" @click="onOk" size="small">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
import jsonlint from 'jsonlint-mod';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/lint/lint.css';
import CodeMirror from 'codemirror/lib/codemirror';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/lint/json-lint';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/vue/vue';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/css/css';
import 'codemirror/addon/mode/overlay';
import 'codemirror/addon/mode/simple';
import 'codemirror/addon/selection/selection-pointer';
import 'codemirror/mode/handlebars/handlebars';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/pug/pug';

import is from '@form-create/utils/lib/type';
import formCreate from '@form-create/element-ui';
import {defineComponent} from 'vue';

const TITLE = ['生成规则', '表单规则', '生成组件', '设置生成规则', '设置表单规则'];

export default defineComponent({
    name: 'app',
    data() {
        return {
            state: false,
            value: null,
            title: TITLE,
            editor: null,
            err: false,
            type: -1,
        };
    },
    watch: {
        state(n) {
            if (!n) {
                this.value = null;
                this.err = false;
            }
        },
        value() {
            this.load();
        }
    },
    methods: {
        load() {
            let val;
            if(this.type === 2){
                val = this.value;
            }else if(this.type === 0){
                val = formCreate.toJson(this.value, 2);
            }else{
                val = JSON.stringify(this.value, null, 2);
            }
            this.$nextTick(() => {
                this.editor = CodeMirror(this.$refs.editor, {
                    lineNumbers: true,
                    mode: this.type === 2 ? {name: 'vue'} : 'application/json',
                    gutters: ['CodeMirror-lint-markers'],
                    lint: true,
                    line: true,
                    tabSize: 2,
                    lineWrapping: true,
                    value: val || ''
                });
                this.editor.on('blur', () => {
                    this.err = this.editor.state.lint.marked.length > 0;
                });
            });
        },
        onValidationError(e) {
            this.err = e.length !== 0;
        },
        showJson() {
            this.state = true;
            this.type = 0;
            this.value = this.$refs.designer.getRule();
        },
        showOption() {
            this.state = true;
            this.type = 1;
            this.value = this.$refs.designer.getOption();
        },
        showTemplate() {
            this.state = true;
            this.type = 2;
            this.value = this.makeTemplate();
        },
        setJson() {
            this.state = true;
            this.type = 3;
            this.value = [];
        },
        setOption() {
            this.state = true;
            this.type = 4;
            this.value = {form: {}};
        },
        onOk() {
            if (this.err) return;
            const json = this.editor.getValue();
            let val = JSON.parse(json);
            if (this.type === 3) {
                if (!Array.isArray(val)) {
                    this.err = true;
                    return;
                }
                this.$refs.designer.setRule(formCreate.parseJson(json));
            } else {
                if (!is.Object(val) || !val.form) {
                    this.err = true;
                    return;
                }
                this.$refs.designer.setOption(val);
            }
            this.state = false;
        },
        makeTemplate() {
            const rule = this.$refs.designer.getRule();
            const opt = this.$refs.designer.getOption();
            return `<template>
  <form-create
    v-model="fapi"
    :rule="rule"
    :option="option"
    @submit="onSubmit"
  ></form-create>
</template>

<script>
import formCreate from "@form-create/element-ui";

export default {
  data () {
    return {
        fapi: null,
        rule: formCreate.parseJson('${formCreate.toJson(rule).replaceAll('\\','\\\\')}'),
        option: formCreate.parseJson('${JSON.stringify(opt)}')
    }
  },
  methods: {
    onSubmit (formData) {
      //todo 提交表单
    }
  }
}
<\/script>`;
        }
    },
    beforeCreate() {
        window.jsonlint = jsonlint;
    }
});
</script>

<style>
    ._fc-t-header {
        height: 60px;
        margin: 0 20px;
        position: relative;
        display: flex;
        align-items: center;
        cursor: default;
    }

    ._fc-t-logo {
        height: 26px;
    }

    ._fc-t-name {
        display: inline-block;
        color: rgba(0, 0, 0, 0.8);
        font-size: 20px;
        font-weight: 600;
        margin-left: 5px;
    }

    ._fc-t-menu {
        position: absolute;
        right: 0;
    }

    ._fc-t-menu i {
        font-size: 12px;
    }

    body {
        min-height: 100vh;
        padding: 0;
        margin: 0;
        display: flex !important;
        flex-direction: column !important;
    }

    #app {
        display: flex;
        flex-direction: column;
        flex: 1;
    }

    ._fc-copyright {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 0 20px;
        font-size: 16px;
        border-top: 1px solid #ECECEC;
        background-color: #fff;
        cursor: pointer;
    }

    ._fc-t-dialog .CodeMirror {
        height: 450px;
    }

    ._fc-t-dialog .CodeMirror-line {
        line-height: 16px !important;
        font-size: 13px !important;
    }

    .CodeMirror-lint-tooltip {
        z-index: 2021 !important;
    }

    ._fc-t-dialog .el-dialog__body {
        padding: 0px 20px;
    }
    ._fc-b-item{
      display: flex;
    }

</style>
