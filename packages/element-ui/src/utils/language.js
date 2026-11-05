const VAR_RE = /^\{\{\s*\$t\.(.+)\s*\}\}$/;

export function translateVar(text, t) {
    if (text == null || text === '') {
        return '';
    }
    const raw = String(text);
    const match = raw.match(VAR_RE);
    if (!match || typeof t !== 'function') {
        return raw;
    }
    const translated = t(match[1]);
    if (translated == null || translated === '') {
        return raw;
    }
    return translated;
}
