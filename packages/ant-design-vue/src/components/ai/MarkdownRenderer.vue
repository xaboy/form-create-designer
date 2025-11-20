<template>
    <div class="_fd-markdown-renderer" v-html="renderedMarkdown"></div>
</template>

<script>
import {marked} from 'marked';
import hljs from '../../utils/highlight/highlight.min';
import {copyTextToClipboard} from '../../utils';
import viewForm from '../../utils/form';
import {generateLineDiff} from '../../utils/jsonDiff';

export default {
    name: 'MarkdownRenderer',
    inject: ['designer'],
    props: {
        content: {
            type: String,
            required: true,
        },
    },
    data() {
        return {};
    },
    computed: {
        t() {
            return this.designer.setupState.t;
        },
        renderedMarkdown() {
            if (!this.content) return '';

            // 配置 marked
            const renderer = new marked.Renderer();

            // 重写代码块渲染器
            renderer.code = ({text, lang}) => {
                // 如果是 diff 语言，使用特殊的差异渲染
                if (lang === 'fcRuleDiff') {
                    return this.renderDiffCode(text, lang);
                }

                const highlighted = this.highlightCode(text, lang);
                return `<pre><code class="language-${lang || 'text'}">${highlighted}</code></pre>`;
            };

            // 重写链接渲染器，让链接在新窗口打开
            renderer.link = ({href, title, text}) => {
                const titleAttr = title ? ` title="${title}"` : '';
                return `<a href="${href}"${titleAttr} target="_blank" rel="noopener noreferrer">${text}</a>`;
            };

            // 配置 marked 选项
            marked.setOptions({
                renderer: renderer,
                breaks: true,
                gfm: true,
            });

            // 渲染 markdown
            const html = marked.parse(this.content);

            // 后处理，添加交互功能
            return this.postprocessHtml(html);
        },
    },
    methods: {
        // 后处理HTML，添加复制功能
        postprocessHtml(html) {
            // 为代码块添加复制按钮和语言显示
            return html.replace(/<pre><code[^>]*class="([^"]*)"[^>]*>([\s\S]*?)<\/code><\/pre>/g, (match, className, codeContent) => {
                const blockId = this.generateBlockId();

                // 从 className 中提取语言信息
                const languageMatch = className.match(/language-(\w+)/);
                const language = languageMatch ? languageMatch[1] : 'text';
                return `
                    <div class="code-block-container" data-block-id="${blockId}">
                        <div class="code-block-header">
                            <span class="code-language">${language}</span>
                            <div class="code-block-actions">
                                <div class="code-action-item" onclick="_fd_copyCode('${blockId}')">
                                    <i class="fc-icon icon-group"></i>
                                    <span class="code-action-text">${this.t('props.copy')}</span>
                                </div>
                                ${
    language === 'fcRule'
        ? `<div class="code-action-item is-primary" onclick="_fd_importCode('${blockId}')">
                                    <i class="fc-icon icon-upload"></i>
                                    <span class="code-action-text">${this.t('props.import')}</span>
                                </div>`
        : ''
}
                            </div>
                        </div>
                        <pre><code class="${className}">${codeContent}</code></pre>
                    </div>
                `;
            });
        },

        // 代码高亮
        highlightCode(code, language) {
            if (language && hljs.getLanguage(language)) {
                try {
                    return hljs.highlight(code, {language}).value;
                } catch (err) {
                    console.warn('代码高亮失败:', err);
                }
            }
            return hljs.highlightAuto(code).value;
        },

        // 生成唯一的代码块ID
        generateBlockId() {
            return 'code-block-' + Math.random().toString(36).substr(2, 9);
        },

        // 复制代码
        copyCode(blockId) {
            const container = document.querySelector(`[data-block-id="${blockId}"]`);
            if (container) {
                const codeElement = container.querySelector('code');
                if (codeElement) {
                    copyTextToClipboard(codeElement.innerText);
                }
            }
        },

        // 导入数据
        importCode(blockId) {
            const container = document.querySelector(`[data-block-id="${blockId}"]`);
            if (container) {
                const codeElement = container.querySelector('code');
                if (codeElement) {
                    const rule = viewForm.parseJson(codeElement.innerText);
                    if (Array.isArray(rule)) {
                        this.designer.setupState.setRule(rule);
                    } else if (rule.rule) {
                        this.designer.setupState.setRule(rule.rule);
                    }
                }
            }
        },

        // 渲染差异代码
        renderDiffCode(text, lang) {
            try {
                // 尝试解析 JSON 差异数据
                const diffData = JSON.parse(text);

                if (diffData.oldJson && diffData.newJson) {
                    // 生成差异信息
                    const lineDiff = generateLineDiff(JSON.parse(diffData.oldJson), JSON.parse(diffData.newJson));

                    // 生成差异 HTML
                    return this.generateDiffHtml(lineDiff, diffData.newJson);
                }
            } catch (e) {
                // 如果不是有效的 JSON，按普通代码处理
                console.warn('解析差异数据失败:', e);
            }

            // 回退到普通代码渲染
            const highlighted = this.highlightCode(text, 'text');
            return `<pre><code class="language-text">${highlighted}</code></pre>`;
        },

        // 生成差异 HTML
        generateDiffHtml(lineDiff, newJSON) {
            const blockId = this.generateBlockId();

            let html = `
                <div class="code-block-container" data-block-id="${blockId}">
                    <div class="code-block-header">
                        <span class="code-language">DIFF</span>
                            <div class="code-block-actions">
                                <div class="code-action-item" onclick="_fd_copyCode('${blockId}')">
                                    <i class="fc-icon icon-group"></i>
                                    <span class="code-action-text">${this.t('props.copy')}</span>
                                </div>
                                <div class="code-action-item is-primary" onclick="_fd_importCode('${blockId}')">
                                    <i class="fc-icon icon-upload"></i>
                                    <span class="code-action-text">${this.t('props.import')}</span>
                                </div>
                            </div>
                    </div>
                    <div class="diff-content">
                        <div class="diff-view diff-line-view" id="diff-line-${blockId}">
                            ${this.generateLineDiffHtml(lineDiff)}
                        </div>
                    </div>
                    <code style="display: none;">${newJSON}</code>
                </div>
            `;

            return html;
        },

        // 生成行级差异 HTML
        generateLineDiffHtml(lineDiff) {
            let html = '<div class="diff-lines">';

            lineDiff.forEach((line, index) => {
                let lineClass = `diff-line diff-line-${line.type}`;

                // 如果是上下文行，添加特殊样式
                if (line.isContext) {
                    lineClass += ' diff-context';
                }

                const lineNumber = line.lineNumber;

                // 如果是相同内容，只显示一行
                if (line.isSame) {
                    html += `
                        <div class="${lineClass}">
                            <div class="diff-line-number">${lineNumber}</div>
                            <div class="diff-line-content">
                                <div class="diff-same-line">${this.escapeHtml(line.oldLine)}</div>
                            </div>
                        </div>
                    `;
                } else {
                    // 有差异的内容，显示两行
                    html += `
                        <div class="${lineClass}">
                            <div class="diff-line-number">${lineNumber}</div>
                            <div class="diff-line-content">
                                ${line.oldLine ? `<div class="diff-old-line">${this.escapeHtml(line.oldLine)}</div>` : ''}
                                ${line.newLine ? `<div class="diff-new-line">${this.escapeHtml(line.newLine)}</div>` : ''}
                            </div>
                        </div>
                    `;
                }
            });

            html += '</div>';
            return html;
        },

        // HTML 转义
        escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        },
    },

    mounted() {
        // 将方法绑定到全局，供HTML中的onclick使用
        window._fd_copyCode = this.copyCode;
        window._fd_importCode = this.importCode;
    },
};
</script>

<style scoped>
._fd-markdown-renderer {
    line-height: 1.6;
    color: #262626;
}

/* 标题样式 */
._fd-markdown-renderer :deep(h1),
._fd-markdown-renderer :deep(h2),
._fd-markdown-renderer :deep(h3),
._fd-markdown-renderer :deep(h4),
._fd-markdown-renderer :deep(h5),
._fd-markdown-renderer :deep(h6) {
    margin: 16px 0 8px 0;
    font-weight: 600;
    color: #262626;
}

._fd-markdown-renderer :deep(h1) {
    font-size: 24px;
}

._fd-markdown-renderer :deep(h2) {
    font-size: 20px;
}

._fd-markdown-renderer :deep(h3) {
    font-size: 18px;
}

._fd-markdown-renderer :deep(h4) {
    font-size: 16px;
}

._fd-markdown-renderer :deep(h5) {
    font-size: 14px;
}

._fd-markdown-renderer :deep(h6) {
    font-size: 12px;
}

/* 基础文本样式 */
._fd-markdown-renderer :deep(p) {
    margin: 8px 0;
}

._fd-markdown-renderer :deep(ul),
._fd-markdown-renderer :deep(ol) {
    margin: 8px 0;
    padding-left: 24px;
}

._fd-markdown-renderer :deep(ul) {
    list-style-type: disc;
}

._fd-markdown-renderer :deep(ol) {
    list-style-type: decimal;
}

._fd-markdown-renderer :deep(li) {
    margin: 4px 0;
}

/* 引用样式 */
._fd-markdown-renderer :deep(blockquote) {
    margin: 16px 0;
    padding: 12px 16px;
    border-left: 4px solid #2e73ff;
    background: #f5f5f5;
    border-radius: 0 8px 8px 0;
}

._fd-markdown-renderer :deep(blockquote p) {
    margin: 0;
    color: #666666;
}

/* 表格样式 */
._fd-markdown-renderer :deep(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 16px 0;
}

._fd-markdown-renderer :deep(th),
._fd-markdown-renderer :deep(td) {
    border: 1px solid #ececec;
    padding: 8px 12px;
    text-align: left;
}

._fd-markdown-renderer :deep(th) {
    background: #f5f5f5;
    font-weight: 600;
}

/* 行内代码样式 */
._fd-markdown-renderer :deep(code) {
    background: #f5f5f5;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 13px;
    color: #2e73ff;
}

/* 代码块样式 */
._fd-markdown-renderer :deep(.code-block-container) {
    position: relative;
    border-radius: 8px;
    border: 1px solid #ececec;
    background: #ececec;
}

/* 代码块样式 */
._fd-markdown-renderer :deep(.code-block-container pre) {
    margin: 0;
    padding: 16px;
    background: #ececec;
    max-height: 800px;
    overflow: auto;
}

._fd-markdown-renderer :deep(.code-block-container code) {
    background: none;
    padding: 0;
    color: #262626;
    font-size: 13px;
    line-height: 1.5;
}

._fd-markdown-renderer :deep(.code-block-header) {
    position: sticky;
    top: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 8px 12px;
    background: #ececec;
    border-bottom: 1px solid #ececec;
    height: 40px;
    box-sizing: border-box;
    border-radius: 8px 8px 0 0;
}

._fd-markdown-renderer :deep(.code-block-actions) {
    display: flex;
    align-items: center;
    gap: 4px;
}

._fd-markdown-renderer :deep(.code-language) {
    font-size: 12px;
    font-weight: 500;
    color: #666666;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

._fd-markdown-renderer :deep(.code-action-item) {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 2px 8px;
    border: none;
    background: transparent;
    border-radius: 4px;
    color: #666666;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 12px;
}

._fd-markdown-renderer :deep(.code-action-item:hover) {
    background: #ffffff;
    color: #262626;
}

._fd-markdown-renderer :deep(.code-action-item.is-primary) {
    color: #2e73ff;
}

._fd-markdown-renderer :deep(.code-action-item.is-primary:hover) {
    background: #2e73ff;
    color: white;
}

._fd-markdown-renderer :deep(.code-action-text) {
    font-size: 12px;
    font-weight: 500;
}

/* 代码高亮样式 */
._fd-markdown-renderer :deep(.hljs) {
    background: #ffffff !important;
    color: #262626 !important;
}

/* 链接样式 */
._fd-markdown-renderer :deep(a) {
    color: #2e73ff;
    text-decoration: none;
}

._fd-markdown-renderer :deep(a:hover) {
    text-decoration: underline;
}

/* 强调样式 */
._fd-markdown-renderer :deep(strong) {
    font-weight: 600;
    color: #262626;
}

._fd-markdown-renderer :deep(em) {
    font-style: italic;
    color: #666666;
}

/* 行级差异样式 */
._fd-markdown-renderer :deep(.diff-lines) {
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 13px;
    line-height: 1.5;
}

._fd-markdown-renderer :deep(.diff-line) {
    display: flex;
}

._fd-markdown-renderer :deep(.diff-line-number) {
    width: 30px;
    padding: 4px;
    background: #ececec;
    color: #aaaaaa;
    text-align: right;
    font-size: 11px;
    border-right: 1px solid #ececec;
    flex-shrink: 0;
}

._fd-markdown-renderer :deep(.diff-line-content) {
    flex: 1;
    word-break: break-all;
}

._fd-markdown-renderer :deep(.diff-old-line) {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
    padding: 2px 4px;
}

._fd-markdown-renderer :deep(.diff-new-line) {
    background: rgba(34, 197, 94, 0.1);
    color: #22c55e;
    padding: 2px 4px;
}

._fd-markdown-renderer :deep(.diff-same-line) {
    color: #262626;
    padding: 2px 4px;
}

._fd-markdown-renderer :deep(.diff-line-added) {
    background: rgba(34, 197, 94, 0.05);
}

._fd-markdown-renderer :deep(.diff-line-removed) {
    background: rgba(239, 68, 68, 0.05);
}

._fd-markdown-renderer :deep(.diff-line-modified) {
    background: rgba(245, 158, 11, 0.05);
}

._fd-markdown-renderer :deep(.diff-line-unchanged) {
    background: transparent;
}

._fd-markdown-renderer :deep(.diff-context) {
    background: rgba(107, 114, 128, 0.05);
    opacity: 0.7;
}

._fd-markdown-renderer :deep(.diff-context .diff-line-number) {
    color: #aaaaaa;
    opacity: 0.6;
}
</style>
