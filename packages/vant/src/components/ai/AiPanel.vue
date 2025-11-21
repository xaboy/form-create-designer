<template>
    <div class="_fd-ai-panel">
        <!-- 对话头部 -->
        <div class="_fd-ai-header">
            <div class="_fd-ai-title">
                <i class="fc-icon icon-ai bright"></i>
                <span class="_fd-ai-name">{{ t('ai.name') }}</span>
            </div>
            <div class="_fd-ai-actions" v-if="messages.length">
                <div class="_fd-ai-action-btn" @click="clearChat">
                    <i class="fc-icon icon-delete2"></i>
                </div>
            </div>
        </div>

        <!-- 对话内容区域 -->
        <div class="_fd-ai-content" :class="{ '_fd-ai-content--centered': messages.length === 0 }" ref="chatContent">
            <!-- 欢迎消息 -->
            <div class="_fd-ai-welcome" v-if="messages.length === 0">
                <div class="_fd-ai-welcome-icon"></div>
                <h3>{{ t('ai.welcome') }}</h3>
                <p>{{ t('ai.info') }}</p>

                <!-- 示例问题 -->
                <div class="_fd-ai-welcome-suggestions">
                    <div class="_fd-ai-suggestions-header">
                        <span>{{ t('ai.try') }}</span>
                        <div class="_fd-ai-refresh-btn" @click="refreshSuggestions">
                            <i class="fc-icon icon-refresh2"></i>
                            {{ t('ai.change') }}
                        </div>
                    </div>
                    <div class="_fd-ai-suggestions-list">
                        <div
                            v-for="(suggestion, index) in suggestions"
                            :key="index"
                            class="_fd-ai-suggestion-item"
                            @click="selectSuggestion(suggestion)"
                        >
                            {{ suggestion }}
                        </div>
                    </div>
                </div>
            </div>

            <!-- 对话消息列表 -->
            <div class="_fd-ai-messages">
                <div v-for="(message, index) in messages" :key="index"
                     :class="['_fd-ai-message', `_fd-ai-message--${message.type}`]">
                    <!-- 用户消息 -->
                    <div v-if="message.type === 'user'" class="_fd-ai-message-content">
                        <div class="_fd-ai-message-bubble _fd-ai-message-bubble--user">
                            <div class="_fd-ai-message-text">{{ message.content }}</div>
                        </div>

                        <!-- 底部悬浮区域 -->
                        <div class="_fd-ai-message-footer">
                            <!-- 操作按钮 -->
                            <div class="_fd-ai-message-actions">
                                <div class="_fd-ai-action-btn" @click="rmMessage(index)">
                                    <i class="fc-icon icon-delete2"></i>
                                </div>
                                <div class="_fd-ai-action-btn" @click="copyMessage(message.content)">
                                    <i class="fc-icon icon-group"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- AI 复合消息（包含文字、思考链、错误状态） -->
                    <div v-else-if="message.type === 'ai'" class="_fd-ai-message-content">
                        <div class="_fd-ai-message-avatar"
                             :class="{ '_fd-ai-message-avatar--error': message.isError }"></div>
                        <div
                            class="_fd-ai-message-bubble"
                            :class="{
                                '_fd-ai-message-bubble--ai': !message.isError,
                                '_fd-ai-message-bubble--error': message.isError,
                                '_fd-ai-message-bubble--thinking': message.type === 'thinking',
                            }"
                        >
                            <template v-for="content in message.content">
                                <template v-if="content.type === 'tool'">
                                    <div v-if="content.steps && content.steps.length > 0"
                                         class="_fd-ai-thinking-section">
                                        <div class="_fd-ai-thinking-steps">
                                            <div
                                                v-for="(step, stepIndex) in content.steps"
                                                :key="stepIndex"
                                                :class="[
                                                    '_fd-ai-thinking-step',
                                                    { '_fd-ai-thinking-step--active': isThinking && index === messages.length - 1 },
                                                ]"
                                            >
                                                <div
                                                    class="_fd-ai-thinking-step-icon"
                                                    :class="{
                                                        '_fd-ai-thinking-step-icon--executing':
                                                            step.status !== 'end' && isThinking && index === messages.length - 1,
                                                        '_fd-ai-thinking-step-icon--completed':
                                                            step.status === 'end' && isThinking && index === messages.length - 1,
                                                    }"
                                                >
                                                    <template v-if="messages.length - 1 === index && isThinking">
                                                        <svg v-if="step.status === 'end'" height="12"
                                                             viewBox="0 0 12 12" fill="none">
                                                            <path
                                                                d="M10 3L4.5 8.5L2 6"
                                                                stroke="currentColor"
                                                                stroke-width="1.5"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                            />
                                                        </svg>
                                                        <div class="_fd-ai-thinking-step-loading" v-else></div>
                                                    </template>
                                                    <div class="_fd-ai-thinking-step-pending" v-else></div>
                                                </div>
                                                <span class="_fd-ai-thinking-step-text">{{ step.title }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                                <template v-if="content.type === 'text'">
                                    <div v-if="content.text" class="_fd-ai-message-text">
                                        <MarkdownRenderer :content="content.text"/>
                                    </div>
                                </template>
                            </template>
                            <div v-if="message.isError" class="_fd-ai-message-text _fd-ai-message-text--error">
                                {{ t('ai.error') }}
                            </div>
                            <!-- 思考中状态 -->
                            <div class="_fd-ai-thinking-status" v-if="message.status === 'thinking'">
                                <div class="_fd-ai-thinking-indicator">
                                    <div class="_fd-ai-thinking-dot"></div>
                                    <div class="_fd-ai-thinking-dot"></div>
                                    <div class="_fd-ai-thinking-dot"></div>
                                </div>
                            </div>
                        </div>
                        <!-- 底部悬浮区域 -->
                        <div class="_fd-ai-message-footer" v-if="!isThinking || index !== messages.length - 1">
                            <!-- 操作按钮 -->
                            <div class="_fd-ai-message-actions">
                                <div class="_fd-ai-action-btn" @click="rmMessage(index)">
                                    <i class="fc-icon icon-delete2"></i>
                                </div>
                                <div class="_fd-ai-action-btn" @click="copyMessage(message.content)">
                                    <i class="fc-icon icon-group"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 输入区域 -->
        <div class="_fd-ai-input">
            <!-- 用户输入框 -->
            <div class="_fd-ai-input-container">
                <textarea
                    v-model="inputText"
                    @keydown="handleKeydown"
                    @input="handleInput"
                    :placeholder="t('ai.placeholder')"
                    class="_fd-ai-input-field"
                    :disabled="isThinking"
                ></textarea>
                <div
                    class="_fd-ai-send-btn"
                    :class="{ '_fd-ai-send-btn--disabled': !inputText.trim() && !isThinking }"
                    @click="sendMessage"
                >
                    <div class="fc-icon icon-suspend" v-if="isThinking"></div>
                    <div class="fc-icon icon-send" v-else></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MarkdownRenderer from './MarkdownRenderer.vue';
import {copyTextToClipboard} from '../../utils';
import viewForm from '../../utils/form';

export default {
    name: 'FcAiPanel',
    inject: ['designer'],
    components: {
        MarkdownRenderer,
    },
    data() {
        return {
            page: 0,
            inputText: '',
            controller: null,
            isThinking: false,
            isUserAtBottom: true,
            suggestions: [],
            messages: [],
        };
    },
    computed: {
        t() {
            return this.designer.setupState.t;
        },
        api() {
            return this.designer.props.config?.ai?.api || 'https://api.form-create.com/ai/v2/chat/form';
        },
        token() {
            let token = this.designer.props.config?.ai?.token || '';
            if (token.indexOf('Bearer') === -1) {
                token = `Bearer ${token}`;
            }
            return token;
        },
    },
    methods: {
        sendMessage() {
            if (this.isThinking) {
                this.isThinking = false;
                this.controller && this.controller.abort();
                return;
            }
            if (!this.inputText.trim()) return;

            const userMessage = {
                type: 'user',
                content: this.inputText.trim(),
                timestamp: new Date(),
            };

            this.messages.push(userMessage);
            this.inputText = '';

            // 发送消息后强制滚动到底部
            this.isUserAtBottom = true;
            this.$nextTick(() => {
                this.scrollToBottom();
            });

            this.simulateThinking();
        },

        async simulateThinking() {
            this.isThinking = true;

            const aiMessage = {
                type: 'ai',
                content: [],
                status: 'thinking',
                timestamp: new Date(),
            };

            this.messages.push(aiMessage);
            this.saveHistory();

            this.callAiApi(aiMessage);
        },

        async callAiApi(aiMessage) {
            try {
                aiMessage.status = 'thinking';

                // 获取最后一条用户消息
                const userMessages = this.messages.filter(msg => msg.type === 'user');
                const lastUserMessage = userMessages[userMessages.length - 1];
                this.controller = new AbortController();
                const response = await fetch(this.api, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: this.token,
                    },
                    body: JSON.stringify({
                        ui: 'vant',
                        basic: true,
                        form: {
                            rule: this.designer.setupState.getJson(),
                            option: this.designer.setupState.getOptionsJson(),
                        },
                        messages: [
                            {
                                role: 'user',
                                content: lastUserMessage.content,
                            },
                        ],
                    }),
                    signal: this.controller.signal,
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                let fullText = '';
                let buffer = '';

                while (true) {
                    const {done, value} = await reader.read();
                    if (done) {
                        break;
                    }

                    const chunk = decoder.decode(value, {stream: true});

                    buffer += chunk;
                    const lines = buffer.split('\n');
                    buffer = lines.pop() || ''; // 保留不完整的行

                    for (const line of lines) {
                        const trimmedLine = line.trim();
                        if (trimmedLine.startsWith('data: ')) {
                            const data = trimmedLine.slice(6);

                            if (data === '[DONE]') {
                                aiMessage.status = 'completed';
                                this.isThinking = false;
                                this.$forceUpdate();
                                this.saveHistory();
                                return;
                            }

                            try {
                                const parsed = JSON.parse(data);

                                let content = parsed.choices?.[0]?.delta?.content;
                                if (content) {
                                    if (content.startsWith('[FC_TOOL]')) {
                                        const tool = JSON.parse(content.replace('[FC_TOOL]', ''));
                                        this.updateStep(aiMessage, tool);
                                        fullText = '';
                                    } else {
                                        if (content.trim().startsWith('```fcRuleDiff')) {
                                            content = `\n\`\`\`fcRuleDiff\n${JSON.stringify({
                                                newJson: content.trim().slice(13, -3).trim(),
                                                oldJson: viewForm.toJson({rule: this.designer.setupState.getRule()}),
                                            })}\n\`\`\`\n`;
                                        }
                                        fullText += content;
                                        let message = aiMessage.content[aiMessage.content.length - 1];
                                        if (!message || message.type !== 'text') {
                                            message = {type: 'text', text: ''};
                                            aiMessage.content.push(message);
                                        }
                                        message.text = fullText.trim();
                                    }

                                    this.$forceUpdate();
                                }
                            } catch (e) {
                                console.warn('解析流数据失败:', e, '数据:', data);
                            }
                        }
                    }
                }

                aiMessage.status = 'completed';
                this.isThinking = false;
                this.$forceUpdate();
            } catch (error) {
                console.error('AI API 调用失败:', error);
                this.isThinking = false;
                if (error.name === 'AbortError') {
                    aiMessage.status = 'completed';
                } else {
                    aiMessage.status = 'error';
                    aiMessage.isError = true;
                }
                this.$forceUpdate();
            }
            this.saveHistory();
        },
        updateStep(aiMessage, tool) {
            let flag = false;
            if (tool.id) {
                aiMessage.content.forEach(message => {
                    if (message.type === 'tool') {
                        message.steps.forEach(step => {
                            if (step.id === tool.id) {
                                step.title = tool.title;
                                step.status = tool.status;
                                flag = true;
                            }
                        });
                    }
                });
            }
            if (!flag) {
                let message = aiMessage.content[aiMessage.content.length - 1];
                if (!message || message.type !== 'tool') {
                    message = {type: 'tool', steps: []};
                    aiMessage.content.push(message);
                }
                message.steps.push({
                    title: tool.title,
                    status: tool.status,
                    id: tool.id,
                });
            }
        },
        handleKeydown(event) {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                this.sendMessage();
            }
        },
        handleInput() {
            const textarea = event.target;
            textarea.style.height = 'auto';
            textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
        },
        copyMessage(content) {
            if (typeof content === 'string') {
                copyTextToClipboard(content);
            } else {
                copyTextToClipboard(
                    content
                        .map(item => {
                            if (item.type === 'text') {
                                return item.text;
                            }
                        })
                        .filter(text => !!text)
                        .join('\n')
                        .trim()
                );
            }
        },
        rmMessage(index) {
            this.messages.splice(index, 1);
        },
        clearChat() {
            this.messages = [];
            this.inputText = '';
            this.isThinking = false;
            localStorage.removeItem('fc_ai_chat');
        },
        refreshSuggestions() {
            const allSuggestions = [
                '生成一个就诊满意度问卷表单',
                '创建一个建议收集表单，包含联系人、联系邮箱、分类和建议内容',
                '追加一个用户信息表单',
                '添加一个标签组件，显示文本为 "Tag"',
                '生成一个Vue组件，实现金额输入框',
                '生成一个js版本的高精度加法',
                '添加一个日期选择器组件，用于选择出生日期',
                '删除商品简介字段',
                '当单选框选择 "选项1" 时，显示输入框组件',
                '设置输入框为必填，并限制长度必须大于13',
                '商品价格字段使用数字输入框组件',
                '给输入类组件补充占位提示文本（placeholder）',
                '添加手机号格式验证',
                '添加自定义验证：确认密码必须与密码一致',
                '将姓名和手机号并排显示在同一行',
            ];

            if (this.page * 4 < allSuggestions.length) {
                this.page++;
            } else {
                this.page = 1;
            }
            const startIndex = (this.page - 1) * 4;
            const endIndex = startIndex + 4;

            this.suggestions = allSuggestions.slice(startIndex, endIndex);
        },
        selectSuggestion(suggestion) {
            this.inputText = suggestion;
            this.sendMessage();
        },
        scrollToBottom() {
            const content = this.$refs.chatContent;
            if (content && this.isUserAtBottom) {
                content.scrollTop = content.scrollHeight;
            }
        },
        // 检查用户是否在滚动条底部
        checkIfUserAtBottom() {
            const content = this.$refs.chatContent;
            if (content) {
                const isAtBottom = content.scrollTop + content.clientHeight >= content.scrollHeight - 20;
                this.isUserAtBottom = isAtBottom;
            }
        },
        // 处理滚动事件
        handleScroll() {
            this.checkIfUserAtBottom();
        },
        getHistory() {
            const data = localStorage.getItem('fc_ai_chat');
            if (data) {
                this.messages = JSON.parse(data) || [];
            }
        },
        saveHistory() {
            localStorage.setItem('fc_ai_chat', JSON.stringify(this.messages));
        },
    },
    created() {
        this.getHistory();
        this.refreshSuggestions();
    },
    mounted() {
        this.$nextTick(() => {
            this.scrollToBottom();
            // 添加滚动事件监听
            const content = this.$refs.chatContent;
            if (content) {
                content.addEventListener('scroll', this.handleScroll);
            }
        });
    },

    beforeUnmount() {
        // 清理滚动事件监听
        const content = this.$refs.chatContent;
        if (content) {
            content.removeEventListener('scroll', this.handleScroll);
        }
        // 清理全局方法
        delete window._fd_copyCode;
        delete window._fd_importCode;
    },

    updated() {
        // 只在用户位于底部时才自动滚动
        this.$nextTick(() => {
            this.scrollToBottom();
        });
    },
};
</script>

<style scoped>
._fd-ai-panel {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: #ffffff;
    border-radius: 8px;
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* 头部样式 */
._fd-ai-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    height: 40px;
    border-bottom: 1px solid #ececec;
    background: #ffffff;
}

._fd-ai-title {
    display: flex;
    align-items: center;
    gap: 8px;
}

._fd-ai-name {
    font-weight: 600;
    color: #262626;
    font-size: 14px;
}

._fd-ai-actions {
    display: flex;
    gap: 8px;
}

._fd-ai-action-btn {
    width: 24px;
    height: 24px;
    border: none;
    background: transparent;
    border-radius: 3px;
    color: #666666;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s ease;
    opacity: 0.8;
}

._fd-ai-action-btn:hover {
    background: #f5f5f5;
    color: #262626;
    opacity: 1;
}

/* 内容区域样式 */
._fd-ai-content {
    flex: 1;
    overflow-y: auto;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-height: 0;
}

/* 当没有消息时，让内容居中显示 */
._fd-ai-content--centered {
    justify-content: center;
    align-items: center;
}

._fd-ai-welcome {
    text-align: center;
    padding: 20px;
    color: #666666;
    max-width: 600px;
    margin: 0 auto;
}

._fd-ai-message-avatar,
._fd-ai-welcome-icon {
    background-image: url('data:image/png;base64,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');
    background-size: 45px;
    background-repeat: no-repeat;
    background-position: center;
}

._fd-ai-welcome-icon {
    width: 64px;
    height: 64px;
    margin: 0 auto 20px;
    background-color: #f5f5f5;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

._fd-ai-welcome h3 {
    margin: 0 0 12px;
    color: #262626;
    font-size: 24px;
    font-weight: 600;
}

._fd-ai-welcome p {
    margin: 0 0 32px;
    font-size: 16px;
    line-height: 1.6;
    color: #666666;
}

/* 建议问题样式 */
._fd-ai-welcome-suggestions {
    text-align: left;
}

._fd-ai-suggestions-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
}

._fd-ai-suggestions-header span {
    font-size: 14px;
    font-weight: 500;
    color: #262626;
}

._fd-ai-refresh-btn {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    border: none;
    background: transparent;
    color: #aaaaaa;
    font-size: 12px;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.2s ease;
}

._fd-ai-refresh-btn:hover {
    background: #f5f5f5;
    color: #262626;
}

._fd-ai-suggestions-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
}

._fd-ai-suggestion-item {
    padding: 12px 16px;
    border: 1px solid #ececec;
    border-radius: 12px;
    background: #f5f5f5;
    color: #262626;
    font-size: 14px;
    text-align: left;
    cursor: pointer;
    transition: all 0.2s ease;
    line-height: 1.4;
}

._fd-ai-suggestion-item:hover {
    border-color: #2e73ff;
    background: #ffffff;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 消息样式 */
._fd-ai-messages {
    display: flex;
    flex-direction: column;
    margin-top: 16px;
}

._fd-ai-message {
    display: flex;
    flex-direction: column;
}

._fd-ai-message-content {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    position: relative;
}

._fd-ai-message-content:hover ._fd-ai-message-footer {
    display: flex;
}

._fd-ai-message--user ._fd-ai-message-content,
._fd-ai-message--user ._fd-ai-message-actions {
    flex-direction: row-reverse;
}

._fd-ai-message-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background-size: 20px;
}

._fd-ai-message-avatar--error {
    background-color: rgba(255, 46, 46, 0.05);
}

._fd-ai-message-bubble {
    min-width: 40px;
    min-height: 21px;
    max-width: 70%;
    padding: 12px 16px;
    border-radius: 12px;
    position: relative;
    word-wrap: break-word;
    margin-bottom: 35px;
}

._fd-ai-message-bubble--user {
    background: #2e73ff;
    color: white;
    border-bottom-right-radius: 4px;
}

._fd-ai-message-bubble--ai {
    background: #f5f5f5;
    color: #262626;
    border-bottom-left-radius: 4px;
}

._fd-ai-message-bubble--thinking {
    background: rgba(46, 115, 255, 0.05);
    border: 1px solid #2e73ff;
    border-bottom-left-radius: 4px;
}

._fd-ai-message-bubble--error {
    background: rgba(255, 46, 46, 0.05);
    color: #ff2e2e;
    border: 1px solid #ff2e2e;
    border-bottom-left-radius: 4px;
}

._fd-ai-message-text {
    font-size: 14px;
    line-height: 1.5;
}

._fd-ai-message-text :deep(pre) {
    margin: 0;
    background: transparent;
    padding: 0;
    border-radius: 0;
    overflow: visible;
}

._fd-ai-message-text :deep(code) {
    background: transparent;
    padding: 0;
    border-radius: 0;
    font-family: inherit;
    font-size: inherit;
}

._fd-ai-message-actions {
    display: flex;
    gap: 4px;
}

._fd-ai-message-text--error {
    color: #ff2e2e;
    font-weight: 500;
}

/* 思考中状态 */
._fd-ai-thinking-status {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    margin: 8px 0;
}

/* 底部悬浮区域 */
._fd-ai-message-footer {
    position: absolute;
    bottom: 6px;
    left: 43px;
    display: none;
    align-items: center;
    gap: 8px;
}

/* AI 消息的 footer 在右边 */
._fd-ai-message--user ._fd-ai-message-footer {
    right: 0;
    left: unset;
}

/* 思考指示器 */
._fd-ai-thinking-indicator {
    display: flex;
    gap: 3px;
    align-items: center;
}

._fd-ai-thinking-dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #666666;
    animation: thinking-pulse 1.4s ease-in-out infinite both;
}

._fd-ai-thinking-dot:nth-child(1) {
    animation-delay: -0.32s;
}

._fd-ai-thinking-dot:nth-child(2) {
    animation-delay: -0.16s;
}

@keyframes thinking-pulse {
    0%,
    80%,
    100% {
        transform: scale(0.8);
        opacity: 0.5;
    }
    40% {
        transform: scale(1);
        opacity: 1;
    }
}

/* 思考内容 */

._fd-ai-thinking-section {
    margin: 8px 0;
}

._fd-ai-thinking-steps {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

._fd-ai-thinking-step {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 12px;
    margin: 2px 0;
    font-size: 13px;
    color: #aaaaaa;
    border-radius: 8px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    border: 1px solid #ececec;
}

._fd-ai-thinking-step--active {
    color: #262626;
    background: #ffffff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transform: translateX(2px);
    border: 0 none;
}

._fd-ai-thinking-step-text {
    position: relative;
    z-index: 1;
}

._fd-ai-thinking-step-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all 0.3s ease;
    position: relative;
    z-index: 1;
    color: #aaaaaa;
    background: #ececec;
    border-radius: 50%;
    width: 20px;
    height: 20px;
}

._fd-ai-thinking-step-icon--executing {
    color: #2e73ff;
    background: rgba(59, 130, 246, 0.1);
    border-radius: 50%;
    width: 20px;
    height: 20px;
    transform: scale(1.1);
    animation: pulse 1.5s ease-in-out infinite;
}

._fd-ai-thinking-step-icon--completed {
    color: #00c050;
    background: rgba(34, 197, 94, 0.1);
    border-radius: 50%;
    width: 20px;
    height: 20px;
}

@keyframes pulse {
    0%,
    100% {
        transform: scale(1.1);
        opacity: 1;
    }
    50% {
        transform: scale(1.2);
        opacity: 0.8;
    }
}

._fd-ai-thinking-step-loading {
    width: 10px;
    height: 10px;
    border: 2px solid #2e73ff;
    border-top: 2px solid transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

._fd-ai-thinking-step-pending {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #aaaaaa;
    opacity: 0.5;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

/* 输入区域样式 */
._fd-ai-input {
    padding: 20px 24px;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    gap: 16px;
    position: relative;
}

._fd-ai-input-container {
    display: flex;
    align-items: flex-end;
    gap: 12px;
    background: #f5f5f5;
    border-radius: 15px;
    padding: 12px 16px;
    border: 1px solid #ececec;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

._fd-ai-input-container:focus-within {
    border-color: #2e73ff;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1),
    0 4px 12px rgba(0, 0, 0, 0.15);
}

._fd-ai-input-field {
    flex: 1;
    border: none;
    background: transparent;
    resize: none;
    outline: none;
    font-size: 15px;
    line-height: 1.6;
    color: #262626;
    min-height: 24px;
    max-height: 120px;
    font-family: inherit;
    font-weight: 400;
    padding: 4px 0;
}

._fd-ai-input-field::placeholder {
    color: #aaaaaa;
    font-weight: 400;
}

._fd-ai-send-btn {
    width: 32px;
    height: 32px;
    border: none;
    background: #2e73ff;
    color: white;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    flex-shrink: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

._fd-ai-send-btn:hover:not(._fd-ai-send-btn--disabled) {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

._fd-ai-send-btn--disabled {
    background: #aaaaaa;
    cursor: not-allowed;
    opacity: 0.5;
    transform: none;
    box-shadow: none;
}

/* 输入框聚焦时的微动画 */
._fd-ai-input-container:focus-within ._fd-ai-send-btn {
    transform: scale(1.02);
}

/* 输入框占位符动画 */
._fd-ai-input-field:focus::placeholder {
    opacity: 0.7;
    transform: translateY(-1px);
    transition: all 0.2s ease;
}

/* 滚动条样式 */
._fd-ai-content {
    scrollbar-width: thin;
    scrollbar-color: #ececec transparent;
}

._fd-ai-content::-webkit-scrollbar {
    width: 6px;
}

._fd-ai-content::-webkit-scrollbar-track {
    background: transparent;
}

._fd-ai-content::-webkit-scrollbar-thumb {
    background: #ececec;
    border-radius: 3px;
    opacity: 0;
    transition: opacity 0.3s ease;
}

._fd-ai-content:hover::-webkit-scrollbar-thumb {
    opacity: 1;
}

._fd-ai-content::-webkit-scrollbar-thumb:hover {
    background: #aaaaaa;
}
</style>
