const ZhCn = {
    name: 'zh-cn',
    form: {
        field: '字段 ID',
        title: '字段名称',
        info: '提示信息',
        control: '组件联动',
        labelShow: '是否显示',
        labelStyle: '标签的样式',
        formItem: '配置表单项',
        row: '整行',
        size: '表单的尺寸',
        event: '表单事件',
        layout: '表单布局',
        labelAlign: '标签的位置',
        labelWrap: '允许标签换行',
        colon: '是否显示标签后面的冒号',
        labelCol: '标签的宽度',
        hideRequiredMark: '隐藏必填字段的标签旁边的红色星号',
        formItemMarginBottom: '表单项的下边距',
        scrollToFirstError: '提交失败自动滚动到第一个错误字段',
        submitBtn: '是否显示表单提交按钮',
        resetBtn: '是否显示表单重置按钮',
        appendChild: '添加子级',
        formMode: '表单模式',
        formName: '表单名称',
        componentMode: '生成组件',
        htmlMode: '生成HTML',
        document: '帮助文档',
        controlDocument: '需要更详细的配置方法？请查看{doc}',
        onSubmit: '表单提交时触发',
        onReset: '表单重置后触发',
        onCreated: '表单组件初始化完毕后触发',
        onMounted: '表单组件渲染完毕后触发',
        onReload: '表单渲染规则重载后触发',
        onChange: '表单组件的值发生变化时触发',
        beforeSubmit: '表单验证通过时触发',
        beforeFetch: '远程数据请求发送前触发',
    },
    warning: {
        name: '组件的唯一标识，用于获取和修改该组件的配置规则。通过该标识可以精确定位组件，实现对组件属性和行为的控制。',
        field: '组件对应的字段名用于与组件的数据进行绑定。字段名需以字母开头，以确保能够正确识别。',
        fetch: '远程数据通过远程请求加载组件的配置项。配置请求参数后，组件会自动发起请求，获取远程数据并根据返回的结果更新组件。',
        fetchQuery: '定义请求的 GET 参数，通过 URL 传递数据。',
        fetchData: '定义请求的 POST 参数，通过请求体传递数据。',
        fetchDataType: '选择请求体的数据类型，确保数据格式正确。',
        beforeFetch: '在请求发送前，可通过处理函数修改请求参数；若需终止请求，直接返回 false 或一个拒绝的 Promise。',
        fetchParse: '请求返回后，可以通过处理函数对返回的结果进行处理，将结果转换为组件所需的数据和结构。',
        language: '管理页面的多语言数据，在组件中配置不同语言的文本，支持一键切换语言体系，便于在多语言环境下使用和展示内容。',
    },
    computed: {
        fieldUsed: '【{label}】在计算公式中被使用，请先修改对应公式',
        fieldExist: '【{label}】字段已存在',
        fieldEmpty: '字段名称不能为空',
        fieldChar: '字段名称必须以字母开头',
    },
    validate: {
        type: '字段类型',
        typePlaceholder: '请选择',
        trigger: '触发方式',
        mode: '验证方式',
        modes: {
            required: '必填',
            notRequired: '非必填',
            pattern: '正则表达式',
            validator: '自定义验证',
            min: '最小值',
            max: '最大值',
            len: '长度',
        },
        types: {
            string: '文本',
            boolean: '布尔',
            array: '多选',
            number: '数字',
            integer: '整数',
            float: '小数',
            object: '合集',
            date: '日期',
            url: 'URL链接',
            email: '邮箱地址',
        },
        message: '错误信息',
        auto: '自动获取',
        autoRequired: '请输入{title}',
        autoMode: '请输入正确的{title}',
        requiredPlaceholder: '请输入提示语',
        required: '是否必填',
        rule: '验证规则',
    },
    tableOptions: {
        handle: '操作',
        add: '添加',
        empty1: '点击右下角',
        empty2: '按钮添加一列',
        rmCol: '删除当前列',
        rmRow: '删除当前行',
        batchRmCol: '删除列',
        batchRmRow: '删除行',
        batchSplit: '拆分单元格',
        batchMerge: '合并单元格',
        splitRow: '拆分成行',
        splitCol: '拆分成列',
        mergeBottom: '向下合并',
        mergeRight: '向右合并',
        addTop: '添加上列',
        addBottom: '添加下列',
        addLeft: '添加左列',
        addRight: '添加右列',
        keyValue: '键值对',
    },
    struct: {
        title: '编辑数据',
        only: '【{label}】只允许添加一个',
        errorMsg: '输入的内容语法错误',
        configured: '已配置',
    },
    event: {
        title: '设置事件',
        create: '创建事件',
        list: '事件列表',
        placeholder: '请输入事件的名称',
        saveMsg: '请先保存当前正在编辑的事件',
        type: '类型',
        info: '说明',
        label: '字段',
        inject: {
            api: '当前表单的api',
            rule: '当前表单的生成规则',
            self: '组件的生成规则',
            option: '表单的配置',
            args: '事件的原始参数',
        }
    },
    eventInfo: {
        blur: '失去焦点时触发',
        focus: '获得焦点时触发',
        change: '当绑定值变化时触发',
        input: '在值改变时触发',
        clear: '在点击清空按钮时触发',
        close: '关闭组件时触发',
        click: '点击组件时触发',
        add: '增加时触发',
        delete: '删除时触发',
        remove: '删除时触发',
        ok: '点击确定按钮时触发',
        pressEnter: '按下回车键时触发',
        submit: '表单提交时触发',
        confirm: '点击确认按钮时触发',
        validateFail: '表单验证失败时触发',
        beforeLoad: '初始化之前触发',
        loaded: '初始化完成之后触发',
        hook_load: '组件规则加载后触发',
        hook_mounted: '组件挂载后触发',
        hook_deleted: '组件规则被移除后触发',
        hook_watch: '组件规则发生变化后触发',
        hook_value: '组件的值发生变化后触发',
        hook_hidden: '组件显示状态发生变化后触发',
    },
    fetch: {
        title: '设置数据源',
        create: '创建数据源',
        config: '请求配置',
        action: '请求链接',
        actionRequired: '请输入正确的链接',
        placeholder: '请输入数据源的名称',
        method: '请求方式',
        data: '附带数据',
        dataType: '数据类型',
        headers: '请求头部',
        query: '请求参数',
        parse: '数据处理',
        response: '接口返回的数据',
        onError: '错误处理',
        beforeFetch: '前置处理',
        remote: '远程数据',
        static: '静态数据',
        optionsType: {
            fetch: '远程数据',
            struct: '静态数据',
        }
    },
    style: {
        width: '宽度',
        height: '高度',
        color: '颜色',
        backgroundColor: '背景色',
        margin: '外边距',
        padding: '内边距',
        borderRadius: '圆角',
        border: '边框',
        solid: '实线',
        dashed: '虚线',
        dotted: '点状虚线',
        double: '双实线',
        opacity: '透明度',
        scale: '缩放',
        minWidth: '最小宽',
        minHeight: '最小高',
        maxWidth: '最大宽',
        maxHeight: '最大高',
        overflow: {
            name: '溢出',
            visible: '可见',
            hidden: '隐藏',
            scroll: '滚动',
            auto: '溢出后自动滚动',
        },
        shadow: {
            name: '阴影',
            x: 'x轴偏移量',
            y: 'y轴偏移量',
            vague: '模糊半径',
            extend: '扩散半径',
            inset: '向内',
            external: '向外',
            mode: '模式',
            classic: '经典',
            flat: '扁平',
            solid: '立体',
        },
        font: {
            name: '字体',
            size: '大小',
            align: '对齐方式',
            height: '行高',
            spacing: '字间距',
            preview: '样式预览',
        },
        decoration: {
            name: '修饰',
            underline: '下划线',
            'line-through': '删除线',
            overline: '上划线',
        },
        weight: {
            name: '粗细',
            300: '细体',
            400: '常规体',
            500: '中黑体',
            700: '中粗体',
        }
    },
    designer: {
        component: '组件配置',
        id: '唯一值',
        name: '编号',
        type: '组件类型',
        form: '表单配置',
        json: '渲染规则',
        style: '组件样式配置',
        rule: '基础配置',
        advanced: '高级配置',
        props: '属性配置',
        customProps: '自定义属性配置',
        validate: '验证配置',
        event: '事件配置',
        clearWarn: '清空后将不能恢复，确定要清空吗？',
        childEmpty: '点击右下角 \\e789  按钮添加一列',
        dragEmpty: '拖拽左侧列表中的组件到此处',
        unload: '确定离开当前页面吗?',
        comList: '组件列表',
    },
    language: {
        name: '国际化配置',
        add: '新增词条',
        batchRemove: '批量删除',
        select: '选择多语言',
    },
    menu: {
        main: '基础组件',
        aide: '辅助组件',
        layout: '布局组件',
        component: '组件',
        subform: '子表单组件',
        tree: '大纲'
    },
    props: {
        circle: '圆形',
        square: '正方形',
        image: '图片',
        video: '视频',
        audio: '音频',
        document: '文档',
        link: '链接',
        dashed: '虚线',
        info: '提示',
        success: '成功',
        error: '失败',
        warning: '警告',
        primary: '重要',
        danger: '危险',
        form: '表单',
        subform: '子表单',
        other: '其他',
        model: '弹窗',
        field: '字段',
        size: '尺寸',
        variable: '变量',
        disabled: '禁用',
        enable: '启用',
        time: '时间',
        email: '邮箱',
        number: '数字',
        globalData: '全局数据',
        mobile: '移动端',
        reactive: '响应式',
        pc: '电脑端',
        title: '标题',
        content: '内容',
        collection: '合集',
        group: '分组',
        custom: '自定义',
        change: '改变',
        blur: '失去焦点',
        preview: '预览',
        clear: '清空',
        cancel: '取消',
        close: '关闭',
        ok: '确定',
        save: '保存',
        refresh: '刷新',
        submit: '提交',
        reset: '重置',
        copy: '复制',
        delete: '删除',
        hide: '隐藏',
        show: '显示',
        position: '位置',
        render: '渲染',
        large: '大',
        default: '默认',
        middle: '中',
        small: '小',
        always: '常显',
        never: '不显示',
        hover: '悬浮',
        click: '点击',
        button: '按钮',
        year: '年份',
        month: '月份',
        date: '日期',
        dates: '日期多选',
        week: '一周',
        quarter: '季度',
        datetime: '日期时间',
        'datetime-local': '日期时间',
        datetimerange: '日期时间区间',
        daterange: '日期区间',
        monthrange: '月份区间',
        left: '左对齐',
        right: '右对齐',
        top: '顶部',
        bottom: '低部',
        text: '文字',
        icon: '图标',
        picture: '图片',
        'picture-card': '卡片',
        center: '居中',
        vertical: '竖向',
        horizontal: '横向',
        manage: '管理',
        key: '键名',
        name: '名称',
        value: '值',
        inputData: '默认值',
        append: '插入',
        options: '选项数据',
        option: '选项',
        callback: '回调',
        style: '样式',
        _self: '当前窗口',
        _blank: '新的窗口',
        _parent: '父级窗口',
        _top: '顶级窗口',
    },
    com: {
        cascader: {
            name: '级联选择器',
            event: {
                dropdownVisibleChange: '显示/隐藏浮层时触发',
                search: '监听搜索，返回输入的值',
            },
            props: {
                props: '配置选项',
                placeholder: '输入框占位文本',
                disabled: '是否禁用',
                allowClear: '是否支持清空选项',
                multiple: '支持多选节点',
                showSearch: '该选项是否可以被搜索',
            },
        },
        checkbox: {
            name: '多选框',
            props: {
                disabled: '是否禁用',
            }
        },
        col: {
            name: '布局格子',
            info: '通过响应式配置多端布局，移动端会自动应用第一个',
            props: {
                span: '栅格占据的列数',
                offset: '栅格左侧的间隔格数',
                push: '栅格向右移动格数',
                pull: '栅格向左移动格数'
            }
        },
        datePicker: {
            name: '日期',
            props: {
                disabled: '禁用',
                bordered: '是否有边框',
                picker: '显示类型',
                inputReadOnly: '文本框不可输入',
                showTime: '增加时间选择',
                allowClear: '是否显示清除按钮',
                placeholder: '选择时的占位内容',
                __startPlaceholder: '范围选择时开始日期的占位内容',
                __endPlaceholder: '范围选择时结束日期的占位内容',
                separator: '设置分隔符',
                format: '显示在输入框中的格式',
                valueFormat: '绑定值的格式',
            }
        },
        dateRange: {
            name: '日期区间',
            event: {
                calendarChange: '待选日期发生变化时触发',
            }
        },
        timeRange: {
            name: '时间区间',
        },
        aAlert: {
            name: '提示',
            description: '说明文字',
            props: {
                message: '标题',
                type: '主题',
                description: '辅助性文字',
                closable: '是否可关闭',
                banner: '是否用作顶部公告',
                closeText: '关闭按钮自定义文本',
                showIcon: '是否显示图标',
            }
        },
        aButton: {
            name: '按钮',
            props: {
                formCreateChild: '内容',
                size: '尺寸',
                type: '类型',
                shape: '形状',
                ghost: '使按钮背景透明',
                danger: '设置危险按钮',
                block: '将按钮宽度自动撑开',
                loading: '是否加载中状态',
                disabled: '是否禁用状态',
            }
        },
        aCard: {
            name: '卡片',
            props: {
                title: '标题',
                size: '尺寸',
                type: '类型',
                hoverable: '鼠标移过时可浮起',
            }
        },
        aCollapse: {
            name: '折叠面板',
            event: {
                change: '切换面板时触发',
            },
            props: {
                accordion: '是否手风琴模式',
                bordered: '带边框风格的折叠面板',
                ghost: '使折叠面板透明且无边框',
            }
        },
        aCollapsePanel: {
            name: '面板',
            props: {
                header: '面板标题',
                key: '唯一标志符',
                disabled: '是否禁用',
                showArrow: '是否展示当前面板上的箭头',
            }
        },
        aDivider: {
            name: '分割线',
            props: {
                type: '设置分割线方向',
                formCreateChild: '设置分割线文案',
                orientation: '设置分割线文案的位置',
                plain: '文字是否显示为普通正文样式',
                dashed: '是否虚线',
            }
        },
        aTabPane: {
            name: '选项卡',
            props: {
                tab: '选项卡标题',
                disabled: '是否禁用',
                key: '选项卡的标识符',
            }
        },
        aTabs: {
            name: '标签页',
            event: {
                change: '切换面板时触发',
                tabClick: 'tab 被选中时触发',
                edit: '点击 tab 的新增或移除按钮后触发',
            },
            props: {
                type: '风格类型',
                tabPosition: '选项卡所在位置',
                centered: '标签居中展示'
            }
        },
        aTag: {
            name: '标签',
            props: {
                formCreateNative: '是否显示标题',
                formCreateTitle: '标题',
                formCreateChild: '标签内容',
                closable: '是否可关闭',
                bordered: '是否有边框',
                color: '背景色'
            }
        },
        aTransfer: {
            name: '穿梭框',
            event: {
                search: '搜索框内容时改变时触发',
                selectChange: '选中项发生改变时触发',
            },
            props: {
                oneWay: '展示为单向样式',
                pagination: '使用分页样式',
                showSearch: '是否显示搜索框',
                showSelectAll: '是否展示全选勾选框',
                filterPlaceholder: '搜索框占位符',
                titles: '自定义列表标题',
            }
        },
        aTreeSelect: {
            name: '树形选择',
            event: {
                check: '选中树节点或输入值发生变化时触发',
                treeExpand: '展开树节点时调用',
                select: '点击树节点触发',
            },
            props: {
                multiple: '是否多选',
                disabled: '是否禁用',
                allowClear: '是否可以清空选项',
                showSearch: '在下拉中显示搜索框(仅在单选模式下生效)',
                treeCheckable: '显示多选框',
                fieldNames: '配置选项',
                treeDefaultExpandAll: '是否默认展开所有节点',
                treeLine: '是否展示线条样式',
            }
        },
        aImage: {
            name: '图片',
            props: {
                src: '图片链接',
                preview: '开启预览',
            }
        },
        fcTitle: {
            name: '标题',
            props: {
                title: '标题',
                size: '尺寸',
                align: '对齐方式'
            }
        },
        fcEditor: {
            name: '富文本框',
            props: {
                disabled: '是否禁用'
            }
        },
        fcRow: {
            name: '栅格布局',
            props: {
                gutter: '栅格间隔',
                justify: '水平排列方式',
                align: '垂直排列方式'
            }
        },
        fcTable: {
            name: '表格布局',
            props: {
                border: '是否显示边框',
                borderColor: '边框颜色',
                borderWidth: '边框宽度'
            }
        },
        fcTableGrid: {
            name: '格子',
        },
        signaturePad: {
            name: '手写签名',
            props: {
                penColor: '线条的颜色',
                disabled: '禁用',
            }
        },
        group: {
            name: '子表单',
            props: {
                disabled: '是否禁用',
                syncDisabled: '是否与子表单强制同步禁用状态',
                expand: '设置默认展开几项',
                button: '是否显示操作按钮',
                sortBtn: '是否显示排序按钮',
                min: '设置最小添加几项',
                max: '设置最多添加几项',
            }
        },
        html: {
            name: 'HTML',
            props: {
                formCreateNative: '是否显示标题',
                formCreateTitle: '标题',
                formCreateChild: '内容',
            }
        },
        input: {
            name: '输入框',
            event: {
                change: '输入框内容变化时触发',
            },
            props: {
                type: '类型',
                maxlength: '最大输入长度',
                minlength: '最小输入长度',
                placeholder: '输入框占位文本',
                allowClear: '是否显示清除按钮',
                bordered: '是否有边框',
                showCount: '是否展示字数',
                disabled: '是否禁用',
                autoSize: '自适应内容高度',
            }
        },
        inputNumber: {
            name: '数字输入框',
            event: {
                step: '点击上下箭头时触发',
            },
            props: {
                precision: '数值精度',
                min: '设置计数器允许的最小值',
                max: '设置计数器允许的最大值',
                step: '计数器步长',
                disabled: '是否禁用计数器',
                controls: '是否使用控制按钮',
                bordered: '是否有边框',
                placeholder: '输入框占位文本'
            }
        },
        password: {
            name: '密码输入框',
            event: {
                change: '输入框内容变化时触发',
            },
            props: {
                disabled: '是否禁用',
                maxlength: '最大输入长度',
                minlength: '最小输入长度',
                placeholder: '输入框占位文本',
                showCount: '是否展示字数',
                visibilityToggle: '是否显示切换按钮或者控制密码显隐',
                allowClear: '是否显示清除按钮',
                bordered: '是否有边框',
            }
        },
        radio: {
            name: '单选框',
            props: {
                input: '是否可以填写',
                disabled: '是否禁用',
                optionType: '选项类型',
            }
        },
        rate: {
            name: '评分',
            props: {
                count: '最大分值',
                disabled: '是否禁用',
                allowClear: '是否允许再次点击后清除',
                allowHalf: '是否允许半选',
            }
        },
        select: {
            name: '选择器',
            event: {
                search: '文本框值变化时触发',
                select: '被选中时调用',
            },
            modeOpt: {
                multiple: '多选',
                tags: '标签',
                combobox: '单选',
            },
            props: {
                disabled: '是否禁用',
                allowClear: '是否可以清空选项',
                placeholder: '占位符',
                bordered: '是否有边框',
                mode: '模式',
            }
        },
        slider: {
            name: '滑块',
            props: {
                min: '最小值',
                max: '最大值',
                disabled: '是否禁用',
                step: '步长',
                dots: '是否显示间断点',
                range: '是否为范围选择',
                vertical: '是否竖向模式',
            }
        },
        space: {
            name: '间距'
        },
        subForm: {
            name: '分组',
            props: {
                disabled: '是否禁用',
                syncDisabled: '是否与子表单强制同步禁用状态'
            }
        },
        switch: {
            name: '开关',
            props: {
                disabled: '是否禁用',
                checkedChildren: '打开时的文字描述',
                unCheckedChildren: '关闭时的文字描述',
                checkedValue: '打开时的值',
                unCheckedValue: '关闭时的值',
            }
        },
        tableForm: {
            name: '表格表单',
            props: {
                disabled: '是否禁用',
                filterEmptyColumn: '是否过滤空行的数据',
                max: '最多添加几行，为 0 则不限制',
                min: '最少添加几行',
                addable: '允许新增',
                deletable: '允许删除',
            }
        },
        tableFormColumn: {
            name: '表格格子',
            label: '自定义名称',
            props: {
                align: '对齐方式',
                label: '标题',
                width: '宽度',
                color: '颜色',
                required: '是否显示必填星号',
            }
        },
        text: {
            name: '文字',
            props: {
                formCreateNative: '是否显示标题',
                formCreateTitle: '标题',
                formCreateChild: '内容'
            }
        },
        textarea: {
            name: '多行输入框',
        },
        timePicker: {
            name: '时间',
            'HH:mm:ss': '时:分:秒',
            'HH:mm': '时:分',
            props: {
                __format: '输入框中的格式',
                disabled: '禁用',
                inputReadOnly: '文本框不可输入',
                allowClear: '是否显示清除按钮',
                hourStep: '小时选项间隔',
                minuteStep: '分钟选项间隔',
                secondStep: '秒选项间隔',
                placeholder: '选择时的占位内容',
                __startPlaceholder: '范围选择时开始日期的占位内容',
                __endPlaceholder: '范围选择时结束日期的占位内容',
                bordered: '是否有边框',
            }
        },
        tree: {
            name: '树形控件',
            event: {
                check: '点击复选框触发',
                expand: '展开/收起节点时触发',
                rightClick: '响应右键点击',
                select: '点击树节点触发',
            },
            props: {
                fieldNames: '配置选项',
                showLine: '是否展示连接线',
                defaultExpandAll: '是否默认展开所有节点',
            }
        },
        upload: {
            name: '上传',
            info: '上传成功后，将接口返回的 URL 赋值给 file.url，或将返回结果赋值给 file.value，以便在后续的表单提交时获取这些数据。',
            event: {
                download: '点击下载文件时触发',
                preview: '点击文件链接或预览图标时触发',
                remove: '文件列表移除文件时触发',
            },
            props: {
                listType: '上传类型',
                multiple: '是否支持多选文件',
                action: '上传的地址(必填)',
                beforeUpload: '上传文件之前的钩子',
                onSuccess: '上传成功回调',
                headers: '设置上传的请求头部',
                data: '上传时附带的额外参数',
                name: '上传的文件字段名',
                withCredentials: '支持发送 cookie 凭证信息',
                accept: '接受上传的文件类型',
                customRequest: '自定义上传行为',
                disabled: '是否禁用',
                maxCount: '最大允许上传个数'
            }
        },
    },
};

export default ZhCn;

