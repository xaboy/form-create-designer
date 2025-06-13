import uniqueId from '@form-create/utils/lib/unique';
import {localeProps} from '../../utils';

const label = '协议';
const name = 'protocol';

export default {
    menu: 'main',
    icon: 'icon-link',
    label,
    name,
    input: true,
    event: ['blur', 'focus', 'change', 'input', 'clear'],
    rule({t}) {
        console.log('协议组件初始化');
        return {
            type: 'input',
            field: uniqueId(),
            title: t('com.protocol.name'),
            info: '',
            $required: false,
            props: {
                type: 'text',
                onInput: function(val) {
                    // 安全地获取值
                    console.log('onInput事件触发:', val);
                    // 确保val是字符串
                    const value = String(val || '');
                    const isMatch = /^https?:\/\//.test(value);
                    
                    // 使用更安全的DOM操作方式
                    setTimeout(() => {
                        try {
                            const links = document.querySelectorAll('.el-input-group__append a');
                            console.log('找到链接元素:', links.length);
                            links.forEach(link => {
                                if (isMatch) {
                                    link.href = value;
                                    link.style.display = 'inline-block';
                                    link.style.color = '#409EFF';
                                    link.style.fontWeight = 'bold';
                                    link.style.textDecoration = 'underline';
                                    link.onclick = function(e) {
                                        if (e) {
                                            e.preventDefault();
                                            e.stopPropagation();
                                        }
                                        console.log('链接点击:', value);
                                        window.open(value, '_blank');
                                        return false;
                                    };
                                    console.log('链接已激活:', value);
                                } else {
                                    link.href = 'javascript:void(0);';
                                    link.style.display = 'none';
                                    console.log('链接已隐藏');
                                }
                            });
                        } catch (err) {
                            console.error('更新链接元素时出错:', err);
                        }
                    }, 100);
                }
            },
            children: [{
                type: 'a',
                slot: 'append',
                native: true,
                _fc_drag_tag: '_',
                attrs: {
                    href: 'javascript:void(0);',
                    target: '_blank',
                    style: {
                        display: 'none',
                        marginLeft: '4px',
                        color: '#409EFF',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        textDecoration: 'underline'
                    }
                },
                children: [t('com.protocol.jump')]
            }]
        };
    },
    watch: {
        __link({value, rule}) {
            console.log('Protocol __link changed:', value);
            
            // 确保value是字符串
            const safeValue = String(value || '');
            const isMatch = /^https?:\/\//.test(safeValue);
            console.log('URL matches regex:', isMatch);
            
            const link = isMatch ? safeValue : '';
            rule._link = link;
            
            // 安全地更新rule.value
            if (rule) {
                rule.value = link; // 同步更新输入框的值
            }
            
            // 安全地更新anchor
            const anchor = rule && rule.children && rule.children[0];
            if (!anchor) {
                console.error('找不到链接元素');
                return;
            }
            
            // 直接设置href属性，这样在预览模式下也能正常工作
            if (link) {
                console.log('Setting link visible and href:', link);
                anchor.attrs.href = link;
                anchor.attrs.style = {
                    ...anchor.attrs.style,
                    display: 'inline-block',
                    color: '#409EFF',
                    fontWeight: 'bold',
                    textDecoration: 'underline'
                };
            } else {
                console.log('Hiding link button');
                anchor.attrs.href = 'javascript:void(0);';
                anchor.attrs.style = {
                    ...anchor.attrs.style,
                    display: 'none'
                };
            }
            
            // 添加点击事件处理
            anchor.on = {
                click(e) {
                    console.log('点击事件触发 - on.click');
                    if (e) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    if (!link) {
                        return;
                    }
                    console.log('Protocol link clicked, opening:', link);
                    window.open(link, '_blank');
                }
            };
        },
        value({value, rule}) {
            console.log('Protocol value changed (watch):', value);
            
            // 确保value是字符串
            const safeValue = String(value || '');
            const isMatch = /^https?:\/\//.test(safeValue);
            console.log('URL matches regex:', isMatch);
            
            const link = isMatch ? safeValue : '';
            
            // 安全地更新rule
            if (rule) {
                rule._link = link;
                
                // 同步更新__link属性，触发__link监听器
                if (rule.props) {
                    rule.props.__link = safeValue;
                }
            } else {
                console.error('rule对象不存在');
                return;
            }
            
            // 安全地更新anchor
            const anchor = rule.children && rule.children[0];
            if (!anchor) {
                console.error('找不到链接元素');
                return;
            }
            
            // 直接设置href属性，这样在预览模式下也能正常工作
            if (link) {
                console.log('Setting link visible and href:', link);
                anchor.attrs.href = link;
                anchor.attrs.style = {
                    ...anchor.attrs.style,
                    display: 'inline-block',
                    color: '#409EFF',
                    fontWeight: 'bold',
                    textDecoration: 'underline'
                };
            } else {
                console.log('Hiding link button');
                anchor.attrs.href = 'javascript:void(0);';
                anchor.attrs.style = {
                    ...anchor.attrs.style,
                    display: 'none'
                };
            }
            
            // 添加点击事件处理
            anchor.on = {
                click(e) {
                    console.log('点击事件触发 - on.click');
                    if (e) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    if (!link) {
                        return;
                    }
                    console.log('Protocol link clicked, opening:', link);
                    window.open(link, '_blank');
                }
            };
        }
    },
    attrs: {
        link({rule}) {
            return (rule && rule._link) || '';
        }
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [
            { type: 'input', field: 'placeholder' },
            { type: 'input', field: '__link' }
        ]);
    }
};
