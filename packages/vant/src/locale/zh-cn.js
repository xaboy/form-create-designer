const ZhCn = {
    name: 'zh-cn',
    form: {
        field: '字段 ID',
        title: '字段名称',
        info: '提示信息',
        control: '联动数据',
        labelAlign: '标签的位置',
        inputAlign: '内容的位置',
        labelStyle: '标签的样式',
        colon: '是否在标签后面添加冒号',
        size: '表单的尺寸',
        event: '表单事件',
        labelWidth: '标签的宽度',
        widthMode: '宽度模式',
        fixedWidth: '固定宽度',
        minMaxWidth: '最小/最大宽度',
        minWidth: '最小宽度',
        maxWidth: '最大宽度',
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
        beforeFetch: '远程数据请求发送前触发',
    },
    warning: {
        name: '组件的唯一标识，用于获取和修改该组件的配置规则。通过该标识可以精确定位组件，实现对组件属性和行为的控制。',
        field: '组件对应的字段名用于与组件的数据进行绑定。字段名需以字母开头，以确保能够正确识别。',
        fetch: '远程数据通过远程请求加载组件的配置项。配置请求参数后，组件会自动发起请求，获取远程数据并根据返回的结果更新组件。',
        fetchQuery: '定义请求的 GET 参数，通过 URL 传递数据。',
        fetchData: '定义请求的 POST 参数，通过请求体传递数据。',
        fetchDataType: '选择请求体的数据类型，确保数据格式正确。',
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
        placeholder: '请输入事件的描述信息',
        saveMsg: '请先保存当前正在编辑的事件',
        type: '类型',
        info: '说明',
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
        cancel: '点击取消按钮时触发',
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
        field: '字段',
        disabled: '禁用',
        notDisabled: '非禁用',
        time: '时间',
        size: '尺寸',
        email: '邮箱',
        number: '数字',
        globalData: '全局数据',
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
        medium: '中等',
        default: '默认',
        small: '小',
        mini: '最小',
        always: '常显',
        single: '单选',
        multiple: '多选',
        range: '区间',
        never: '不显示',
        hover: '悬浮',
        click: '点击',
        button: '按钮',
        year: '年份',
        month: '月份',
        day: '天',
        hour: '小时',
        minute: '分钟',
        second: '秒',
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
        bottom: '底部',
        round: '圆形',
        card: '卡片',
        line: '线条',
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
        closeable: '可关闭',
        link: '链接',
        _self: '当前窗口',
        _blank: '新的窗口',
        _parent: '父级窗口',
        _top: '顶级窗口',
    },
    com: {
        cascader: {
            name: '级联选择器',
            event: {
                finish: '全部选项选择完成后触发',
                clickTab: '点击标签时触发'
            },
            props: {
                title: '顶部标题',
                placeholder: '输入框占位文本',
                disabled: '是否禁用',
                activeColor: '选中状态的高亮颜色',
                clearable: '是否启用清除图标',
            },
        },
        checkbox: {
            name: '多选框',
            props: {
                disabled: '是否禁用',
                max: '可被勾选的最大数量',
                checkedColor: '所有复选框的选中状态颜色',
                direction: '排列方向'
            }
        },
        col: {
            name: '布局格子',
            props: {
                span: '栅格占据的列数',
                offset: '栅格左侧的间隔格数',
            }
        },
        datePicker: {
            name: '日期',
            props: {
                disabled: '是否禁用',
                clearable: '是否启用清除图标',
                columnsType: '选项类型',
                minDate: '可选的最小时间',
                maxDate: '可选的最大时间',
                title: '顶部栏标题',
                visibleOptionNum: '可见的选项个数',
                placeholder: '未选中时的提示文案',
            }
        },
        calendar: {
            name: '日历',
            event: {
                select: '点击并选中任意日期时触发',
                unselect: '当日历组件的 type 为 multiple 时，取消选中日期时触发',
                monthShow: '当某个月份进入可视区域时触发',
                overRange: '范围选择超过最多可选天数时触发',
                clickSubtitle: '点击日历副标题时触发',
                clickDisabledDate: '点击禁用日期时触发',
            },
            switchMode: {
                none: '不展示切换按钮',
                month: '按月切换',
                'year-month': '按年切换和按月切换',
            },
            props: {
                disabled: '是否禁用',
                type: '选项类型',
                switchMode: '切换模式',
                title: '日历标题',
                minDate: '可选的最小时间',
                maxDate: '可选的最大时间',
                placeholder: '未选中时的提示文案',
                clearable: '是否启用清除图标',
            }
        },
        calendarRange: {
            name: '日期区间',
            event: {
                select: '点击并选中任意日期时触发',
                unselect: '当日历组件的 type 为 multiple 时，取消选中日期时触发',
                monthShow: '当某个月份进入可视区域时触发',
                overRange: '范围选择超过最多可选天数时触发',
                clickSubtitle: '点击日历副标题时触发',
                clickDisabledDate: '点击禁用日期时触发',
            },
        },
        vanNoticeBar: {
            name: '通知',
            description: '通知文字',
            event: {
                replay: '每当滚动栏重新开始滚动时触发'
            },
            props: {
                mode: '通知栏模式',
                text: '通知文本内容',
                color: '通知文本颜色',
                background: '滚动条背景',
                speed: '滚动速率',
                scrollable: '是否开启滚动播放，内容长度溢出时默认开启',
                wrapable: '是否开启文本换行，只在禁用滚动时生效',
            }
        },
        vanButton: {
            name: '按钮',
            props: {
                formCreateChild: '内容',
                size: '尺寸',
                type: '类型',
                color: '按钮颜色',
                block: '是否为块级元素',
                square: '是否为方形按钮',
                round: '是否为圆形按钮',
                disabled: '是否禁用按钮',
            }
        },
        vanCollapse: {
            name: '折叠面板',
            event: {
                change: '切换面板时触发',
            },
            props: {
                accordion: '是否手风琴模式'
            }
        },
        vanCollapseItem: {
            name: '面板',
            props: {
                title: '标题栏左侧内容',
                name: '唯一标志符',
                value: '标题栏右侧内容',
                label: '标题栏描述信息',
                disabled: '是否禁用面板',
            }
        },
        vanDivider: {
            name: '分割线',
            props: {
                vertical: '是否使用垂直',
                formCreateChild: '设置分割线文案',
                dashed: '是否使用虚线',
                contentPosition: '内容位置'
            }
        },
        vanTab: {
            name: '选项卡',
            props: {
                title: '选项卡标题',
                disabled: '是否禁用',
                name: '选项卡的标识符',
            }
        },
        vanTabs: {
            name: '标签页',
            event: {
                clickTab: '点击标签时触发',
                rendered: '标签内容首次渲染时触发（仅在开启延迟渲染后触发）',
                scroll: '滚动时触发，仅在 sticky 模式下生效'
            },
            props: {
                type: '风格类型',
                color: '标签主题色',
                background: '标签栏背景色',
                sticky: '是否使用粘性布局',
                swipeable: '是否开启手势左右滑动切换',
                scrollspy: '是否开启滚动导航',
                titleActiveColor: '标题选中态颜色',
                titleInactiveColor: '标题默认态颜色',
            }
        },
        vanTag: {
            name: '标签',
            props: {
                formCreateTitle: '标题',
                formCreateChild: '标签内容',
                type: '标签的类型',
                size: '标签的尺寸',
                color: '标签颜色',
                plain: '是否为空心样式',
                round: '是否为圆角样式',
                textColor: '文本颜色',
            }
        },
        vanImage: {
            name: '图片',
            props: {
                src: '图片链接'
            }
        },
        fcCell: {
            name: '格子'
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
        group: {
            name: '子表单',
            props: {
                disabled: '是否禁用',
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
                formCreateTitle: '标题',
                formCreateChild: '内容',
            }
        },
        input: {
            name: '输入框',
            props: {
                type: '类型',
                disabled: '是否禁用输入框',
                readonly: '是否为只读状态',
                placeholder: '输入框占位提示文字',
                maxlength: '输入的最大字符数',
                showWordLimit: '是否显示字数统计',
                clearable: '是否启用清除图标',
                autosize: '是否自适应内容高度',
                rows: '输入框行数',
            }
        },
        stepper: {
            name: '数字输入框',
            event: {
                overlimit: '点击不可用的按钮时触发',
                plus: '点击增加按钮时触发',
                minus: '点击减少按钮时触发',
            },
            props: {
                min: '最小值',
                max: '最大值',
                step: '步长',
                decimalLength: '固定显示的小数位数',
                theme: '样式风格',
                placeholder: '输入框占位提示文字',
                integer: '是否只允许输入整数',
                disabled: '是否禁用',
            }
        },
        password: {
            name: '密码输入框',
        },
        radio: {
            name: '单选框',
            props: {
                disabled: '是否禁用',
                max: '最大可选数，0 为无限制',
                checkedColor: '所有复选框的选中状态颜色',
                direction: '排列方向',
            }
        },
        rate: {
            name: '评分',
            props: {
                count: '最大分值',
                disabled: '是否禁用',
                readonly: '是否为只读状态',
                allowHalf: '是否允许半选',
                color: '选中时的颜色',
                voidColor: '未选中时的颜色',
            }
        },
        select: {
            name: '选择器',
            event: {
                clickOption: '点击选项时触发',
                scrollInto: '当用户通过点击或拖拽让一个选项滚动到中间的选择区域时触发',
            },
            props: {
                disabled: '是否禁用',
                readonly: '是否为只读状态',
                title: '顶部栏标题',
                visibleOptionNum: '可见的选项个数',
            }
        },
        slider: {
            name: '滑块',
            event: {
                dragStart: '开始拖动时触发',
                dragEnd: '结束拖动时触发',
            },
            props: {
                disabled: '是否禁用',
                readonly: '是否为只读状态',
                range: '是否为范围选择',
                max: '最大值',
                min: '最小值',
                step: '步长',
            }
        },
        space: {
            name: '间距'
        },
        subForm: {
            name: '分组',
            props: {
                disabled: '是否禁用',
            }
        },
        switch: {
            name: '开关',
            props: {
                disabled: '是否禁用',
                activeColor: '打开时的背景色',
                inactiveColor: '关闭时的背景色',
                activeValue: '打开时对应的值',
                inactiveValue: '关闭时对应的值',
            }
        },
        tableForm: {
            name: '表格表单',
            props: {
                disabled: '是否禁用',
                filterEmptyColumn: '是否过滤空行的数据',
                max: '最多添加几行，为 0 则不限制',
            },
            batchImport: '批量导入',
            batchExport: '批量导出'
        },
        tableFormColumn: {
            name: '表格格子',
            label: '自定义名称',
            props: {
                label: '标题',
                width: '宽度',
                color: '颜色',
                required: '是否显示必填星号',
            }
        },
        text: {
            name: '文字',
            props: {
                formCreateTitle: '标题',
                formCreateChild: '内容'
            }
        },
        textarea: {
            name: '多行输入框',
        },
        timePicker: {
            name: '时间',
            props: {
                disabled: '是否禁用',
                clearable: '是否启用清除图标',
                columnsType: '选项类型',
                minTime: '可选的最小时间',
                maxTime: '可选的最大时间',
                title: '顶部栏标题',
                visibleOptionNum: '可见的选项个数',
                placeholder: '未选中时的提示文案',
            }
        },
        uploader: {
            name: '上传',
            info: '上传成功后，将接口返回的 URL 赋值给 file.url，或将返回结果赋值给 file.value，以便在后续的表单提交时获取这些数据。',
            event: {
                oversize: '文件大小超过限制时触发',
                clickUpload: '点击上传区域时触发',
                clickPreview: '点击预览图时触发',
                clickReupload: '点击覆盖上传时触发',
                closePreview: '关闭全屏图片预览时触发',
                'delete': '删除文件预览时触发'
            },
            props: {
                disabled: '是否禁用',
                action: '上传的地址(必填)',
                onSuccess: '上传成功回调',
                headers: '设置上传的请求头部',
                data: '上传时附带的额外参数',
                uploadName: '上传的文件字段名',
                maxCount: '文件上传数量限制',
                maxSize: '文件大小限制，单位为 byte',
                accept: '允许上传的文件类型',
            }
        },
        vanCellGroup: {
            name: '单元格',
            props: {
                title: '分组标题',
                inset: '是否展示为圆角卡片风格',
                border: '是否显示外边框',
            }
        },
        vanCell: {
            name: '单元格子',
            props: {
                title: '左侧标题',
                value: '右侧内容',
                label: '标题下方的描述信息',
                size: '尺寸',
                icon: '左侧图标名称或图片链接',
                url: '点击后跳转的链接地址',
                isLink: '是否展示右侧箭头并开启点击反馈',
                center: '是否使内容垂直居中',
            }
        },
        vanIcon: {
            name:'图标',
            props: {
                name: '图标名称或图片链接',
                dot: '是否显示图标右上角小红点',
                badge: '图标右上角徽标的内容',
                color: '图标颜色',
                size: '图标大小',
            }
        }
    },
    tmp: {
        duration: '时长',
        chineseAmount: '金额',
        col3: '三列栅格',
        col4: '四列栅格',
        table43: '4x3表格',
    }
};

export default ZhCn;

