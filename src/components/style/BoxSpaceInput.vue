<template>
    <div class="_fd-box-space-input">
        <div class="_padding">
            <span class="_padding-title">
                {{ t('style.margin') }}
            </span>
            <input class="_fd-input _fd-top" placeholder="        " :value="boxStyle.marginTop" type="text"
                   @blur="(e)=>setValue('margin','Top', e)" @input="(e)=>change('marginTop', e)">
            <input class="_fd-input _fd-right" placeholder="        " :value="boxStyle.marginRight" type="text"
                   @blur="(e)=>setValue('margin','Right', e)" @input="(e)=>change('marginRight', e)">
            <input class="_fd-input _fd-bottom" placeholder="        " :value="boxStyle.marginBottom" type="text"
                   @blur="(e)=>setValue('margin','Bottom', e)" @input="(e)=>change('marginBottom', e)">
            <input class="_fd-input _fd-left" placeholder="        " :value="boxStyle.marginLeft" type="text"
                   @blur="(e)=>setValue('margin','Left', e)" @input="(e)=>change('marginLeft', e)">
            <div class="_fd-help">
                <i class="fc-icon icon-link2" title="lock" :class="marginLock ? 'active' : ''"
                   @click="lock('margin')"></i>
                <i class="fc-icon icon-delete-circle" title="clear" @click="clear('margin')"></i>
            </div>
            <div class="_margin">
                <span class="_margin-title">
                    {{ t('style.padding') }}
                </span>
                <div class="_fd-help">
                    <i class="fc-icon icon-link2" title="lock" :class="paddingLock ? 'active' : ''"
                       @click="lock('padding')"></i>
                    <i class="fc-icon icon-delete-circle" title="clear" @click="clear('padding')"></i>
                </div>
                <input class="_fd-input _fd-top" placeholder="        " :value="boxStyle.paddingTop" type="text"
                       @blur="(e)=>setValue('padding','Top', e)" @input="(e)=>change('paddingTop', e)">
                <input class="_fd-input _fd-right" placeholder="        " :value="boxStyle.paddingRight" type="text"
                       @blur="(e)=>setValue('padding','Right', e)" @input="(e)=>change('paddingRight', e)">
                <input class="_fd-input _fd-bottom" placeholder="        " :value="boxStyle.paddingBottom" type="text"
                       @blur="(e)=>setValue('padding','Bottom', e)" @input="(e)=>change('paddingBottom', e)">
                <input class="_fd-input _fd-left" placeholder="        " :value="boxStyle.paddingLeft" type="text"
                       @blur="(e)=>setValue('padding','Left', e)" @input="(e)=>change('paddingLeft', e)">
                <div class="_box">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {defineComponent} from 'vue';
import ConfigItem from './ConfigItem.vue';

export default defineComponent({
    name: 'BoxSpaceInput',
    components: {ConfigItem},
    props: {
        modelValue: {
            type: Object,
            default: () => ({}),
        }
    },
    inject: ['designer'],
    emits: ['update:modelValue', 'change'],
    model: {
        prop: 'modelValue',
        event: 'update:modelValue',
    },
    data() {
        return {
            position: ['Top', 'Right', 'Bottom', 'Left'],
            boxStyle: {
                margin: '',
                padding: '',
                marginLeft: '',
                marginRight: '',
                marginTop: '',
                marginBottom: '',
                paddingLeft: '',
                paddingRight: '',
                paddingTop: '',
                paddingBottom: '',
            },
            marginLock: false,
            paddingLock: false,
        }
    },
    watch: {
        modelValue() {
            this.tidyValue();
        },
    },
    computed: {
        t() {
            return this.designer.t;
        }
    },
    methods: {
        tidyValue() {
            this.boxStyle = {};
            ['margin', 'padding'].forEach(k => {
                this.boxStyle[k] = this.modelValue[k] || '';
                this.position.forEach(p => {
                    this.boxStyle[k + p] = this.tidySize(this.modelValue[k + p] || this.modelValue[k] || '');
                });
            })
        },
        onInput() {
            const style = Object.keys(this.boxStyle).reduce((acc, key) => {
                if (this.boxStyle[key] !== '') {
                    acc[key] = this.boxStyle[key]
                }
                return acc
            }, {})
            this.$emit('update:modelValue', style)
            this.$emit('change', style)
        },
        tidySize(val) {
            const regex = /^(\d*\.?\d+)(px|rem|%|vh|vw|em)$/
            if (!regex.test(val)) {
                if (val === 'auto') {
                    return val;
                }
                const number = parseInt(val);
                if (isNaN(number)) {
                    return '';
                } else {
                    return number + 'px';
                }
            }
            return val;
        },
        setValue(type, key, e) {
            const value = this.tidySize(e.target.value);
            if (!type) {
                this.boxStyle[key] = value;
            } else if (this[type + 'Lock']) {
                this.position.forEach(v => {
                    this.boxStyle[type + v] = value;
                })
            } else {
                this.boxStyle[type + key] = value;
            }
            this.onInput();
        },
        change(type, e) {
            this.boxStyle[type] = e.target.value;
        },
        clear(type) {
            this.position.forEach(v => {
                this.boxStyle[type + v] = '';
            })
            this.onInput();
        },
        lock(type) {
            const key = type + 'Lock';
            this[key] = !this[key];
        },

    },
    created() {
        this.tidyValue();
    }
});

</script>

<style>

._fd-box-space-input {
    color: #000000;
}

._fd-box-space-input ._padding, ._fd-box-space-input ._margin {
    width: 100%;
    height: 180px;
    background-color: #F2CEA5;
    padding: 40px 55px;
    box-sizing: border-box;
    position: relative;
}

html.dark ._fd-box-space-input ._padding, ._fd-box-space-input ._margin {
    background-color: #A9855C;
}

._fd-box-space-input ._margin {
    width: 100%;
    height: 100px;
    background-color: #C6CF92;
}

._fd-box-space-input ._fd-input {
    display: inline-block;
    width: 30%;
    max-width: 40px;
    height: 20px;
    border: 0 none;
    padding: 0;
    margin: 0;
    outline: 0 none;
    text-align: center;
    font-size: 12px;
    background-color: unset;
    text-decoration: underline;
}

._fd-box-space-input ._fd-input:hover, ._fd-box-space-input ._fd-input:focus {
    background-color: #ECECEC;
    opacity: 0.9;
    color: #262626;
}

._fd-box-space-input ._fd-left, ._fd-box-space-input ._fd-right {
    position: absolute;
    left: 7px;
    top: 50%;
    margin-top: -10px;
}

._fd-box-space-input ._fd-top, ._fd-box-space-input ._fd-bottom {
    position: absolute;
    left: 50%;
    top: 5px;
    margin-left: -20px;
}

._fd-box-space-input ._fd-bottom {
    top: unset;
    bottom: 15px;
}

._fd-box-space-input ._fd-right {
    left: unset;
    right: 2px;
}

._fd-box-space-input ._box {
    width: 100%;
    height: 100%;
    background-color: #94B5C0;
    display: flex;
    align-items: center;
    justify-content: center;
}

._fd-box-space-input ._padding-title, ._fd-box-space-input ._margin-title {
    position: absolute;
    top: 2px;
    left: 4px;
}

._fd-box-space-input ._fd-help {
    display: flex;
    align-items: center;
    position: absolute;
    right: 5px;
    top: 5px;
    color: #AAAAAA;
}

._fd-box-space-input ._padding .fc-icon {
    cursor: pointer;
    color: #262626;
    font-size: 12px;
}

._fd-box-space-input ._padding .fc-icon + .fc-icon {
    margin-left: 2px;
}

._fd-box-space-input .fc-icon.active {
    color: #2E73FF;
}

._fd-box-space-input ._fd-x {
    margin: 0 5px;
}
</style>