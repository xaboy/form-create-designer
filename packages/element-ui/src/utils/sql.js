const DEFAULT_DECIMAL = { precision: 10, scale: 2 };
const FC_ID_MARKER = '|_fc:';
const SYSTEM_COLUMNS = new Set(['id', 'parent_id']);

function sanitizeName(name, fallback = 'fc_form') {
    const value = String(name || '')
        .trim()
        .replace(/[^a-zA-Z0-9_\u4e00-\u9fa5]/g, '_')
        .replace(/_+/g, '_')
        .replace(/^_|_$/g, '');
    return value || fallback;
}

function escapeComment(text) {
    return String(text || '')
        .replace(/\\/g, '\\\\')
        .replace(/'/g, "''");
}

function unescapeComment(text) {
    return String(text || '')
        .replace(/\\'/g, "'")
        .replace(/\\\\/g, '\\');
}

function parseTypeName(value) {
    const raw = String(value).toLowerCase().trim();
    return (raw.includes('|') ? raw.split('|')[0].trim() : raw) || 'string';
}

function normalizeSqlTypeConfig(value) {
    if (value == null || value === '') {
        return { type: 'string' };
    }
    if (typeof value === 'string') {
        const type = parseTypeName(value);
        return type === 'decimal' ? { type: 'decimal', ...DEFAULT_DECIMAL } : { type };
    }
    if (typeof value === 'object' && value.type) {
        const type = parseTypeName(value.type);
        if (type === 'decimal') {
            return {
                type: 'decimal',
                precision: value.precision ?? DEFAULT_DECIMAL.precision,
                scale: value.scale ?? DEFAULT_DECIMAL.scale,
            };
        }
        return { type };
    }
    return { type: 'string' };
}

function resolveSqlType(rule, dragRule) {
    let sqlType = dragRule?.sqlType;
    if (typeof sqlType === 'function') {
        sqlType = sqlType(rule);
    }
    return sqlType ? normalizeSqlTypeConfig(sqlType) : { type: 'string' };
}

function getDragRule(rule, dragRuleList) {
    return rule._menu || dragRuleList?.[rule._fc_drag_tag] || dragRuleList?.[rule.type];
}

function resolveTitle(rule, getTitle) {
    if (typeof getTitle === 'function') {
        const title = getTitle(rule);
        if (title) {
            return title;
        }
    }
    return rule.field;
}

function getSubFormType(rule, dragRule) {
    if (rule.type === 'fcJson') {
        const type = rule.props?.type;
        if (type === 'array' || type === 'object') {
            return type;
        }
        return '';
    }
    const subForm = dragRule?.subForm;
    return subForm === 'array' || subForm === 'object' ? subForm : '';
}

function isColumnContainer(rule) {
    const tag = rule._fc_drag_tag || rule.type;
    return tag === 'tableFormColumn' || tag === 'stepFormItem';
}

function getSubFormChildren(rule) {
    const props = rule.props || {};
    if (Array.isArray(props.rule) && props.rule.length) {
        return props.rule;
    }
    if (Array.isArray(props.columns) && props.columns.length) {
        return props.columns.reduce((list, column) => list.concat(column.rule || []), []);
    }
    if (Array.isArray(props.steps) && props.steps.length) {
        return props.steps.reduce((list, step) => list.concat(step.rule || []), []);
    }
    if (Array.isArray(rule.children) && rule.children.length) {
        if (isColumnContainer(rule.children[0])) {
            return rule.children.reduce((list, item) => list.concat(item.children || []), []);
        }
        return rule.children;
    }
    return [];
}

function isSubFormContainer(rule, dragRule) {
    return !!getSubFormType(rule, dragRule) && getSubFormChildren(rule).length > 0;
}

function isRequired(rule) {
    return !!rule.$required;
}

function typeToColumnDef(typeInfo, options = {}) {
    if (options.primary) {
        return 'INT NOT NULL AUTO_INCREMENT';
    }
    const config = normalizeSqlTypeConfig(typeInfo);
    const nullability = options.required ? 'NOT NULL' : 'NULL';
    let def;
    switch (config.type) {
        case 'decimal':
            def = `DECIMAL(${config.precision},${config.scale})`;
            break;
        case 'float':
            def = 'DOUBLE';
            break;
        case 'number':
            def = 'INT';
            break;
        case 'date':
            def = 'TIMESTAMP';
            break;
        case 'boolean':
            def = 'TINYINT(1)';
            break;
        case 'object':
        case 'array':
            def = 'JSON';
            break;
        case 'text':
            def = 'TEXT';
            break;
        default:
            def = 'VARCHAR(255)';
    }
    return `${def} ${nullability}`;
}

function formatColumnComment(title, fcId) {
    const value = fcId ? `${title || ''}${FC_ID_MARKER}${fcId}` : title || '';
    return escapeComment(value);
}

function parseColumnComment(comment) {
    const text = unescapeComment(comment || '');
    const idx = text.lastIndexOf(FC_ID_MARKER);
    if (idx > -1) {
        return {
            title: text.slice(0, idx),
            fcId: text.slice(idx + FC_ID_MARKER.length),
        };
    }
    return { title: text, fcId: '' };
}

function enrichColumnMeta(column) {
    if (column.title != null && column.fcId != null) {
        return column;
    }
    const parsed = parseColumnComment(column.comment || column.title || '');
    column.title = column.title ?? (parsed.title || column.field);
    column.fcId = column.fcId || parsed.fcId || '';
    return column;
}

function buildColumnFragment(column) {
    enrichColumnMeta(column);
    const def = column.def || typeToColumnDef(column.type, column);
    return `\`${column.field}\` ${def} COMMENT '${formatColumnComment(column.title || column.field, column.fcId)}'`;
}

function parseCreateTableSQL(sql) {
    if (!sql || typeof sql !== 'string') {
        return null;
    }
    const nameMatch = sql.match(/CREATE\s+TABLE\s+`([^`]+)`/i);
    const bodyMatch = sql.match(/\(\s*([\s\S]*?)\s*PRIMARY\s+KEY/is);
    if (!nameMatch || !bodyMatch) {
        return null;
    }
    const columns = [];
    bodyMatch[1].split('\n').forEach(line => {
        const trimmed = line.trim().replace(/,$/, '');
        if (!trimmed.startsWith('`')) {
            return;
        }
        const colMatch = trimmed.match(/^`([^`]+)`\s+(.+?)\s+COMMENT\s+'((?:[^'\\]|\\.)*)'\s*$/i);
        if (!colMatch) {
            return;
        }
        const [, field, def, commentRaw] = colMatch;
        const comment = unescapeComment(commentRaw);
        const { title, fcId } = parseColumnComment(comment);
        columns.push({ field, def: def.trim(), comment, title, fcId });
    });
    if (!columns.length) {
        return null;
    }
    const commentMatch = sql.match(/COMMENT='((?:[^'\\]|\\.)*)'\s*;/);
    return {
        name: nameMatch[1],
        comment: commentMatch ? unescapeComment(commentMatch[1]) : nameMatch[1],
        columns,
    };
}

function parseSqlTableList(tables) {
    const parsed = [];
    const failed = new Set();
    (tables || []).forEach(item => {
        const schema = item?.sql ? parseCreateTableSQL(item.sql) : null;
        if (schema) {
            parsed.push(schema);
            return;
        }
        if (item?.name) {
            failed.add(item.name);
        }
    });
    return { parsed, failed };
}

function columnSignature(column) {
    enrichColumnMeta(column);
    return `${column.def}::${column.title}`;
}

function indexBusinessColumns(columns) {
    const byFcId = new Map();
    const byField = new Map();
    (columns || []).forEach(column => {
        enrichColumnMeta(column);
        if (SYSTEM_COLUMNS.has(column.field)) {
            return;
        }
        byField.set(column.field, column);
        if (column.fcId) {
            byFcId.set(column.fcId, column);
        }
    });
    return { byFcId, byField };
}

function diffTableColumns(name, oldSchema, newSchema) {
    const alters = [];
    const oldIndex = indexBusinessColumns(oldSchema.columns);
    const newIndex = indexBusinessColumns(newSchema.columns);
    const matchedOldFcIds = new Set();
    const matchedNewFcIds = new Set();
    const matchedOldFields = new Set();
    const matchedNewFields = new Set();

    newIndex.byFcId.forEach((newCol, fcId) => {
        const oldCol = oldIndex.byFcId.get(fcId);
        if (!oldCol) {
            return;
        }
        matchedOldFcIds.add(fcId);
        matchedNewFcIds.add(fcId);
        matchedOldFields.add(oldCol.field);
        matchedNewFields.add(newCol.field);
        if (oldCol.field !== newCol.field) {
            alters.push({
                name,
                action: 'renameColumn',
                field: newCol.field,
                sql: `ALTER TABLE \`${name}\` CHANGE COLUMN \`${oldCol.field}\` ${buildColumnFragment(newCol)};`,
            });
            return;
        }
        if (columnSignature(oldCol) !== columnSignature(newCol)) {
            alters.push({
                name,
                action: 'modifyColumn',
                field: newCol.field,
                sql: `ALTER TABLE \`${name}\` MODIFY COLUMN ${buildColumnFragment(newCol)};`,
            });
        }
    });

    newIndex.byFcId.forEach((newCol, fcId) => {
        if (matchedNewFcIds.has(fcId)) {
            return;
        }
        matchedNewFields.add(newCol.field);
        alters.push({
            name,
            action: 'addColumn',
            field: newCol.field,
            sql: `ALTER TABLE \`${name}\` ADD COLUMN ${buildColumnFragment(newCol)};`,
        });
    });

    oldIndex.byFcId.forEach((oldCol, fcId) => {
        if (matchedOldFcIds.has(fcId)) {
            return;
        }
        matchedOldFields.add(oldCol.field);
        alters.push({
            name,
            action: 'dropColumn',
            field: oldCol.field,
            sql: `ALTER TABLE \`${name}\` DROP COLUMN \`${oldCol.field}\`;`,
        });
    });

    newIndex.byField.forEach((newCol, field) => {
        if (newCol.fcId || matchedNewFields.has(field)) {
            return;
        }
        matchedNewFields.add(field);
        alters.push({
            name,
            action: 'addColumn',
            field,
            sql: `ALTER TABLE \`${name}\` ADD COLUMN ${buildColumnFragment(newCol)};`,
        });
    });

    oldIndex.byField.forEach((oldCol, field) => {
        if (oldCol.fcId || matchedOldFields.has(field)) {
            return;
        }
        if (!newIndex.byField.has(field)) {
            alters.push({
                name,
                action: 'dropColumn',
                field,
                sql: `ALTER TABLE \`${name}\` DROP COLUMN \`${field}\`;`,
            });
            return;
        }
        const newCol = newIndex.byField.get(field);
        matchedOldFields.add(field);
        matchedNewFields.add(field);
        if (columnSignature(oldCol) !== columnSignature(newCol)) {
            alters.push({
                name,
                action: 'modifyColumn',
                field,
                sql: `ALTER TABLE \`${name}\` MODIFY COLUMN ${buildColumnFragment(newCol)};`,
            });
        }
    });

    return alters;
}

export function diffSqlAlter(oldTables, newTables) {
    const { parsed: oldSchemas, failed: oldFailed } = parseSqlTableList(oldTables);
    const { parsed: newSchemas, failed: newFailed } = parseSqlTableList(newTables);
    const skipTables = new Set([...oldFailed, ...newFailed]);
    const oldMap = new Map(oldSchemas.map(item => [item.name, item]));
    const newMap = new Map(newSchemas.map(item => [item.name, item]));
    const newSqlMap = new Map((newTables || []).map(item => [item.name, item.sql]));
    const alters = [];

    oldMap.forEach((_, name) => {
        if (skipTables.has(name) || newMap.has(name)) {
            return;
        }
        alters.push({ name, action: 'dropTable', sql: `DROP TABLE \`${name}\`;` });
    });

    newMap.forEach((schema, name) => {
        if (skipTables.has(name) || oldMap.has(name)) {
            return;
        }
        alters.push({
            name,
            action: 'createTable',
            sql: newSqlMap.get(name) || generateCreateTableSQL(schema),
        });
    });

    newMap.forEach((newSchema, name) => {
        if (skipTables.has(name) || !oldMap.has(name)) {
            return;
        }
        alters.push(...diffTableColumns(name, oldMap.get(name), newSchema));
    });

    return alters;
}

export function sqlAlterTemplate(oldTables, rules, dragRuleList, options = {}) {
    return diffSqlAlter(oldTables, sqlTemplate(rules, dragRuleList, options));
}

function generateCreateTableSQL(table) {
    const columnLines = table.columns.map(column => `  ${buildColumnFragment(column)}`);
    const comment = escapeComment(table.comment || table.name);
    return `CREATE TABLE \`${table.name}\` (\n${columnLines.join(',\n')},\n  PRIMARY KEY (\`id\`)\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='${comment}';`;
}

function createTable(name, comment) {
    return {
        name,
        comment: comment || name,
        columns: [{ field: 'id', type: 'number', title: 'ID', primary: true }],
        subTables: [],
    };
}

function processRule(item, dragRuleList, table, getTitle) {
    if (typeof item === 'string') {
        return;
    }
    if (item.type === 'DragBox') {
        walkRules(item.children, dragRuleList, table, getTitle);
        return;
    }
    if (item.type === 'DragTool') {
        if (item.children?.[0]) {
            processRule(item.children[0], dragRuleList, table, getTitle);
        }
        return;
    }

    const rule = item;
    const dragRule = getDragRule(rule, dragRuleList);

    if (!rule.field) {
        const subChildren = getSubFormChildren(rule);
        if (subChildren.length) {
            walkRules(subChildren, dragRuleList, table, getTitle);
        } else if (rule.children?.length) {
            walkRules(rule.children, dragRuleList, table, getTitle);
        }
        return;
    }

    const title = resolveTitle(rule, getTitle);
    const columnBase = {
        field: rule.field,
        title,
        fcId: rule._fc_id,
        required: isRequired(rule),
    };

    if (isSubFormContainer(rule, dragRule)) {
        table.columns.push({
            ...columnBase,
            type: normalizeSqlTypeConfig(getSubFormType(rule, dragRule)),
        });
        const subTable = createTable(`${table.name}_${sanitizeName(rule.field, 'detail')}`, title);
        subTable.columns.push({
            field: 'parent_id',
            type: 'number',
            title: '主表ID',
            required: false,
        });
        walkRules(getSubFormChildren(rule), dragRuleList, subTable, getTitle);
        table.subTables.push(subTable);
        return;
    }

    table.columns.push({
        ...columnBase,
        type: resolveSqlType(rule, dragRule),
    });
}

function walkRules(rules, dragRuleList, table, getTitle) {
    (rules || []).forEach(item => processRule(item, dragRuleList, table, getTitle));
}

function buildSqlTables(rules, dragRuleList, options = {}) {
    const mainTable = createTable(
        sanitizeName(options.formCreateFormName || options.formName, 'fc_form'),
        options.formCreateFormName || options.formName || '表单数据'
    );
    walkRules(rules, dragRuleList, mainTable, options.getTitle);
    const tables = [];
    const flatten = table => {
        tables.push({ name: table.name, comment: table.comment, columns: table.columns });
        (table.subTables || []).forEach(flatten);
    };
    flatten(mainTable);
    return tables;
}

export function sqlTemplate(rules, dragRuleList, options = {}) {
    return buildSqlTables(rules, dragRuleList, options).map(table => ({
        name: table.name,
        sql: generateCreateTableSQL(table),
    }));
}
