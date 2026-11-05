/** @typedef {import('../../types/index.d.ts').SqlType} SqlType */

export function inputNumberSqlType(rule) {
    const { precision, step, max, min } = rule.props || {};
    if (precision != null && precision >= 0) {
        const scale = precision;
        const bound = Math.max(Math.abs(Number(max) || 0), Math.abs(Number(min) || 0));
        const integerDigits = bound ? Math.max(1, Math.floor(bound).toString().length) : 8;
        return { type: 'decimal', precision: integerDigits + scale, scale };
    }
    if (step != null && !Number.isInteger(Number(step))) {
        return { type: 'decimal', precision: 10, scale: 2 };
    }
    return 'number';
}

export function sliderSqlType(rule) {
    return rule.props?.range ? 'array' : 'number';
}

export function switchSqlType(rule) {
    const active = rule.props?.activeValue ?? true;
    const inactive = rule.props?.inactiveValue ?? false;
    if (typeof active === 'boolean' && typeof inactive === 'boolean') {
        return 'boolean';
    }
    if (typeof active === 'number' && typeof inactive === 'number') {
        return 'number';
    }
    return 'string';
}

export function selectSqlType(rule) {
    return rule.props?.multiple ? 'array' : 'string';
}

export function cascaderSqlType(rule) {
    const props = rule.props?.props || {};
    return props.multiple || props.emitPath !== false ? 'array' : 'string';
}

export function treeSelectSqlType(rule) {
    return rule.props?.multiple ? 'array' : 'string';
}

export function treeSqlType(rule) {
    return rule.props?.showCheckbox !== false ? 'array' : 'string';
}

export function datePickerSqlType(rule) {
    const type = rule.props?.type || 'date';
    if (type === 'dates' || type.endsWith('range')) {
        return 'array';
    }
    if (['datetime', 'date', 'year', 'month', 'week'].includes(type)) {
        return 'date';
    }
    return 'string';
}

export function timePickerSqlType(rule) {
    return rule.props?.isRange ? 'array' : 'string';
}

export function fcDataSelectSqlType(rule) {
    return rule.props?.multiple ? 'array' : 'object';
}

export function fcJsonSqlType(rule) {
    return rule.props?.type === 'array' ? 'array' : 'object';
}

export function segmentedSqlType(rule) {
    const options = rule.props?.options || [];
    return options.some(opt => typeof opt.value === 'number') ? 'number' : 'string';
}
