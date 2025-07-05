const ZhCn = {
    name: 'zh-cn',
    form: {
        field: '字段 ID',
        title: '字段名称',
        info: '提示信息',
        control: '组件联动',
        labelPosition: '标签的位置',
        labelStyle: '标签的样式',
        labelSuffix: '标签的后缀',
        size: '表单的尺寸',
        event: '表单事件',
        labelWidth: '标签的宽度',
        hideRequiredAsterisk: '隐藏必填字段的标签旁边的红色星号',
        showMessage: '显示校验错误信息',
        inlineMessage: '以行内形式展示校验信息',
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
        visibleChange: '下拉框出现/隐藏时触发',
        calendarChange: '在日历所选日期更改时触发',
        panelChange: '当日期面板改变时触发',
        open: '打开的回调',
        opened: '打开动画结束时的回调',
        closed: '关闭动画结束时的回调',
        openAutoFocus: '输入焦点聚焦在内容时的回调',
        closeAutoFocus: '输入焦点从内容失焦时的回调',
        submit: '表单提交时触发',
        confirm: '点击确认按钮时触发',
        validateFail: '表单验证失败时触发',
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
        disabled: '禁用',
        time: '时间',
        size: '尺寸',
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
        datetime: '日期时间',
        'datetime-local': '日期时间',
        datetimerange: '日期时间区间',
        daterange: '日期区间',
        monthrange: '月份区间',
        left: '左对齐',
        right: '右对齐',
        top: '顶部',
        text: '文字',
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
                expandChange: '当展开节点发生变化时触发',
                removeTag: '在多选模式下，移除Tag时触发'
            },
            props: {
                props: '配置选项',
                placeholder: '输入框占位文本',
                disabled: '是否禁用',
                clearable: '是否支持清空选项',
                showAllLevels: '输入框中是否显示选中值的完整路径',
                collapseTags: '多选模式下是否折叠Tag',
                collapseTagsTooltip: '当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签',
                separator: '选项分隔符',
                filterable: '该选项是否可以被搜索',
                tagType: '标签类型',
            },
            propsOpt: {
                multiple: '是否多选',
                expandTrigger: '次级菜单的展开方式',
                checkStrictly: '是否严格的遵守父子节点不互相关联',
                emitPath: '在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组',
                value: '指定选项的值为选项对象的某个属性值',
                label: '指定选项标签为选项对象的某个属性值',
                children: '指定选项的子选项为选项对象的某个属性值',
                disabled: '指定选项的禁用为选项对象的某个属性值',
                leaf: '指定选项的叶子节点的标志位为选项对象的某个属性值',
            }
        },
        checkbox: {
            name: '多选框',
            props: {
                input: '是否可以填写',
                type: '按钮类型',
                disabled: '是否禁用',
                min: '可被勾选的最小数量',
                max: '可被勾选的最大数量',
                textColor: '当按钮为活跃状态时的字体颜色',
                fill: '当按钮为活跃状态时的边框和背景颜色'
            }
        },
        col: {
            name: '布局格子',
            props: {
                span: '栅格占据的列数',
                offset: '栅格左侧的间隔格数',
                push: '栅格向右移动格数',
                pull: '栅格向左移动格数'
            }
        },
        colorPicker: {
            name: '颜色选择器',
            event: {
                activeChange: '面板中当前显示的颜色发生改变时触发'
            },
            props: {
                disabled: '是否禁用',
                showAlpha: '是否支持透明度选择',
                colorFormat: '颜色的格式',
                predefine: '预定义颜色',
            }
        },
        datePicker: {
            name: '日期',
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
            }
        },
        dateRange: {
            name: '日期区间',
        },
        timeRange: {
            name: '时间区间',
        },
        elAlert: {
            name: '提示',
            description: '说明文字',
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
        elButton: {
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
            }
        },
        elCard: {
            name: '卡片',
            props: {
                header: '标题',
                shadow: '阴影显示时机',
            }
        },
        elCollapse: {
            name: '折叠面板',
            event: {
                change: '切换当前活动面板，在手风琴模式下其类型是string，在其他模式下是array',
            },
            props: {
                accordion: '是否手风琴模式'
            }
        },
        elCollapseItem: {
            name: '面板',
            props: {
                title: '面板标题',
                name: '唯一标志符',
                disabled: '是否禁用',
            }
        },
        elDivider: {
            name: '分割线',
            props: {
                formCreateChild: '设置分割线文案',
                contentPosition: '设置分割线文案的位置'
            }
        },
        elTabPane: {
            name: '选项卡',
            props: {
                label: '选项卡标题',
                disabled: '是否禁用',
                name: '选项卡的标识符',
                lazy: '标签是否延迟渲染'
            }
        },
        elTabs: {
            name: '标签页',
            event: {
                tabClick: 'tab 被选中时触发',
                tabChange: 'activeName 改变时触发',
                tabRemove: '点击 tab 移除按钮时触发',
                tabAdd: '点击 tab 新增按钮时触发',
                edit: '点击 tab 的新增或移除按钮后触发',
            },
            props: {
                type: '风格类型',
                closable: '标签是否可关闭',
                tabPosition: '选项卡所在位置',
                stretch: '标签的宽度是否自撑开'
            }
        },
        elTag: {
            name: '标签',
            props: {
                formCreateNative: '是否显示标题',
                formCreateTitle: '标题',
                formCreateChild: '标签内容',
                type: '标签的类型',
                size: '标签的尺寸',
                effect: '标签的主题',
                closable: '是否可关闭',
                disableTransitions: '是否禁用渐变动画',
                hit: '是否有边框描边',
                round: '是否为圆形',
                color: '背景色'
            }
        },
        elTransfer: {
            name: '穿梭框',
            event: {
                leftCheckChange: '左侧列表元素被用户选中 / 取消选中时触发',
                rightCheckChange: '右侧列表元素被用户选中 / 取消选中时触发'
            },
            props: {
                filterable: '是否可搜索',
                filterPlaceholder: '搜索框占位符',
                targetOrder: '右侧列表元素的排序策略',
                targetOrderInfo: '若为 original，则保持与数据相同的顺序；若为 push，则新加入的元素排在最后；若为 unshift，则新加入的元素排在最前',
                titles: '自定义列表标题',
                buttonTexts: '自定义按钮文案',
                props: '数据源的字段别名'
            }
        },
        elTreeSelect: {
            name: '树形选择',
            event: {
                removeTag: '多选模式下移除tag时触发'
            },
            props: {
                multiple: '是否多选',
                disabled: '是否禁用',
                clearable: '是否可以清空选项',
                collapseTags: '多选时是否将选中值按文字的形式展示',
                multipleLimit: '多选时用户最多可以选择的项目数，为 0 则不限制',
                placeholder: '占位符',
                props: '配置选项',
                renderAfterExpand: '是否在第一次展开某个树节点后才渲染其子节点',
                defaultExpandAll: '是否默认展开所有节点',
                expandOnClickNode: '是否在点击节点的时候展开或者收缩节点',
                checkOnClickNode: '是否在点击节点的时候选中节点',
                nodeKey: '每个树节点用来作为唯一标识的属性，整棵树应该是唯一的'
            }
        },
        elImage: {
            name: '图片',
            props: {
                src: '图片链接'
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
                type: 'flex布局模式',
                justify: 'flex布局下的水平排列方式',
                align: 'flex布局下的垂直排列方式'
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
                change: '当值改变时，当组件失去焦点或用户按Enter时触发',
            },
            props: {
                type: '类型',
                maxlength: '最大输入长度',
                minlength: '最小输入长度',
                placeholder: '输入框占位文本',
                clearable: '是否显示清除按钮',
                disabled: '是否禁用',
                readonly: '是否只读',
            }
        },
        inputNumber: {
            name: '计数器',
            props: {
                precision: '数值精度',
                min: '设置计数器允许的最小值',
                max: '设置计数器允许的最大值',
                step: '计数器步长',
                stepStrictly: '是否只能输入 step 的倍数',
                disabled: '是否禁用计数器',
                controls: '是否使用控制按钮',
                controlsPosition: '控制按钮位置',
                placeholder: '输入框占位文本'
            }
        },
        password: {
            name: '密码输入框',
            event: {
                change: '当值改变时，当组件失去焦点或用户按Enter时触发',
            },
            props: {
                disabled: '是否禁用',
                readonly: '是否只读',
                maxlength: '最大输入长度',
                minlength: '最小输入长度',
                placeholder: '输入框占位文本',
                clearable: '是否显示清除按钮'
            }
        },
        radio: {
            name: '单选框',
            props: {
                input: '是否可以填写',
                disabled: '是否禁用',
                type: '按钮形式',
                textColor: '按钮形式激活时的文本颜色',
                fill: '按钮形式激活时的填充色和边框色'
            }
        },
        rate: {
            name: '评分',
            props: {
                max: '最大分值',
                disabled: '是否禁用',
                allowHalf: '是否允许半选',
                voidColor: '未选中时图标的颜色',
                disabledVoidColor: '只读时未选中时图标的颜色',
                voidIconClass: '未选中时图标的类名',
                disabledVoidIconClass: '只读时未选中时图标的类名',
                showScore: '是否显示当前分数',
                textColor: '辅助文字的颜色',
                scoreTemplate: '分数显示模板'
            }
        },
        select: {
            name: '选择器',
            event: {
                removeTag: '多选模式下移除tag时触发'
            },
            props: {

                multiple: '是否多选',
                disabled: '是否禁用',
                clearable: '是否可以清空选项',
                collapseTags: '多选时是否将选中值按文字的形式展示',
                multipleLimit: '多选时用户最多可以选择的项目数，为 0 则不限制',
                placeholder: '占位符',
                filterable: '是否可搜索',
                allowCreate: '是否允许用户创建新条目',
                noMatchText: '搜索条件无匹配时显示的文字',
                noDataText: '选项为空时显示的文字',
                reserveKeyword: '多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词',
                defaultFirstOption: '在输入框按下回车，选择第一个匹配项',
                remote: '其中的选项是否从服务器远程加载',
                remoteMethod: '自定义远程搜索方法',
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
        space: {
            name: '间距',
            props: {
                height: '高度',
            }
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
                width: '宽度（px）',
                activeText: '打开时的文字描述',
                inactiveText: '关闭时的文字描述',
                activeValue: '打开时的值',
                inactiveValue: '关闭时的值',
                activeColor: '打开时的背景色',
                inactiveColor: '关闭时的背景色'
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
            event: {
                change: '当值改变时，当组件失去焦点或用户按Enter时触发',
            },
            props: {
                disabled: '是否禁用',
                readonly: '是否只读',
                maxlength: '最大输入长度',
                minlength: '最小输入长度',
                showWordLimit: '是否显示统计字数',
                placeholder: '输入框占位文本',
                rows: '输入框行数',
                autosize: '高度是否自适应'
            }
        },
        timePicker: {
            name: '时间',
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
                align: '对齐方式'
            }
        },
        tree: {
            name: '树形控件',
            event: {
                nodeClick: '当节点被点击的时候触发',
                nodeContextmenu: '当某一节点被鼠标右键点击时会触发该事件',
                checkChange: '当复选框被点击的时候触发',
                check: '点击节点复选框之后触发',
                currentChange: '当前选中节点变化时触发的事件',
                nodeExpand: '节点被展开时触发的事件',
                nodeCollapse: '节点被关闭时触发的事件',
                nodeDragStart: '节点开始拖拽时触发的事件',
                nodeDragEnter: '拖拽进入其他节点时触发的事件',
                nodeDragLeave: '拖拽离开某个节点时触发的事件',
                nodeDragOver: '在拖拽节点时触发的事件（类似浏览器的 mouseover 事件）',
                nodeDragEnd: '拖拽结束时（可能未成功）触发的事件',
                nodeDrop: '拖拽成功完成时触发的事件'
            },
            props: {
                emptyText: '内容为空的时候展示的文本',
                props: '配置选项',
                renderAfterExpand: '是否在第一次展开某个树节点后才渲染其子节点',
                defaultExpandAll: '是否默认展开所有节点',
                expandOnClickNode: '是否在点击节点的时候展开或者收缩节点，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。',
                checkOnClickNode: '是否在点击节点的时候选中节点',
                autoExpandParent: '展开子节点的时候是否自动展开父节点',
                checkStrictly: '在显示复选框的情况下，是否严格的遵循父子不互相关联的做法',
                accordion: '是否每次只打开一个同级树节点展开',
                indent: '相邻级节点间的水平缩进(px)',
                nodeKey: '每个树节点用来作为唯一标识的属性，整棵树应该是唯一的'
            }
        },
        upload: {
            name: '上传',
            info: '上传成功后，将接口返回的 URL 赋值给 file.url，或将返回结果赋值给 file.value，以便在后续的表单提交时获取这些数据。',
            event: {
                remove: '文件列表移除文件时触发',
                preview: '点击文件列表中已上传的文件时触发',
                error: '文件上传失败时触发',
                progress: '文件上传时触发',
                exceed:'当超出限制时触发'
            },
            props: {
                listType: '上传类型',
                multiple: '是否支持多选文件',
                action: '上传的地址(必填)',
                beforeUpload: '上传文件之前触发',
                onSuccess: '上传成功时触发',
                beforeRemove: '删除文件之前触发',
                headers: '设置上传的请求头部',
                data: '上传时附带的额外参数',
                name: '上传的文件字段名',
                withCredentials: '支持发送 cookie 凭证信息',
                accept: '接受上传的文件类型',
                autoUpload: '是否在选取文件后立即进行上传',
                disabled: '是否禁用',
                limit: '最大允许上传个数'
            }
        }
    },
};

export default ZhCn;

