const En = {
    name: 'en',
    form: {
        field: 'Field',
        title: 'Title',
        info: 'Info',
        control: 'Control',
        labelShow: 'Whether to display',
        labelStyle: 'Label style',
        formItem: 'Configure form item',
        row: 'Row',
        size: 'Form size',
        event: 'Form event',
        layout: 'Form layout',
        labelAlign: 'Label position',
        labelWrap: 'Allow labels to wrap',
        colon: 'Whether to display the colon after the label',
        labelCol: 'Label width',
        hideRequiredMark: 'Hide red asterisks next to labels for required fields',
        formItemMarginBottom: 'Bottom margin of form items',
        scrollToFirstError: 'Automatically scroll to the first error field if submission fails',
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
        beforeFetch: 'Triggered before remote data request is sent',
    },
    warning: {
        name: 'Unique identifier for the component, used to access and modify its configuration rules.',
        field: 'Field name for binding data to the component. Must start with a letter for proper recognition.',
        fetch: 'Loads remote data through requests, updating the component based on the returned result.',
        fetchQuery: 'Defines GET parameters for requests, passed via the URL.',
        fetchData: 'Defines POST parameters for requests, passed in the request body.',
        fetchDataType: 'Selects the data type for the request body to ensure correct format.',
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
        label: 'Label',
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
        click: 'Triggered when the component is clicked',
        add: 'Triggered when added',
        delete: 'Triggered when deleted',
        remove: 'Triggered when deleted',
        ok: 'Triggered when the OK button is clicked',
        pressEnter: 'Triggered when the Enter key is pressed',
        submit: 'Triggered when submitting table',
        confirm: 'Triggered when clicking confirm',
        validateFail: 'Triggered when table verification fails',
        beforeLoad: 'Triggered before initialization',
        loaded: 'Triggered after initialization is completed',
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
        data: 'Data',
        dataType: 'DataType',
        headers: 'Headers',
        query: 'Query',
        parse: 'Processing',
        response: 'Data returned by the interface',
        onError: 'onError',
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
            align: 'Align',
            height: 'line-height',
            spacing: 'letter-spacing',
            preview: 'Preview',
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
        circle: 'Circle',
        square: 'Square',
        image: 'Image',
        video: 'Video',
        audio: 'Audio',
        document: 'Document',
        link: 'Link',
        dashed: 'Dashed',
        info: 'Info',
        success: 'Success',
        error: 'Error',
        warning: 'Warning',
        primary: 'Primary',
        danger: 'Danger',
        form: 'Form',
        subform: 'Subform',
        other: 'Other',
        model: 'Model',
        field: 'Field',
        size: 'Size',
        variable: 'Variable',
        disabled: 'Disabled',
        enable: 'Enable',
        time: 'time',
        email: 'email',
        number: 'number',
        globalData: 'Global data',
        mobile: 'Mobile',
        reactive: 'Reactive',
        pc: 'Pc',
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
        large: 'Large',
        default: 'Default',
        middle: 'Middle',
        small: 'Small',
        always: 'Always',
        never: 'Never',
        hover: 'Hover',
        click: 'Click',
        button: 'Button',
        year: 'year',
        month: 'month',
        date: 'date',
        dates: 'dates',
        week: 'week',
        quarter: 'quarter',
        datetime: 'datetime',
        'datetime-local': 'datetime',
        datetimerange: 'datetimerange',
        daterange: 'daterange',
        monthrange: 'monthrange',
        left: 'left',
        right: 'right',
        top: 'top',
        bottom: 'bottom',
        text: 'text',
        icon: 'icon',
        picture: 'picture',
        'picture-card': 'picture-card',
        center: 'center',
        vertical: 'vertical',
        horizontal: 'horizontal',
        manage: 'Manage',
        key: 'key',
        name: 'Name',
        value: 'Value',
        inputData: 'Default value',
        append: 'Append',
        options: 'Options',
        option: 'Option',
        callback: 'Callback',
        _self: 'Current Window',
        _blank: 'New Window',
        _parent: 'Parent Window',
        _top: 'Top Window',
    },
    com: {
        cascader: {
            name: 'Cascader',
            event: {
                dropdownVisibleChange: 'Triggered when showing/hiding the floating layer',
                search: 'Listen for searches and return the input value',
            },
            props: {
                props: 'Options',
                placeholder: 'Placeholder',
                disabled: 'Disabled',
                allowClear: 'Whether to show clear button',
                multiple: 'Multiple',
                showSearch: 'Whether the option can be searched',
            },
        },
        checkbox: {
            name: 'Checkbox',
            props: {
                disabled: 'Disabled',
            }
        },
        col: {
            name: 'Col',
            info: 'Responsive layout configures multiple devices, with mobile automatically using the first one.',
            props: {
                span: 'Number of columns occupied by grid',
                offset: 'Number of spaces on the left side of the grid',
                push: 'Move the grid to the right by the number of cells',
                pull: 'Move the grid to the left by the number of cells'
            }
        },
        datePicker: {
            name: 'Date',
            props: {
                disabled: 'Disabled',
                bordered: 'Whether there is a border',
                picker: 'Type',
                inputReadOnly: 'The input box cannot be entered',
                showTime: 'Add time selection',
                allowClear: 'Whether to show clear button',
                placeholder: 'Placeholder content when selected',
                __startPlaceholder: 'Placeholder for the start date when selecting a range',
                __endPlaceholder: 'Placeholder for the end date when selecting a range',
                separator: 'Set the delimiter',
                format: 'The format displayed in the input box',
                valueFormat: 'Binding value format',
            }
        },
        dateRange: {
            name: 'DateRange',
            event: {
                calendarChange: 'Triggered when the selected date changes',
            }
        },
        timeRange: {
            name: 'TimeRange',
        },
        aAlert: {
            name: 'Alert',
            description: 'Description',
            props: {
                message: 'Title',
                type: 'Theme',
                description: 'Description',
                closable: 'Can it be closed?',
                banner: 'Whether to use as top announcement',
                closeText: 'Close button custom text',
                showIcon: 'Whether to display the icon',
            }
        },
        aButton: {
            name: 'Button',
            props: {
                formCreateChild: 'Content',
                size: 'Size',
                type: 'Type',
                shape: 'Shape',
                ghost: 'Ghost',
                danger: 'Danger',
                block: 'Automatically expand the button width',
                loading: 'Loading status',
                disabled: 'Disabled',
            }
        },
        aCard: {
            name: 'Card',
            props: {
                title: 'Title',
                size: 'Size',
                type: 'Type',
                hoverable: 'Float when mouse moves over',
            }
        },
        aCollapse: {
            name: 'Collapse',
            event: {
                change: 'Triggered when switching panels',
            },
            props: {
                accordion: 'Whether to use accordion mode',
                bordered: 'Collapsed panel with border style',
                ghost: 'Make the accordion transparent and borderless',
            }
        },
        aCollapsePanel: {
            name: 'CollapseItem',
            props: {
                header: 'Header',
                key: 'Key',
                disabled: 'Disabled',
                showArrow: 'Whether to display the arrow on the current panel',
            }
        },
        aDivider: {
            name: 'Divider',
            props: {
                type: 'Dividing line direction',
                formCreateChild: 'Title',
                orientation: 'Position',
                plain: 'Whether the text is displayed as normal text style',
                dashed: 'Is it a dotted line?',
            }
        },
        aTabPane: {
            name: 'TabPane',
            props: {
                tab: 'Title',
                disabled: 'Disabled',
                key: 'Key',
            }
        },
        aTabs: {
            name: 'Tabs',
            event: {
                change: 'Triggered when switching panels',
                tabClick: 'Triggered when a tab is selected',
                edit: 'Triggered after clicking the add or remove button of the tab',
            },
            props: {
                type: 'Type',
                tabPosition: 'Tab position',
                centered: 'Labels are displayed in the center'
            }
        },
        aTag: {
            name: 'Tag',
            props: {
                formCreateNative: 'Whether to display title',
                formCreateTitle: 'Title',
                formCreateChild: 'Content',
                closable: 'Whether it can be closed',
                bordered: 'Whether there is a border',
                color: 'Background color'
            }
        },
        aTransfer: {
            name: 'Transfer',
            event: {
                search: 'Triggered when the search box content changes',
                selectChange: 'Triggered when the selected item changes',
            },
            props: {
                oneWay: 'Display as one-way style',
                pagination: 'Using Pagination Styles',
                showSearch: 'Whether to display the search box',
                showSelectAll: 'Whether to display the select all checkbox',
                filterPlaceholder: 'Search box placeholder',
                titles: 'Title',
            }
        },
        aTreeSelect: {
            name: 'TreeSelect',
            event: {
                check: 'Triggered when a tree node is selected or the input value changes',
                treeExpand: 'Called when a tree node is expanded',
                select: 'Click on the tree node to trigger',
            },
            props: {
                multiple: 'Whether there are multiple selections',
                disabled: 'Disabled',
                allowClear: 'Is it possible to clear the options?',
                showSearch: 'Display search box in drop-down (only works in single selection mode)',
                treeCheckable: 'Show multiple selection box',
                fieldNames: 'Configuration options',
                treeDefaultExpandAll: 'Whether to expand all nodes by default',
                treeLine: 'Whether to display line style',
            }
        },
        aImage: {
            name: 'Image',
            props: {
                src: 'Image path',
                preview: 'Enable preview',
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
                justify: 'Horizontal arrangement',
                align: 'Vertical arrangement'
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
                formCreateNative: 'Whether to display title',
                formCreateTitle: 'Title',
                formCreateChild: 'Content',
            }
        },
        input: {
            name: 'Input',
            event: {
                change: 'Triggered when the input box content changes',
            },
            props: {
                type: 'Type',
                maxlength: 'Maximum input length',
                minlength: 'Minimum input length',
                placeholder: 'Placeholder',
                allowClear: 'Whether to display the clear button',
                bordered: 'Whether there is a border',
                showCount: 'Whether to display word count',
                disabled: 'Disabled',
                autoSize: 'Adaptive content height',
            }
        },
        inputNumber: {
            name: 'InputNumber',
            event: {
                step: 'Triggered when clicking the up and down arrows',
            },
            props: {
                precision: 'Precision of input value',
                min: 'Set the minimum value allowed for the counter',
                max: 'Set the maximum allowed value of the counter',
                step: 'Step',
                disabled: 'Disabled',
                controls: 'Whether to use control buttons',
                bordered: 'Whether there is a border',
                placeholder: 'Placeholder'
            }
        },
        password: {
            name: 'Password',
            event: {
                change: 'Triggered when the input box content changes',
            },
            props: {
                disabled: 'Disabled',
                maxlength: 'Maximum input length',
                minlength: 'Minimum input length',
                placeholder: 'Placeholder',
                showCount: 'Whether to display word count',
                visibilityToggle: 'Whether to display the switch button or control the password display',
                allowClear: 'Whether to display the clear button',
                bordered: 'Whether there is a border',
            }
        },
        radio: {
            name: 'Radio',
            props: {
                input: 'Whether to fill in',
                disabled: 'Disabled',
                optionType: 'Option Type',
            }
        },
        rate: {
            name: 'Rate',
            props: {
                count: 'Maximum score',
                disabled: 'Disabled',
                allowClear: 'Whether to allow clearing after clicking again',
                allowHalf: 'Whether to allow half selection',
            }
        },
        select: {
            name: 'Select',
            event: {
                search: 'Triggered when the text box value changes',
                select: 'Called when selected',
            },
            modeOpt: {
                multiple: 'Multiple',
                tags: 'Tags',
                combobox: 'Combobox',
            },
            props: {
                disabled: 'Disabled',
                allowClear: 'Is it possible to clear the options?',
                placeholder: 'Placeholder',
                bordered: 'Whether there is a border',
                mode: 'Mode',
            }
        },
        slider: {
            name: 'Slider',
            props: {
                min: 'Minimum value',
                max: 'Maximum value',
                disabled: 'Disabled',
                step: 'Step',
                dots: 'Whether to display breakpoints',
                range: 'Whether it is a range selection',
                vertical: 'Whether portrait mode',
            }
        },
        space: {
            name: 'Space'
        },
        subForm: {
            name: 'Group',
            props: {
                disabled: 'Disabled',
                syncDisabled: 'Whether to force synchronization of the disabled state with the subform'
            }
        },
        switch: {
            name: 'Switch',
            props: {
                disabled: 'Disabled',
                checkedChildren: 'Text description when opening',
                unCheckedChildren: 'Text description when closing',
                checkedValue: 'Value when opening',
                unCheckedValue: 'Value when closed',
            }
        },
        tableForm: {
            name: 'TableForm',
            props: {
                disabled: 'Disabled',
                filterEmptyColumn: 'Whether to filter empty rows',
                max: 'Maximum number of rows to add, if 0, there is no limit',
            }
        },
        tableFormColumn: {
            name: 'TableFormColumn',
            label: 'TableFormColumn',
            props: {
                label: 'Title',
                width: 'Width',
                color: 'Color',
                required: 'Whether to display required asterisks',
            }
        },
        text: {
            name: 'Text',
            props: {
                formCreateNative: 'Whether to display title',
                formCreateTitle: 'Title',
                formCreateChild: 'Content'
            }
        },
        textarea: {
            name: 'Textarea',
        },
        timePicker: {
            name: 'Time',
            'HH:mm:ss': 'HH:mm:ss',
            'HH:mm': 'HH:mm',
            props: {
                __format: 'Format',
                disabled: 'Disabled',
                inputReadOnly: 'The input box cannot be entered',
                allowClear: 'Whether to display the clear button',
                hourStep: 'Hour Option Interval',
                minuteStep: 'Minutes option interval',
                secondStep: 'Seconds option interval',
                placeholder: 'Placeholder content when selected',
                __startPlaceholder: 'Placeholder for the start date when selecting a range',
                __endPlaceholder: 'Placeholder for the end date when selecting a range',
                bordered: 'Whether there is a border',
            }
        },
        tree: {
            name: 'Tree',
            event: {
                check: 'Click on the checkbox to trigger',
                expand: 'Triggered when expanding/collapsed a node',
                rightClick: 'Respond to right click',
                select: 'Click on the tree node to trigger',
            },
            props: {
                fieldNames: 'Configuration options',
                showLine: 'Whether to display the connection line',
                defaultExpandAll: 'Whether to expand all nodes by default',
            }
        },
        upload: {
            name: 'Upload',
            info: 'After a successful upload, assign the returned URL to file.url or the result to file.value for use in subsequent form submissions.',
            event: {
                download: 'Triggered when a file is downloaded',
                preview: 'Triggered when a file link or preview icon is clicked',
                remove: 'Triggered when a file is removed from the file list',
            },
            props: {
                listType: 'Upload type',
                multiple: 'Whether multiple selection of files is supported',
                action: 'Upload address (required)',
                beforeUpload: 'Hook before uploading file',
                onSuccess: 'Upload success callback',
                headers: 'Set upload request headers',
                data: 'Extra parameters attached when uploading',
                name: 'Uploaded file field name',
                withCredentials: 'Support sending cookie credential information',
                accept: 'Accept uploaded file types',
                customRequest: 'Custom upload behavior',
                disabled: 'Disabled',
                maxCount: 'Maximum number of uploads allowed'
            }
        },
    },
};

export default En;

