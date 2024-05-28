<template>
    <div class="_fd-drag-tool" @click.stop="active" :class="{active: fcx.active === id}">
        <div class="_fd-drag-mask" v-if="mask"></div>
        <div class="_fd-drag-l" v-if="!hiddenBtn">
            <div class="_fd-drag-btn" v-if="fcx.active === id && dragBtn !== false" style="cursor: move;">
                <i class="fc-icon icon-move"></i>
            </div>
        </div>
        <div class="drag-r" v-if="btns !== false && !hiddenMenu">
            <slot name="handle">
                <div class="_fd-drag-btn" v-if="isCreate && (btns === true || btns.indexOf('create') > -1)"
                     @click="$emit('create')">
                    <i class="fc-icon icon-add"></i>
                </div>
                <div class="_fd-drag-btn" v-if="!only && (btns === true || btns.indexOf('copy') > -1)"
                     @click="$emit('copy')">
                    <i class="fc-icon icon-copy"></i>
                </div>
                <div class="_fd-drag-btn" v-if="children && (btns === true || btns.indexOf('addChild') > -1)"
                     @click="$emit('addChild')">
                    <i class="fc-icon icon-add-child"></i>
                </div>
                <div class="_fd-drag-btn _fd-drag-danger" v-if="btns === true || btns.indexOf('delete') > -1"
                     @click="$emit('delete')">
                    <i class="fc-icon icon-delete"></i>
                </div>
            </slot>
        </div>
        <slot name="default"></slot>
    </div>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
    name: 'DragTool',
    emits: ['create', 'copy', 'addChild', 'delete', 'active', 'fc.el'],
    props: {
        dragBtn: Boolean,
        children: String,
        mask: Boolean,
        handleBtn: [Boolean, Array],
        formCreateInject: Object,
        unique: String,
        only: Boolean
    },
    inject: {
        fcx: {
            default: null
        },
        designer: {
            default: null
        },
        dragTool: {
            default: null
        },
    },
    provide() {
        return {
            dragTool: this
        }
    },
    computed: {
        isCreate() {
            return this.dragTool ? !!this.dragTool.children : false;
        },
        btns() {
            if (Array.isArray(this.handleBtn)) {
                return this.handleBtn.length ? this.handleBtn : false;
            }
            return this.handleBtn !== false;
        },
        id() {
            return this.unique || this.formCreateInject.id;
        },
        hiddenMenu() {
            return this.designer.ctx.hiddenDragMenu;
        },
        hiddenBtn() {
            return this.designer.ctx.hiddenDragBtn;
        },
    },
    methods: {
        active() {
            if (this.fcx.active === this.id) return;
            this.fcx.active = this.id;
            this.$emit('active');
        }
    },
    mounted() {
        this.$emit('fc.el', this);
    },
});
</script>

<style>
._fd-drag-tool {
    position: relative;
    display: block;
    min-height: 20px;
    box-sizing: border-box;
    padding: 2px;
    outline: 1px dashed var(--fc-tool-border-color);
    overflow: hidden;
    word-wrap: break-word;
    word-break: break-all;
    transition: outline-color 0.3s ease;
}

._fd-drag-tool ._fd-drag-tool {
    height: calc(100% - 6px);
    margin: 3px;
}

._fd-drag-tool + ._fd-drag-tool {
    margin-top: 5px;
}

._fd-drag-tool.active {
    outline: 2px solid #2E73FF;
}

._fd-drag-tool.active > div > ._fd-drag-btn {
    display: flex;
}

._fd-drag-tool._fd-drop-hover ._fd-drag-box {
    padding-top: 15px !important;
    padding-bottom: 15px !important;
}

._fd-drag-tool ._fd-drag-btn {
    display: none;
}

.drag-r {
    position: absolute;
    right: 2px;
    bottom: 2px;
    z-index: 1904;
}

._fd-drag-l {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1904

}

._fd-drag-btn {
    height: 18px;
    width: 18px;
    color: #fff;
    background-color: #2E73FF;
    text-align: center;
    line-height: 20px;
    padding-bottom: 1px;
    float: left;
    cursor: pointer;
    justify-content: center;
}

._fd-drag-btn + ._fd-drag-btn {
    margin-left: 2px;
}

._fd-drag-danger {
    background-color: #FF2E2E;
}

._fd-drag-btn i {
    font-size: 14px;
}

._fd-drag-mask {
    z-index: 1900;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;;
}
</style>
