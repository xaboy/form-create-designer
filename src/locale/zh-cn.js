const ZhCn = {
    name: 'zh-cn',
    form: {
        field: '字段 ID',
        title: '字段名称',
        info: '提示信息',
        control: '联动数据',
        clear: '清空值',
        refresh: '刷新',
        labelPosition: '标签位置',
        size: '表单尺寸',
        labelWidth: '标签宽度',
        hideRequiredAsterisk: '隐藏必填字段的标签旁边的红色星号',
        showMessage: '显示校验错误信息',
        inlineMessage: '以行内形式展示校验信息',
        submitBtn: '是否显示表单提交按钮',
        resetBtn: '是否显示表单重置按钮',
        submit: '提交',
        reset: '重置',
    },
    validate: {
        type: '字段类型',
        typePlaceholder: '请选择',
        trigger: '触发方式',
        mode: '验证方式',
        modes: {
            required: '必填',
            pattern: '正则表达式',
            min: '最小值',
            max: '最大值',
            len: '长度',
        },
        message: '错误信息',
        auto: '自动获取',
        autoRequired: '请输入{title}',
        autoMode: '请输入正确的{title}',
        requiredPlaceholder: '请输入提示语',
    },
    tableOptions: {
        handle: '操作',
        add: '添加',
        type: '字段类型',
    },
    struct: {
        title: '编辑数据',
        submit: '确 定',
        cancel: '取 消',
        error: '输入内容格式有误',
    },
    fetch: {
        action: '接口',
        actionRequired: '请数据接口',
        method: '请求方式',
        dataType: '提交方式',
        data: '附带数据',
        headers: 'header信息',
        parse: '解析函数',
        parseInfo: '解析接口数据，返回组件所需的数据结构',
        parseValidate: '请输入正确的解析函数',
    },
    designer: {
        preview: '预 览',
        clear: '清 空',
        clearConfirm: '清空',
        clearCancel: '取消',
        clearConfirmTitle: '清空后将不能恢复，确定要清空吗？',
        config: {
            component: '组件配置',
            form: '表单配置',
            rule: '基础配置',
            props: '属性配置',
            validate: '验证配置',
        },
    },
    menu: {
        main: '表单组件',
        aide: '辅助组件',
        layout: '布局组件',
    },
    props: {
        required: '是否必填',
        options: '选项数据',
        option: '选项',
        optionsType: {
            json: 'JSON数据',
            fetch: '接口数据',
            struct: '静态数据',
        }
    },
    components: {
        group: {
            name: '子表单',
            props: {
                disabled: '是否禁用',
                syncDisabled: '是否与子表单强制同步 disabled 状态',
                expand: '设置默认展开几项',
                button: '是否显示操作按钮',
                sortBtn: '是否显示排序按钮',
                min: '设置最小添加几项',
                max: '设置最多添加几项',
                mode: '组件类型',
                modeOpts: {
                    subform: '对象',
                    group: '数组'
                }
            }
        },
        radio: {
            name: '单选框',
            props: {
                disabled: '是否禁用',
                type: '按钮形式',
                textColor: '按钮形式的 Radio 激活时的文本颜色',
                fill: '按钮形式的 Radio 激活时的填充色和边框色'
            }
        },
        checkbox: {
            name: '多选框',
            props: {
                type: '按钮类型',
                disabled: '是否禁用',
                min: '可被勾选的 checkbox 的最小数量',
                max: '可被勾选的 checkbox 的最大数量',
                textColor: '按钮形式的 Checkbox 激活时的文本颜色',
                fill: '按钮形式的 Checkbox 激活时的填充色和边框色'
            }
        },
        input: {
            name: '输入框',
            props: {
                type: '类型',
                maxlength: '最大输入长度',
                minlength: '最小输入长度',
                showWordLimit: '是否显示输入字数统计',
                placeholder: '输入框占位文本',
                clearable: '是否可清空',
                showPassword: '是否显示切换密码图标',
                disabled: '禁用',
                prefixIcon: '输入框头部图标',
                suffixIcon: '输入框尾部图标',
                rowInfo: '只对 type="textarea" 有效',
                rows: '输入框行数',
                autocomplete: '自动补全',
                readonly: '是否只读',
                resize: '控制是否能被用户缩放',
                autofocus: '自动获取焦点'
            }
        },
        inputNumber: {
            name: '计数器',
            props: {
                min: '设置计数器允许的最小值',
                max: '设置计数器允许的最大值',
                step: '计数器步长',
                stepStrictly: '是否只能输入 step 的倍数',
                disabled: '是否禁用计数器',
                controls: '是否使用控制按钮',
                controlsPosition: '控制按钮位置',
                placeholder: '输入框默认 placeholder'
            }
        },
        select: {
            name: '选择器',
            props: {
                multiple: '是否多选',
                disabled: '是否禁用',
                clearable: '是否可以清空选项',
                collapseTags: '多选时是否将选中值按文字的形式展示',
                multipleLimit: '多选时用户最多可以选择的项目数，为 0 则不限制',
                autocomplete: 'autocomplete 属性',
                placeholder: '占位符',
                filterable: '是否可搜索',
                allowCreate: '是否允许用户创建新条目',
                noMatchText: '搜索条件无匹配时显示的文字',
                noDataText: '选项为空时显示的文字',
                reserveKeyword: '多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词',
                defaultFirstOption: '在输入框按下回车，选择第一个匹配项',
                popperAppendToBody: '是否将弹出框插入至 body 元素',
                automaticDropdown: '对于不可搜索的 Select，是否在输入框获得焦点后自动弹出选项菜单'
            }
        },
        switch: {
            name: '开关',
            props: {
                disabled: '是否禁用',
                width: '宽度（px）',
                activeText: 'switch 打开时的文字描述',
                inactiveText: 'switch 关闭时的文字描述',
                activeValue: 'switch 打开时的值',
                inactiveValue: 'switch 关闭时的值',
                activeColor: 'switch 打开时的背景色',
                inactiveColor: 'switch 关闭时的背景色'
            }
        },
        slider: {
            name: '滑块',
            props: {
                min: '最小值',
                max: '最大值',
                disabled: '是否禁用',
                step: '步长',
                showInput: '是否显示输入框，仅在非范围选择时有效',
                showInputControls: '在显示输入框的情况下，是否显示输入框的控制按钮',
                showStops: '是否显示间断点',
                range: '是否为范围选择',
                vertical: '是否竖向模式',
                height: 'Slider 高度，竖向模式时必填'
            }
        },
        timePicker: {
            name: '时间选择器',
            props: {
                pickerOptions: '当前时间日期选择器特有的选项',
                readonly: '完全只读',
                disabled: '禁用',
                editable: '文本框可输入',
                clearable: '是否显示清除按钮',
                placeholder: '非范围选择时的占位内容',
                startPlaceholder: '范围选择时开始日期的占位内容',
                endPlaceholder: '范围选择时开始日期的占位内容',
                isRange: '是否为时间范围选择',
                arrowControl: '是否使用箭头进行时间选择',
                align: '对齐方式',
                prefixIcon: '自定义头部图标的类名',
                clearIcon: '自定义清空图标的类名'
            }
        },
        datePicker: {
            name: '日期选择器',
            props: {
                pickerOptions: '当前时间日期选择器特有的选项',
                readonly: '完全只读',
                disabled: '禁用',
                type: '显示类型',
                editable: '文本框可输入',
                clearable: '是否显示清除按钮',
                placeholder: '非范围选择时的占位内容',
                startPlaceholder: '范围选择时开始日期的占位内容',
                endPlaceholder: '范围选择时结束日期的占位内容',
                format: '显示在输入框中的格式',
                align: '对齐方式',
                rangeSeparator: '选择范围时的分隔符',
                unlinkPanels: '在范围选择器里取消两个日期面板之间的联动',
                prefixIcon: '自定义头部图标的类名',
                clearIcon: '自定义清空图标的类名'
            }
        },
        rate: {
            name: '评分',
            props: {
                max: '最大分值',
                disabled: '是否为只读',
                allowHalf: '是否允许半选',
                voidColor: '未选中 icon 的颜色',
                disabledVoidColor: '只读时未选中 icon 的颜色',
                voidIconClass: '未选中 icon 的类名',
                disabledVoidIconClass: '只读时未选中 icon 的类名',
                showScore: '是否显示当前分数，show-score 和 show-text 不能同时为真',
                textColor: '辅助文字的颜色',
                scoreTemplate: '分数显示模板'
            }
        },
        colorPicker: {
            name: '颜色选择器',
            props: {
                disabled: '是否禁用',
                showAlpha: '是否支持透明度选择',
                colorFormat: '颜色的格式'
            }
        },
        row: {
            name: '栅格布局',
            props: {
                gutter: '栅格间隔',
                type: 'flex布局模式',
                justify: 'flex 布局下的水平排列方式',
                align: 'flex 布局下的垂直排列方式'
            }
        },
        col: {
            name: '格子',
            props: {
                span: '栅格占据的列数',
                offset: '栅格左侧的间隔格数',
                push: '栅格向右移动格数',
                pull: '栅格向左移动格数'
            }
        },
        tab: {
            name: '标签页',
            props: {
                type: '风格类型',
                closable: '标签是否可关闭',
                tabPosition: '选项卡所在位置',
                stretch: '标签的宽度是否自撑开'
            }
        },
        table: {
            name: '表格',
            headerLabel:'标题',
            headerName:'名称',
            tableTitle:'表名',
            tableId:'Id'
        },
        'tab-pane': {
            name: '标签页',
            props: {
                label: '选项卡标题',
                disabled: '是否禁用',
                name: '与选项卡绑定值 value 对应的标识符，表示选项卡别名',
                lazy: '标签是否延迟渲染'
            }
        },
        'el-divider': {
            name: '分割线',
            props: {
                direction: '设置分割线方向',
                formCreateChild: '设置分割线文案',
                contentPosition: '设置分割线文案的位置'
            }
        },
        cascader: {
            name: '级联选择器',
            props: {
                props: '配置选项',
                size: '尺寸',
                placeholder: '输入框占位文本',
                disabled: '是否禁用',
                clearable: '是否支持清空选项',
                showAllLevels: '输入框中是否显示选中值的完整路径',
                collapseTags: '多选模式下是否折叠Tag',
                separator: '选项分隔符'
            }
        },
        upload: {
            name: '上传',
            props: {
                uploadType: '上传类型',
                action: '上传的地址(必填)',
                headers: '设置上传的请求头部',
                multiple: '是否支持多选文件',
                data: '上传时附带的额外参数',
                name: '上传的文件字段名',
                withCredentials: '支持发送 cookie 凭证信息',
                accept: '接受上传的文件类型（thumbnail-mode 模式下此参数无效）',
                autoUpload: '是否在选取文件后立即进行上传',
                disabled: '是否禁用',
                limit: '最大允许上传个数'
            }
        },
        'el-transfer': {
            name: '穿梭框',
            props: {
                data: 'Transfer 的数据源',
                filterable: '是否可搜索',
                filterPlaceholder: '搜索框占位符',
                targetOrder: '右侧列表元素的排序策略',
                titles: '自定义列表标题',
                buttonTexts: '自定义按钮文案',
                format: '列表顶部勾选状态文案',
                props: '数据源的字段别名',
                leftDefaultChecked: '初始状态下左侧列表的已勾选项的 key 数组',
                rightDefaultChecked: '初始状态下右侧列表的已勾选项的 key 数组'
            }
        },
        tree: {
            name: '树形控件',
            props: {
                emptyText: '内容为空的时候展示的文本',
                props: '配置选项，具体看下表',
                renderAfterExpand: '是否在第一次展开某个树节点后才渲染其子节点',
                defaultExpandAll: '是否默认展开所有节点',
                expandOnClickNode: '是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。',
                checkOnClickNode: '是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点。',
                autoExpandParent: '展开子节点的时候是否自动展开父节点',
                checkStrictly: '在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false',
                accordion: '是否每次只打开一个同级树节点展开',
                indent: '相邻级节点间的水平缩进，单位为像素',
                iconClass: '自定义树节点的图标',
                nodeKey: '每个树节点用来作为唯一标识的属性，整棵树应该是唯一的'
            }
        },
        'el-alert': {
            name: '提示',
            description: 'description',
            props: {
                title: '标题',
                type: '主题',
                description: '辅助性文字',
                closable: '是否可关闭',
                center: '文字是否居中',
                closeText: '关闭按钮自定义文本',
                showIcon: '是否显示图标',
                effect: '选择提供的主题'
            }
        },
        span: {
            name: '文字',
            props: {
                formCreateTitle: '标题',
                formCreateChild: '内容'
            }
        },
        div: {
            name: '间距',
            props: {
                height: '高度',
            }
        },
        'el-button': {
            name: '按钮',
            props: {
                formCreateChild: '内容',
                size: '尺寸',
                type: '类型',
                plain: '是否朴素按钮',
                round: '是否圆角按钮',
                circle: '是否圆形按钮',
                loading: '是否加载中状态',
                disabled: '是否禁用状态',
                icon: '图标类名'
            }
        },
        'fc-editor': {
            name: '富文本框',
            props: {
                disabled: '是否禁用'
            }
        }
    }
};

export default ZhCn;

