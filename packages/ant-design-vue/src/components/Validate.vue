<template>
    <div class="_fd-validate">
        <template v-for="(item, idx) in validate">
            <div class="_fd-validate-item">
                <div class="_fd-validate-title">
                    <div>
                        <span>{{ idx + 1 }}</span>
                        {{ modes[item.mode] }}
                    </div>
                    <i class="fc-icon icon-delete-circle" @click="remove(idx)"></i>
                </div>
                <a-row>
                    <a-col :span="getSpan(item)">
                        <a-form-item :label="t('validate.mode')">
                            <a-select v-model:value="item.trigger" @change="onInput">
                                <a-select-option v-for="item in triggers" :key="item.value" :value="item.value">{{
                                        item.label
                                    }}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col
                        :span="getSpan(item)"
                        v-if="
                            [
                                'required',
                                'uppercase',
                                'lowercase',
                                'email',
                                'url',
                                'ip',
                                'phone',
                                'positive',
                                'negative',
                                'integer',
                                'number',
                            ].indexOf(item.mode) === -1
                        "
                    >
                        <a-form-item :label="modes[item.mode]">
                            <template v-if="item.mode === 'pattern'">
                                <a-input v-model:value="item[item.mode]" @change="onInput"></a-input>
                            </template>
                            <template v-else-if="item.mode === 'validator'">
                                <FnInput
                                    v-model="item[item.mode]"
                                    name="validator"
                                    :args="item.adapter ? ['value', 'callback'] : ['rule', 'value', 'callback']"
                                    @change="onInput"
                                >{{ t('validate.modes.validator') }}
                                </FnInput>
                            </template>
                            <template v-else>
                                <a-input-number v-model:value="item[item.mode]" @change="onInput"></a-input-number>
                            </template>
                        </a-form-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-item :label="t('validate.message')">
                            <LanguageInput v-model="item.message" :placeholder="t('validate.requiredPlaceholder')" @change="onInput">
                            </LanguageInput>
                        </a-form-item>
                    </a-col>
                </a-row>
            </div>
        </template>

        <a-dropdown trigger="click" size="default">
            <a-button class="_fd-validate-btn _fd-plain-button" type="primary" ghost>{{ t('validate.rule') }} +</a-button>
            <template #overlay>
                <a-menu @click="handleCommand">
                    <a-menu-item v-for="(label, value) in modes" :key="value">
                        <div>{{ label }}</div>
                    </a-menu-item>
                </a-menu>
            </template>
        </a-dropdown>
    </div>
</template>

<script>
import {defineComponent} from 'vue';
import {localeOptions} from '../utils';
import FnInput from './FnInput.vue';
import {deepCopy} from '@form-create/utils/lib/deepextend';
import LanguageInput from './language/LanguageInput.vue';

export default defineComponent({
    name: 'Validate',
    inject: ['designer'],
    emits: ['update:modelValue'],
    props: {
        modelValue: Array,
    },
    components: {
        LanguageInput,
        FnInput,
    },
    watch: {
        modelValue(n) {
            this.validate = this.parseValue(n || []);
        },
    },
    data() {
        return {
            validate: this.parseValue(this.modelValue || []),
        };
    },
    computed: {
        t() {
            return this.designer.setupState.t;
        },
        modes() {
            const activeRule = this.designer.setupState.activeRule;
            if (activeRule && activeRule._menu.subForm === 'object') {
                return {
                    validator: this.t('validate.modes.validator'),
                };
            } else {
                return {
                    len: this.t('validate.modes.len'),
                    maxLen: this.t('validate.modes.maxLen'),
                    minLen: this.t('validate.modes.minLen'),
                    pattern: this.t('validate.modes.pattern'),
                    uppercase: this.t('validate.modes.uppercase'),
                    lowercase: this.t('validate.modes.lowercase'),
                    email: this.t('validate.modes.email'),
                    url: this.t('validate.modes.url'),
                    ip: this.t('validate.modes.ip'),
                    phone: this.t('validate.modes.phone'),
                    min: this.t('validate.modes.min'),
                    max: this.t('validate.modes.max'),
                    positive: this.t('validate.modes.positive'),
                    negative: this.t('validate.modes.negative'),
                    integer: this.t('validate.modes.integer'),
                    number: this.t('validate.modes.number'),
                    validator: this.t('validate.modes.validator'),
                };
            }
        },
        triggers() {
            return localeOptions(this.t, [
                {label: 'blur', value: 'blur'},
                {label: 'change', value: 'change'},
                {label: 'submit', value: 'submit'},
            ]);
        },
    },
    methods: {
        handleCommand({key}) {
            const newItem = {
                mode: key,
                trigger: 'blur',
                adapter: true,
            };

            // 为不同类型的验证规则设置默认值
            if (['uppercase', 'lowercase', 'email', 'url', 'ip', 'phone', 'positive', 'negative', 'integer', 'number'].includes(key)) {
                newItem[key] = true;
            } else if (['min', 'max', 'len', 'minLen', 'maxLen'].includes(key)) {
                newItem[key] = 0;
            } else if (key === 'pattern') {
                newItem[key] = '';
            }
            this.validate.push(newItem);
        },
        autoMessage(item) {
            const title = this.designer.setupState.activeRule.title;
            if (this.designer.setupState.activeRule) {
                item.message = this.t('validate.autoRequired', {title});
                this.onInput();
            }
        },
        getSpan(item) {
            return [
                'pattern',
                'validator',
                'required',
                'uppercase',
                'lowercase',
                'email',
                'url',
                'ip',
                'phone',
                'positive',
                'negative',
                'integer',
                'number',
            ].indexOf(item.mode) > -1
                ? 24
                : 12;
        },
        onInput: function () {
            this.$emit(
                'update:modelValue',
                this.validate.map(item => {
                    item = {...item};
                    if (!item.message) {
                        delete item.message;
                    }
                    return item;
                })
            );
        },
        remove(idx) {
            this.validate.splice(idx, 1);
            this.onInput();
        },
        parseValue(val) {
            return deepCopy(
                val.map(v => {
                    if (v.validator) {
                        v.mode = 'validator';
                    }
                    if (!v.mode) {
                        Object.keys(v).forEach(k => {
                            if (['message', 'type', 'trigger', 'mode'].indexOf(k) < 0) {
                                v.mode = k;
                            }
                        });
                    }
                    return v;
                })
            );
        },
    },
});
</script>

<style>
._fd-validate {
    display: flex;
    flex-direction: column;
    width: 100%;
}

._fd-validate-btn {
    font-weight: 400;
    width: 100%;
}

._fd-validate-item {
    border-bottom: 1px dashed #ECECEC;
    margin-bottom: 10px;
}

._fd-validate-item .ant-col-12:first-child {
    padding-right: 5px;
}

._fd-validate-item .ant-col-12 + .ant-col-12 {
    padding-left: 5px;
}

._fd-validate-item .ant-input-number {
    width: 100%;
}

._fd-validate-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
}

._fd-validate-title > div {
    display: flex;
    align-items: center;
}

._fd-validate-title > div > span {
    width: 16px;
    height: 16px;
    background: #ECECEC;
    text-align: center;
    font-size: 12px;
    line-height: 16px;
    border-radius: 15px;
    margin-right: 5px;
}

._fd-validate-title i {
    cursor: pointer;
}

._fd-validate-title i:hover {
    color: #FF2E2E;
}

._fd-validate .append-msg {
    cursor: pointer;
}
</style>
