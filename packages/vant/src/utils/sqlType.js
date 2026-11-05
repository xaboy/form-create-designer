export function inputNumberSqlType(rule) {
    const { decimalLength, step, max, min } = rule.props || {};
    if (decimalLength != null && decimalLength >= 0) {
        const scale = decimalLength;
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
    return 'string';
}

export function datePickerSqlType(rule) {
    return 'date';
}

export function timePickerSqlType(rule) {
    return 'string';
}

export function fcJsonSqlType(rule) {
    return rule.props?.type === 'array' ? 'array' : 'object';
}

export function calendarSqlType(rule) {
    return rule.props?.type === 'multiple' ? 'array' : 'date';
}
