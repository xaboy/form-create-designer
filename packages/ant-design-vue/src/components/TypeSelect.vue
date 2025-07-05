<template>
    <a-dropdown class="_fd-type-select" trigger="click" size="default"
                :disabled="disabled || !menus.length">
        <a-tag color="success">
            <template v-if="activeRule">
                {{ t('com.' + (activeRule._menu.name) + '.name') || activeRule._menu.label }} <i
                class="fc-icon icon-down" v-if="!disabled && menus.length"></i>
            </template>
            <template v-else>
                {{
                    t('com.' + (customForm.config.name) + '.name') || customForm.config.label || customForm.config.name
                }}
            </template>
        </a-tag>
        <template #overlay>
            <a-menu class="_fd-type-select-pop">
                <a-menu-item v-for="item in menus" :key="item.name" @click="handleCommand(item)">
                    <div><i class="fc-icon"
                            :class="item.icon || 'icon-input'"></i>{{ t('com.' + (item.name) + '.name') || item.label }}
                    </div>
                </a-menu-item>
            </a-menu>
        </template>
    </a-dropdown>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
    name: 'TypeSelect',
    inject: ['designer'],
    props: {
        disabled: Boolean,
    },
    computed: {
        t() {
            return this.designer.setupState.t;
        },
        activeRule() {
            return this.designer.setupState.activeRule;
        },
        customForm() {
            return this.designer.setupState.customForm;
        },
        menus() {
            let menus = [];
            const designer = this.designer.setupState;
            if (this.activeRule) {
                const name = this.activeRule._menu.name;
                const switchConfig = designer.getConfig('switchType', []);
                if (switchConfig === false) {
                    return menus;
                }
                let switchs = [];
                switchConfig.forEach(lst => {
                    if (lst.indexOf(name) > -1) {
                        switchs.push(...lst);
                    }
                });
                switchs = switchs.filter((key, idx) => {
                    return key !== name && switchs.indexOf(key) === idx;
                });
                if (switchs.length) {
                    designer.menuList.forEach(item => {
                        item.list.forEach(menu => {
                            if (switchs.indexOf(menu.name) > -1) {
                                menus.push(menu);
                            }
                        });
                    });
                } else {
                    designer.menuList.forEach(item => {
                        if (item.name === this.activeRule._menu.menu) {
                            item.list.forEach(menu => {
                                if (menu.name !== name) {
                                    menus.push(menu);
                                }
                            });
                        }
                    });
                }
            }
            return menus.filter(menu => this.designer.setupState.hiddenItem.indexOf(menu.name) === -1);
        }
    },
    methods: {
        handleCommand(item) {
            let activeRule = this.activeRule;
            let rule = this.activeRule;
            if (!rule._menu.inside) {
                rule = rule.__fc__.parent.rule;
            }
            const children = rule.__fc__.parent.rule.children;
            const replaceRule = this.designer.setupState.makeRule(item);
            let newRule = replaceRule;
            if (replaceRule.type === 'DragTool') {
                newRule = replaceRule.children[0];
            }
            if (newRule.field && activeRule.field) {
                ['title', 'info', 'field', 'validate', 'control', '$required'].forEach(k => {
                    newRule[k] = activeRule[k];
                });
            } else if (activeRule?.computed?.hidden) {
                newRule.computed = {hidden: activeRule.computed.hidden}
            }
            if (activeRule.name) {
                newRule.name = activeRule.name;
            }
            ['name', 'id', 'on'].forEach(k => {
                if (activeRule[k]) {
                    newRule[k] = activeRule[k];
                }
            })
            children.splice(children.indexOf(rule), 1, replaceRule);
            this.$nextTick(() => {
                this.designer.setupState.triggerActive(newRule);
            });
        }
    }
});
</script>

<style>
._fd-type-select {
    cursor: pointer;
}

._fd-type-select[disabled] {
    cursor: default;
}

._fd-type-select .fc-icon {
    font-size: 14px;
}

._fd-type-select-pop {
    max-height: 500px;
    overflow: auto;
}

._fd-type-select-pop .fc-icon {
    font-size: 14px;
    margin-right: 5px;
}
</style>
