/**
 * JSON 差异比较工具
 * 用于比较两个 JSON 对象并生成差异信息
 */

/**
 * 计算最长公共子序列（LCS）
 * @param {Array} oldLines - 旧的行数组
 * @param {Array} newLines - 新的行数组
 * @returns {Array} LCS 矩阵
 */
function computeLCS(oldLines, newLines) {
    const m = oldLines.length;
    const n = newLines.length;
    const lcs = Array(m + 1)
        .fill(null)
        .map(() => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (oldLines[i - 1] === newLines[j - 1]) {
                lcs[i][j] = lcs[i - 1][j - 1] + 1;
            } else {
                lcs[i][j] = Math.max(lcs[i - 1][j], lcs[i][j - 1]);
            }
        }
    }

    return lcs;
}

/**
 * 根据 LCS 矩阵生成差异操作序列
 * @param {Array} lcs - LCS 矩阵
 * @param {Array} oldLines - 旧的行数组
 * @param {Array} newLines - 新的行数组
 * @param {number} i - 当前旧行索引
 * @param {number} j - 当前新行索引
 * @returns {Array} 差异操作数组
 */
function generateDiffOps(lcs, oldLines, newLines, i = oldLines.length, j = newLines.length) {
    if (i === 0 && j === 0) {
        return [];
    }

    if (i > 0 && j > 0 && oldLines[i - 1] === newLines[j - 1]) {
        const ops = generateDiffOps(lcs, oldLines, newLines, i - 1, j - 1);
        ops.push({
            type: 'unchanged',
            oldLine: oldLines[i - 1],
            newLine: newLines[j - 1],
            oldLineIndex: i - 1,
            newLineIndex: j - 1,
        });
        return ops;
    }

    if (j > 0 && (i === 0 || lcs[i][j - 1] >= lcs[i - 1][j])) {
        const ops = generateDiffOps(lcs, oldLines, newLines, i, j - 1);
        ops.push({
            type: 'added',
            oldLine: '',
            newLine: newLines[j - 1],
            oldLineIndex: -1,
            newLineIndex: j - 1,
        });
        return ops;
    }

    if (i > 0 && (j === 0 || lcs[i][j - 1] < lcs[i - 1][j])) {
        const ops = generateDiffOps(lcs, oldLines, newLines, i - 1, j);
        ops.push({
            type: 'removed',
            oldLine: oldLines[i - 1],
            newLine: '',
            oldLineIndex: i - 1,
            newLineIndex: -1,
        });
        return ops;
    }

    return [];
}

/**
 * 生成行级别的差异显示
 * @param {Object} oldJson - 旧的 JSON 对象
 * @param {Object} newJson - 新的 JSON 对象
 * @param {number} contextLines - 上下文行数，默认5行
 * @returns {Array} 行级别的差异数组
 */
export function generateLineDiff(oldJson, newJson, contextLines = 5) {
    const oldStr = JSON.stringify(oldJson, null, 2);
    const newStr = JSON.stringify(newJson, null, 2);

    const oldLines = oldStr.split('\n');
    const newLines = newStr.split('\n');

    // 使用 LCS 算法计算差异
    const lcs = computeLCS(oldLines, newLines);
    const diffOps = generateDiffOps(lcs, oldLines, newLines);

    // 找出所有有差异的行的索引
    const changedIndices = new Set();
    diffOps.forEach((op, index) => {
        if (op.type !== 'unchanged') {
            changedIndices.add(index);
        }
    });

    // 如果没有差异，返回空数组
    if (changedIndices.size === 0) {
        return [];
    }

    // 找出需要显示的行（差异行 + 上下文）
    const showIndices = new Set();

    // 将连续的差异行合并为块
    const changeBlocks = [];
    const sortedChangedIndices = Array.from(changedIndices).sort((a, b) => a - b);

    let currentBlock = { start: sortedChangedIndices[0], end: sortedChangedIndices[0] };

    for (let i = 1; i < sortedChangedIndices.length; i++) {
        if (sortedChangedIndices[i] === currentBlock.end + 1) {
            currentBlock.end = sortedChangedIndices[i];
        } else {
            changeBlocks.push(currentBlock);
            currentBlock = { start: sortedChangedIndices[i], end: sortedChangedIndices[i] };
        }
    }
    changeBlocks.push(currentBlock);

    // 为每个差异块添加上下文
    changeBlocks.forEach(block => {
        // 添加差异行本身
        for (let i = block.start; i <= block.end; i++) {
            showIndices.add(i);
        }

        // 添加上下文行
        for (let i = 1; i <= contextLines; i++) {
            // 前面的上下文
            if (block.start - i >= 0) {
                showIndices.add(block.start - i);
            }
            // 后面的上下文
            if (block.end + i < diffOps.length) {
                showIndices.add(block.end + i);
            }
        }
    });

    // 生成最终结果，只包含需要显示的行
    const result = [];
    const sortedIndices = Array.from(showIndices).sort((a, b) => a - b);

    sortedIndices.forEach(index => {
        const op = diffOps[index];
        result.push({
            type: op.type,
            oldLine: op.oldLine,
            newLine: op.newLine,
            lineNumber: index + 1,
            originalIndex: index,
            isSame: op.type === 'unchanged',
            isContext: op.type === 'unchanged' && !changedIndices.has(index),
        });
    });

    return result;
}
