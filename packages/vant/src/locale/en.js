const En = {
    name: 'en',
    form: {
        field: 'Field',
        title: 'Title',
        info: 'Info',
        control: 'Control',
        labelAlign: 'Label position',
        inputAlign: 'Input position',
        labelStyle: 'Label style',
        colon: 'Whether to add a colon after the label',
        size: 'Form size',
        event: 'Form event',
        labelWidth: 'Label width',
        hideRequiredAsterisk: 'Hide the red asterisk next to the label of a required field',
        showMessage: 'Display verification error message',
        inlineMessage: 'Display validation information inline',
        submitBtn: 'Whether to display the form submit button',
        resetBtn: 'Whether to display the form reset button',
        appendChild: 'Insert child',
        formMode: 'Form mode',
        formName: 'Form name',
        componentMode: 'Component',
        htmlMode: 'HTML',
        document: 'Document',
        controlDocument: 'Need more detailed configuration methods? Please view {doc}',
        onSubmit: 'Triggered when form is submitted',
        onReset: 'Triggered after form is reset',
        onCreated: 'Triggered after the form component is initialized',
        onMounted: 'Triggered after the form component is mounted',
        onReload: 'Triggered after the form rendering rule is reloaded',
        onChange: 'Triggered when the component value changes',
        beforeSubmit: 'Triggered when form validation passed',
        beforeFetch: 'Triggered before remote data request is sent',
    },
    warning: {
        name: 'Unique identifier for the component, used to access and modify its configuration rules.',
        field: 'Field name for binding data to the component. Must start with a letter for proper recognition.',
        fetch: 'Loads remote data through requests, updating the component based on the returned result.',
        fetchQuery: 'Defines GET parameters for requests, passed via the URL.',
        fetchData: 'Defines POST parameters for requests, passed in the request body.',
        fetchDataType: 'Selects the data type for the request body to ensure correct format.',
        beforeFetch: 'Before the request is sent, you can modify the parameters via a handler. Return false or a rejected Promise to cancel the request.',
        fetchParse: 'Processes the response data after the request and converts it into the required structure.',
        language: 'Manages multilingual data, allowing easy language switching for content display.',
    },
    computed: {
        fieldUsed: '[{label}] Is used in the calculation formula, please modify the corresponding formula first',
        fieldExist: '[{label}] Field already exists',
        fieldEmpty: 'Field is required',
        fieldChar: 'Field must begin with a letter',
    },
    validate: {
        type: 'Type',
        typePlaceholder: 'Please select',
        trigger: 'Trigger',
        mode: 'Verification method',
        modes: {
            required: 'required',
            notRequired: 'Not required',
            pattern: 'pattern',
            validator: 'validator',
            min: 'min',
            max: 'max',
            len: 'length',
        },
        types: {
            string: 'String',
            boolean: 'Boolean',
            array: 'Multiple',
            number: 'Number',
            integer: 'Integer',
            float: 'Float',
            object: 'Collection',
            date: 'Date',
            url: 'Url',
            email: 'Email',
        },
        message: 'Error',
        auto: 'Automatic',
        autoRequired: 'Please enter {title}',
        autoMode: 'Please enter the correct {title}',
        requiredPlaceholder: 'Please enter',
        required: 'Is it required',
        rule: 'Validation',
    },
    tableOptions: {
        handle: 'Operation',
        add: 'Add',
        empty1: 'Click the lower right corner',
        empty2: 'Button to add a column',
        rmCol: 'Delete current column',
        rmRow: 'Delete current row',
        batchRmCol: 'Delete columns',
        batchRmRow: 'Delete rows',
        batchSplit: 'Split cells',
        batchMerge: 'Merge cells',
        splitRow: 'Split into rows',
        splitCol: 'Split into columns',
        mergeBottom: 'Merge downward',
        mergeRight: 'Merge right',
        addTop: 'Add top column',
        addBottom: 'Add the following',
        addLeft: 'Add left column',
        addRight: 'Add right column',
        keyValue: 'key-value',
    },
    struct: {
        title: 'Edit',
        only: '[{label}] Only one allowed to be added',
        errorMsg: 'The input content is syntactically incorrect',
        configured: 'Configured',
    },
    event: {
        title: 'Edit',
        create: 'Create',
        list: 'List',
        placeholder: 'Please enter the name of the event',
        saveMsg: 'Please save the event currently being edited',
        type: 'Type',
        info: 'Info',
        inject: {
            api: 'API of current form',
            rule: 'Generate rules for the current form',
            self: 'Component generation rule',
            option: 'Form configuration',
            args: 'Original parameters of event',
        }
    },
    eventInfo: {
        blur: 'Triggered when focus is lost',
        focus: 'Triggered when focus is obtained',
        change: 'Triggered when the binding value changes',
        input: 'Trigger when value changes',
        clear: 'Triggered when the clear button is clicked',
        close: 'Triggered when the component is closed',
        click: 'Fires when the component is clicked',
        add: 'Trigger when added',
        delete: 'Triggered when deleted',
        visibleChange: 'Triggered when the drop-down box appears/hides',
        calendarChange: 'Triggered when the selected date in the calendar changes',
        panelChange: 'Fires when the date panel changes',
        open: 'Triggered when opening',
        opened: 'Triggered when opening animation ends',
        closed: 'Triggered when closing animation ends',
        openAutoFocus: 'Triggered when entering focus on content',
        closeAutoFocus: 'Triggered when entering focus from content',
        submit: 'Triggered when submitting table',
        cancel: 'Triggered when the cancel button is clicked',
        confirm: 'Triggered when clicking confirm',
        validateFail: 'Triggered when table verification fails',
        hook_load: 'Triggered after component rules are loaded',
        hook_mounted: 'Triggered after component is mounted',
        hook_deleted: 'Triggered after component rules are removed',
        hook_watch: 'Triggered after component rules change',
        hook_value: 'Triggered after component value changes',
        hook_hidden: 'Triggered after component display status changes',
    },
    fetch: {
        title: 'Set data',
        create: 'Create data',
        config: 'Request',
        action: 'Action',
        actionRequired: 'Please enter the correct link',
        placeholder: 'Please enter the name of the data source',
        method: 'Method',
        data: 'Attached',
        dataType: 'DataType',
        headers: 'Headers',
        query: 'Query',
        parse: 'Processing',
        response: 'Data returned by the interface',
        onError: 'onError',
        beforeFetch: 'Before',
        remote: 'Remote',
        static: 'Static',
        optionsType: {
            fetch: 'Fetch',
            struct: 'Static',
        }
    },
    style: {
        width: 'Width',
        height: 'Height',
        color: 'Color',
        backgroundColor: 'Background color',
        margin: 'Margin',
        padding: 'Padding',
        borderRadius: 'Border radius',
        border: 'Border',
        solid: 'Solid',
        dashed: 'Dashed',
        dotted: 'Dotted',
        double: 'Double',
        opacity: 'Opacity',
        scale: 'Scale',
        minWidth: 'Min Width',
        minHeight: 'Min Height',
        maxWidth: 'Max Width',
        maxHeight: 'Max Height',
        overflow: {
            name: 'Overflow',
            visible: 'Visible',
            hidden: 'Hidden',
            scroll: 'Scroll',
            auto: 'Auto scroll after overflow',
        },
        shadow: {
            name: 'Shadow',
            x: 'x-axis offset',
            y: 'y-axis offset',
            vague: 'blurred radius',
            extend: 'diffusion radius',
            inset: 'inward',
            external: 'outward',
            mode: 'Mode',
            classic: 'Classic',
            flat: 'Flat',
            solid: 'Stereoscopic',
        },
        font: {
            name: 'Font',
            size: 'Size',
            family: 'Family',
            align: 'Align',
            height: 'line-height',
            spacing: 'letter-spacing',
            preview: 'Preview',
        },
        family: {
            'Microsoft YaHei': 'Microsoft YaHei',
            SimSun: 'SimSun',
            SimHei: 'SimHei',
            KaiTi: 'KaiTi',
            FangSong: 'FangSong',
            LiSu: 'LiSu',
        },
        decoration: {
            name: 'Decoration',
            underline: 'underline',
            'line-through': 'line-through',
            overline: 'overline',
        },
        weight: {
            name: 'font-weight',
            300: 'Fine',
            400: 'Default',
            500: 'Medium',
            700: 'Bold',
        }
    },
    designer: {
        component: 'Component',
        id: 'Unique id',
        name: 'Serial number',
        type: 'Type',
        form: 'Form',
        json: 'Rule',
        style: 'Style',
        rule: 'Basis',
        advanced: 'Advanced',
        props: 'Props',
        customProps: 'Custom props',
        validate: 'Validate',
        event: 'Event',
        clearWarn: 'It cannot be restored after clearing it. Are you sure you want to clear it? ',
        childEmpty: 'Click the \\e789  button in the lower right corner to add a column',
        dragEmpty: 'Drag the components from the list on the left here',
        unload: 'Are you sure you want to leave the current page?',
        comList: 'Component',
    },
    language: {
        name: 'Language',
        add: 'Add',
        batchRemove: 'Batch Deletion',
        select: 'Select language',
    },
    menu: {
        main: 'Basic',
        aide: 'Auxiliary',
        layout: 'Layout',
        component: 'Component',
        subform: 'Subform',
        tree: 'Structure'
    },
    props: {
        field: 'Field',
        disabled: 'disabled',
        notDisabled: 'Not disabled',
        time: 'time',
        size: 'Size',
        email: 'email',
        number: 'number',
        globalData: 'Global data',
        title: 'Title',
        content: 'Content',
        collection: 'Collection',
        group: 'Group',
        custom: 'Custom',
        change: 'Change',
        blur: 'Blur',
        preview: 'Preview',
        clear: 'Clear',
        cancel: 'Cancel',
        close: 'Close',
        ok: 'Ok',
        save: 'Save',
        refresh: 'Refresh',
        submit: 'Submit',
        reset: 'Reset',
        copy: 'Copy',
        delete: 'Delete',
        hide: 'Hidden',
        show: 'Show',
        position: 'Position',
        render: 'Render',
        large: 'large',
        medium: 'medium',
        default: 'default',
        small: 'small',
        mini: 'mini',
        always: 'always',
        single: 'single',
        multiple: 'multiple',
        range: 'range',
        never: 'never',
        hover: 'hover',
        click: 'click',
        button: 'button',
        year: 'year',
        month: 'month',
        day: 'day',
        hour: 'hour',
        minute: 'minute',
        second: 'second',
        date: 'date',
        dates: 'dates',
        week: 'week',
        datetime: 'datetime',
        'datetime-local': 'datetime',
        datetimerange: 'datetimerange',
        daterange: 'daterange',
        monthrange: 'monthrange',
        left: 'left',
        right: 'right',
        top: 'top',
        bottom: 'bottom',
        round: 'round',
        card: 'card',
        line: 'line',
        text: 'text',
        picture: 'picture',
        'picture-card': 'picture-card',
        center: 'center',
        vertical: 'vertical',
        horizontal: 'horizontal',
        manage: 'Manage',
        key: 'key',
        name: 'Name',
        value: 'value',
        inputData: 'Default value',
        append: 'Append',
        options: 'Options',
        option: 'Option',
        closeable: 'closeable',
        link: 'link',
        style: 'Style',
        _self: 'Current Window',
        _blank: 'New Window',
        _parent: 'Parent Window',
        _top: 'Top Window',
    },
    com: {
        cascader: {
            name: 'Cascader',
            event: {
                finish: 'Triggered after all options are selected',
                clickTab: 'Triggered when clicking a tab'
            },
            props: {
                title: 'Top title',
                placeholder: 'Input box placeholder text',
                disabled: 'Disabled',
                activeColor: 'Highlight color of the selected state',
                clearable: 'Whether to enable the clear icon',
            },
        },
        checkbox: {
            name: 'Checkbox',
            props: {
                disabled: 'Disabled',
                max: 'The maximum number of checkboxes that can be checked',
                checkedColor: 'The color of all checkboxes when they are checked',
                direction: 'Arrangement direction'
            }
        },
        col: {
            name: 'Col',
            props: {
                span: 'The number of columns occupied by the grid',
                offset: 'The number of grids on the left side of the grid',
            }
        },
        datePicker: {
            name: 'Date',
            props: {
                disabled: 'Disabled',
                clearable: 'Whether to enable the clear icon',
                columnsType: 'Option type',
                minDate: 'Minimum available time',
                maxDate: 'Maximum available time',
                title: 'Top bar title',
                visibleOptionNum: 'Number of visible options',
                placeholder: 'Prompt text when unselected',
            }
        },
        calendar: {
            name: 'Calendar',
            event: {
                select: 'Triggered when any date is clicked and selected',
                unselect: 'Triggered when the calendar component\'s type is multiple, when the date is unselected',
                monthShow: 'Triggered when a month enters the visible area',
                overRange: 'Triggered when the range selection exceeds the maximum number of days available',
                clickSubtitle: 'Triggered when clicking the calendar subtitle',
                clickDisabledDate: 'Triggered when clicking the disabled date',
            },
            switchMode: {
                none: 'Do not display',
                month: 'Switch by month',
                'year-month': 'Switch by year and switch by month',
            },
            props: {
                disabled: 'Disabled',
                type: 'Option type',
                switchMode: 'Switch mode',
                title: 'Calendar title',
                minDate: 'Minimum selectable time',
                maxDate: 'Maximum selectable time',
                placeholder: 'Prompt text when not selected',
                clearable: 'Whether to enable the clear icon',
            }
        },
        calendarRange: {
            name: 'dateRange',
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
            name: 'Notice',
            description: 'Notification text',
            event: {
                replay: 'Triggered every time the scroll bar starts scrolling again'
            },
            props: {
                mode: 'Notification bar mode',
                text: 'Notification text content',
                color: 'Notification text color',
                background: 'Scroll bar background',
                speed: 'Scrolling speed',
                scrollable: 'Whether to enable scrolling, enabled by default when the content length overflows',
                wrapable: 'Whether to enable text wrapping, only effective when scrolling is disabled',
            }
        },
        vanButton: {
            name: 'Button',
            props: {
                formCreateChild: 'Content',
                size: 'Size',
                type: 'Type',
                color: 'Button color',
                block: 'Is it a block-level element',
                square: 'Is it a square button',
                round: 'Is it a round button',
                disabled: 'Is the button disabled',
            }
        },
        vanCollapse: {
            name: 'Collapse',
            event: {
                change: 'Triggered when switching panels',
            },
            props: {
                accordion: 'Whether accordion mode'
            }
        },
        vanCollapseItem: {
            name: 'CollapseItem',
            props: {
                title: 'Content on the left side of the title bar',
                name: 'Unique identifier',
                value: 'Content on the right side of the title bar',
                label: 'Title bar description information',
                disabled: 'Whether to disable the panel',
            }
        },
        vanDivider: {
            name: 'Divider',
            props: {
                vertical: 'Whether to use vertical',
                formCreateChild: 'Set the dividing line text',
                dashed: 'Whether to use dashed line',
                contentPosition: 'Content position'
            }
        },
        vanTab: {
            name: 'Tab',
            props: {
                title: 'Tab title',
                disabled: 'Disabled',
                name: 'Tab identifier',
            }
        },
        vanTabs: {
            name: 'Tabs',
            event: {
                clickTab: 'Trigger when clicking on a tab',
                rendered: 'Trigger when the tab content is first rendered (only triggered after delayed rendering is turned on)',
                scroll: 'Trigger when scrolling, only works in sticky mode'
            },
            props: {
                type: 'Style type',
                color: 'Tag theme color',
                background: 'Tab bar background color',
                sticky: 'Whether to use sticky layout',
                swipeable: 'Whether to enable gesture swipe left and right',
                scrollspy: 'Whether to enable scroll navigation',
                titleActiveColor: 'Title selected state color',
                titleInactiveColor: 'Title default state color',
            }
        },
        vanTag: {
            name: 'Tag',
            props: {
                formCreateTitle: 'Title',
                formCreateChild: 'Tag content',
                type: 'Tag type',
                size: 'Tag size',
                color: 'Tag color',
                plain: 'Whether it is hollow style',
                round: 'Whether it is rounded style',
                textColor: 'Text color',
            }
        },
        vanImage: {
            name: 'Image',
            props: {
                src: 'Image path'
            }
        },
        fcCell: {
            name: 'Cell'
        },
        fcTitle: {
            name: 'Title',
            props: {
                title: 'Title',
                size: 'Size',
                align: 'Align'
            }
        },
        fcEditor: {
            name: 'Editor',
            props: {
                disabled: 'Disabled'
            }
        },
        fcRow: {
            name: 'Row',
            props: {
                gutter: 'Grid interval',
                justify: 'Horizontal alignment',
                align: 'Vertical alignment'
            }
        },
        fcTable: {
            name: 'Table',
            props: {
                border: 'Whether to display border',
                borderColor: 'Border color',
                borderWidth: 'Border width'
            }
        },
        fcTableGrid: {
            name: 'Grid',
        },
        signaturePad: {
            name: 'Signature',
            props: {
                penColor: 'Line color',
                disabled: 'Disabled',
            }
        },
        group: {
            name: 'Subform',
            props: {
                disabled: 'Disabled',
                syncDisabled: 'Whether to force synchronization of the disabled state with the subform',
                expand: 'Set the default expansion items',
                button: 'Whether to display the operation button',
                sortBtn: 'Whether to display the sort button',
                min: 'Set the minimum number of items to add',
                max: 'Set the maximum number of items to add',
            }
        },
        html: {
            name: 'HTML',
            props: {
                formCreateTitle: 'Title',
                formCreateChild: 'Content',
            }
        },
        input: {
            name: 'Input',
            props: {
                type: 'Type',
                disabled: 'Disable',
                readonly: 'Readonly',
                placeholder: 'Input box placeholder prompt text',
                maxlength: 'The maximum number of characters to enter',
                showWordLimit: 'Whether to display word count',
                clearable: 'Whether to enable the clear icon',
                autosize: 'Whether to adapt to the content height',
                rows: 'Number of input box rows',
            }
        },
        stepper: {
            name: 'Stepper',
            event: {
                overlimit: 'Triggered when clicking an unavailable button',
                plus: 'Triggered when clicking the increase button',
                minus: 'Triggered when clicking the decrease button',
            },
            props: {
                min: 'Minimum value',
                max: 'Maximum value',
                step: 'Step length',
                decimalLength: 'Fixed number of decimal places displayed',
                theme: 'Style',
                placeholder: 'Input box placeholder prompt text',
                integer: 'Is only integer allowed to be entered',
                disabled: 'Disabled',
            }
        },
        password: {
            name: 'Password',
        },
        radio: {
            name: 'Radio',
            props: {
                disabled: 'Disabled',
                max: 'Maximum selectable number, 0 means unlimited',
                checkedColor: 'Checked color of all checkboxes',
                direction: 'Arrangement direction',
            }
        },
        rate: {
            name: 'Rate',
            props: {
                count: 'Maximum score',
                disabled: 'Disabled',
                readonly: 'Readonly',
                allowHalf: 'Is it allowed to be half-selected',
                color: 'Color when selected',
                voidColor: 'Color when unselected',
            }
        },
        select: {
            name: 'Select',
            event: {
                clickOption: 'Triggered when clicking an option',
                scrollInto: 'Triggered when the user clicks or drags an option to scroll to the middle selection area',
            },
            props: {
                disabled: 'Disabled',
                placeholder: 'Input box placeholder text',
                readonly: 'Readonly',
                title: 'Top bar title',
                visibleOptionNum: 'Number of visible options',
            }
        },
        slider: {
            name: 'Slider',
            event: {
                dragStart: 'Trigger when dragging starts',
                dragEnd: 'Trigger when dragging ends',
            },
            props: {
                disabled: 'Disabled',
                readonly: 'Readonly',
                range: 'Range selection',
                max: 'Maximum value',
                min: 'Minimum value',
                step: 'Step length',
            }
        },
        space: {
            name: 'Space'
        },
        subForm: {
            name: 'Group',
            props: {
                disabled: 'Disabled',
            }
        },
        switch: {
            name: 'Switch',
            props: {
                disabled: 'Disabled',
                activeColor: 'Background color when turned on',
                inactiveColor: 'Background color when turned off',
                activeValue: 'Value when turned on',
                inactiveValue: 'Value when turned off',
            }
        },
        tableForm: {
            name: 'TableForm',
            props: {
                disabled: 'Disabled',
                filterEmptyColumn: 'Whether to filter empty rows',
                max: 'Maximum number of rows to add, if 0, there is no limit',
                min: 'Minimum number of rows to add',
                addable: 'Allow to add',
                deletable: 'Allow delete',
            }
        },
        tableFormColumn: {
            name: 'TableFormColumn',
            label: 'TableFormColumn',
            props: {
                align: 'Align',
                label: 'Title',
                width: 'Width',
                color: 'Color',
                required: 'Whether to display required asterisks',
            }
        },
        text: {
            name: 'Text',
            props: {
                formCreateTitle: 'Title',
                formCreateChild: 'Content'
            }
        },
        textarea: {
            name: 'Textarea',
        },
        timePicker: {
            name: 'Time',
            props: {
                disabled: 'Disabled',
                clearable: 'Whether to enable the clear icon',
                columnsType: 'Option type',
                minTime: 'Optional minimum time',
                maxTime: 'Optional maximum time',
                title: 'Top bar title',
                visibleOptionNum: 'Visible number of options',
                placeholder: 'Prompt text when not selected',
            }
        },
        uploader: {
            name: 'Uploader',
            info: 'After a successful upload, assign the returned URL to file.url or the result to file.value for use in subsequent form submissions.',
            event: {
                oversize: 'Trigger when the file size exceeds the limit',
                clickUpload: 'Trigger when clicking the upload area',
                clickPreview: 'Trigger when clicking the preview image',
                clickReupload: 'Trigger when clicking to overwrite the upload',
                closePreview: 'Trigger when closing the full-screen image preview',
                'delete': 'Trigger when deleting the file preview'
            },
            props: {
                disabled: 'Whether to disable',
                action: 'Upload address (required)',
                onSuccess: 'Upload success callback',
                beforeDelete: 'Callback before file deletion',
                headers: 'Set the upload request header',
                data: 'Additional parameters attached to the upload',
                uploadName: 'Uploaded file field name',
                maxCount: 'File upload limit',
                maxSize: 'File size limit, unit is byte',
                accept: 'File types allowed to be uploaded',
            }
        },
        vanCellGroup: {
            name: 'CellGroup',
            props: {
                title: 'Title',
                inset: 'Whether to display as rounded card style',
                border: 'Whether to display outer border',
            }
        },
        vanCell: {
            name: 'Cell',
            props: {
                title: 'Title',
                value: 'Content',
                label: 'Description information below the title',
                icon: 'Left icon name or image link',
                url: 'Click to jump to the link address',
                isLink: 'Whether to display the right arrow and enable click feedback',
                center: 'Whether to vertically center the content',
            }
        },
        vanIcon: {
            name: 'Icon',
            props: {
                name: 'Icon name or image link',
                dot: 'Whether to display the small red dot in the upper right corner of the icon',
                badge: 'Content of the logo in the upper right corner of the icon',
                color: 'Icon color',
                size: 'Icon size',
            }
        }
    },
    tmp: {
        duration: 'duration',
        chineseAmount: 'chineseAmount',
        col3: '3-Col',
        col4: '4-Col',
        table43: '4x3Table',
    }
};

export default En;

