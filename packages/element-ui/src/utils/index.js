import is, {hasProperty} from '@form-create/utils/lib/type';
import {parseFn} from '@form-create/utils/lib/json';
import toCase from '@form-create/utils/lib/tocase';
import {computed, isRef, ref, unref} from 'vue';
import ZhCn from '../locale/zh-cn';
import {message} from './message';

export {formTemplate, formTemplateV3, htmlTemplate} from './template';


export function makeRequiredRule() {
    return {
        type: 'Required', field: 'formCreate$required', title: '是否必填'
    };
}

export function addAutoKeyMap(cm) {
}

export function makeTreeOptions(pre, config, level, data = []) {
    if (!config.id) {
        config.id = 1;
    }
    level && level--;
    for (let i = 0; i < 3; i++) {
        const item = {
            [config.label]: pre + level * 10 + (i + 1),
            [config.value]: '' + config.id++,
        };
        if (level) {
            makeTreeOptions(pre, config, level, item.children = []);
        }
        data.push(item);
    }
    return data;
}

export function makeOptionsRule(t, to) {
    const options = [
        {'label': t('fetch.optionsType.struct'), 'value': 2},
        {'label': t('fetch.optionsType.fetch'), 'value': 1},
    ];

    const control = [
        {
            value: 1,
            rule: [
                {
                    type: 'FetchConfig',
                    field: 'formCreateEffect>fetch',
                    props: {
                        to
                    }
                }
            ]
        },
        {
            value: 2,
            rule: [
                {
                    type: 'TableOptions',
                    field: 'formCreate' + upper(to).replace('.', '>'),
                    props: {
                        column: [{label: t('props.key'), key: 'label'}, {value: true, label: t('props.value'), key: 'value'}],
                        keyValue: 'label'
                    }
                },
            ],
        }
    ];

    return {
        type: 'radio',
        title: t('props.options'),
        field: '_optionType',
        value: 2,
        options,
        props: {
            type: 'button'
        },
        control
    };
}

export function makeTreeOptionsRule(t, to, label, value) {
    const options = [
        {'label': t('fetch.optionsType.struct'), 'value': 2},
        {'label': t('fetch.optionsType.fetch'), 'value': 1},
    ];

    const control = [
        {
            value: 1,
            rule: [
                {
                    type: 'FetchConfig',
                    field: 'formCreateEffect>fetch',
                    props: {
                        to
                    }
                }
            ]
        },
        {
            value: 2,
            rule: [
                {
                    type: 'TreeOptions',
                    field: 'formCreate' + upper(to).replace('.', '>'),
                    props: {
                        columns: {
                            label,
                            value
                        },
                        keyValue: label,
                    }
                },
            ],
        }
    ];

    return {
        type: 'radio',
        title: t('props.options'),
        field: '_optionType',
        value: 2,
        options,
        props: {
            type: 'button'
        },
        control
    };
}

export function upper(str) {
    return str.replace(str[0], str[0].toLocaleUpperCase());
}

export const toJSON = function (val) {
    const type = /object ([a-zA-Z]*)/.exec(Object.prototype.toString.call(val));
    if (type && _toJSON[type[1].toLowerCase()]) {
        return _toJSON[type[1].toLowerCase()](val);
    } else {
        return val;
    }
};

const _toJSON = {
    object: function (val) {
        var json = [];
        for (var i in val) {
            if (!hasProperty(val, i)) continue;
            json.push(
                toJSON(i) + ': ' +
                ((val[i] != null) ? toJSON(val[i]) : 'null')
            );
        }
        return '{\n ' + json.join(',\n ') + '\n}';
    },
    function: function (val) {
        val = '' + val;
        var exec = (/^ *([\w]+) *\(/).exec(val);
        if (exec && exec[1] !== 'function') {
            return 'function ' + val;
        }
        return val;
    },
    array: function (val) {
        for (var i = 0, json = []; i < val.length; i++)
            json[i] = (val[i] != null) ? toJSON(val[i]) : 'null';
        return '[' + json.join(', ') + ']';
    },
    string: function (val) {
        var tmp = val.split('');
        for (var i = 0; i < tmp.length; i++) {
            var c = tmp[i];
            (c >= ' ') ?
                (c === '\\') ? (tmp[i] = '\\\\') :
                    (c === '"') ? (tmp[i] = '\\"') : 0 :
                (tmp[i] =
                        (c === '\n') ? '\\n' :
                            (c === '\r') ? '\\r' :
                                (c === '\t') ? '\\t' :
                                    (c === '\b') ? '\\b' :
                                        (c === '\f') ? '\\f' :
                                            (c = c.charCodeAt(), ('\\u00' + ((c > 15) ? 1 : 0) + (c % 16)))
                );
        }
        return '"' + tmp.join('') + '"';
    }
};

export const deepParseFn = function (target) {
    if (target && typeof target === 'object') {
        for (let key in target) {
            if (Object.prototype.hasOwnProperty.call(target, key)) {
                let data = target[key];
                if (Array.isArray(data) || is.Object(data)) {
                    deepParseFn(data);
                }
                if (is.String(data)) {
                    target[key] = parseFn(data);
                }
            }
        }
    }
    return target;
};


export function deepGet(object, path, defaultValue) {
    path = (path || '').split('.');

    let index = 0,
        length = path.length;

    while (object != null && index < length) {
        object = object[path[index++]];
    }
    return (index && index === length) ? (object !== undefined ? object : defaultValue) : defaultValue;
}

export const buildTranslator = (locale) => (path, option) => translate(path, option, unref(locale));

export const translate = (path, option, locale) =>
    deepGet(locale, path, '').replace(
        /\{(\w+)\}/g,
        (_, key) => `${option?.[key] ?? `{${key}}`}`
    )

export const buildLocaleContext = (locale) => {
    const lang = computed(() => unref(locale).name)
    const name = computed(() => upper(toCase(lang.value || '')))
    const localeRef = isRef(locale) ? locale : ref(locale)
    return {
        lang,
        name,
        locale: localeRef,
        t: buildTranslator(locale),
    }
}

export const useLocale = (locale) => {
    return buildLocaleContext(computed(() => locale.value || ZhCn))
}

export const localeOptions = (t, options, prefix) => {
    return options.map(opt => {
        opt.label = t((prefix || 'props') + '.' + opt.label || opt.value) || opt.label;
        return opt;
    })
}

export const localeProps = (t, prefix, rules) => {
    return rules.map(rule => {
        if (rule.field === 'formCreate$required') {
            rule.title = t('validate.required') || rule.title;
        } else if (rule.field && rule.field !== '_optionType') {
            rule.title = t('com.' + prefix + '.' + rule.field) || rule.title;
        }
        if (rule.type === 'template' && is.trueArray(rule.children)) {
            rule.children = localeProps(t, prefix, rule.children);
        }
        return rule;
    })
}

export const getRuleTree = (children) => {
    const tree = [];
    children && children.forEach(rule => {
        if (rule._fc_drag_tag) {
            const item = {
                id: rule.__fc__.id,
                rule,
                children: getRuleTree(rule.children),
            };
            if (!item.children.length) {
                delete item.children;
            }
            tree.push(item);
        } else {
            tree.push(...getRuleTree(rule.children));
        }
    });
    return tree;
}


export const getFormRuleDescription = (tree) => {
    const getTree = (children) => {
        const tree = [];
        children && children.forEach(rule => {
            if (rule.field) {
                rule.children = getTree(rule.children || []);
                if (!rule.children.length) {
                    delete rule.children;
                }
                tree.push(rule);
            } else {
                tree.push(...getTree(rule.children || []));
            }
        });
        return tree;
    }
    return getTree(tree);
};

export const getRuleDescription = (children) => {
    const getTree = (children) => {
        const tree = [];
        children && children.forEach(rule => {
            if (typeof rule !== 'object') {
                return;
            }
            if (rule._fc_drag_tag) {
                const item = {
                    _fc_id: rule._fc_id,
                    type: rule.type,
                    field: rule.field,
                    title: rule.title,
                    name: rule.name,
                    slot: rule.slot,
                    props: {...rule.props || {}},
                    children: getTree(rule.children || [])
                };
                if (rule.children && typeof rule.children[0] === 'string') {
                    item.content = rule.children[0];
                }
                if (!item.children.length) {
                    delete item.children;
                }
                tree.push(item);
            } else {
                tree.push(...getTree(rule.children));
            }
        });
        return tree;
    }
    return getTree(children);
};

export function getInjectArg(t) {
    return {
        name: '$inject',
        columns: [
            {label: '$inject.api', info: t('event.inject.api'), type: 'Api'},
            {label: '$inject.rule', info: t('event.inject.rule'), type: 'Rule[]'},
            {label: '$inject.self', info: t('event.inject.self'), type: 'Rule'},
            {label: '$inject.option', info: t('event.inject.option'), type: 'Object'},
            {label: '$inject.args', info: t('event.inject.args'), type: 'Array'},
        ]
    }
}

export function isElementInside(x, y, element) {
    const rect = element.getBoundingClientRect();
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

export function isNull(v) {
    return ['', null, undefined].indexOf(v) !== -1;
}

export function escapeRegExp(str) {
    return str.replace(/[\ .*+?^${}()|[\]\\]/g, '\\$&');
}

export function compareVersion(v1, v2) {
    const a1 = v1.split('.');
    const a2 = v2.split('.');
    const minLength = Math.min(a1.length, a2.length);

    for (var i = 0; i < minLength; i++) {
        var diff = parseInt(a1[i], 10) - parseInt(a2[i], 10);
        if (diff > 0) {
            return 1;
        } else if (diff < 0) {
            return -1;
        }
    }

    return a1.length === a2.length ? 0 : (a1.length < a2.length ? -1 : 1);
}

export function copyTextToClipboard(text) {
    const textArea = document.createElement('textarea');

    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = '-9999px';

    textArea.value = text;

    document.body.appendChild(textArea);

    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
    } catch (err) {
        console.log('Oops, unable to copy');
    }

    message('已复制!', 'success');

    document.body.removeChild(textArea);
}

export function uniqueArray(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
}