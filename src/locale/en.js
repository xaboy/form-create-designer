const En = {
    name: 'en',
    form: {
        field: 'Field',
        title: 'Title',
        info: 'Info',
        control: 'Control',
        clear: 'Clear',
        refresh: 'Refresh',
        labelPosition: 'Label position',
        size: 'Form size',
        labelWidth: 'Label width',
        hideRequiredAsterisk: 'Hide the red asterisk next to the label for required fields',
        showMessage: 'Display verification error message',
        inlineMessage: 'Display validation information inline',
        submitBtn: 'Whether to display the form submit button',
        resetBtn: 'Whether to display the form reset button',
        submit: 'Submit',
        reset: 'Reset',
    },
    validate: {
        type: 'Value type',
        typePlaceholder: 'Please select',
        trigger: 'Trigger mode',
        mode: 'Verification method',
        modes: {
            required: 'required',
            pattern: 'regular expression',
            min: 'minimum value',
            max: 'maximum value',
            len: 'length',
        },
        message: 'Error message',
        auto: 'Get automatically',
        autoRequired: 'Please enter {title}',
        autoMode: 'Please enter the correct {title}',
        requiredPlaceholder: 'Please enter a prompt',
    },
    tableOptions: {
        handle: 'Delete',
        add: 'Add',
    },
    struct: {
        title: 'Edit Data',
        submit: 'OK',
        cancel: 'Cancel',
        error: 'The format of the input content is incorrect',
    },
    fetch: {
        action: 'Action',
        actionRequired: 'Please data action',
        method: 'Method',
        dataType: 'Date type',
        data: 'Attached data',
        headers: 'Headers',
        parse: 'Analysis function',
        parseInfo: 'Parse the interface data and return the data structure required by the component',
        parseValidate: 'Please enter the correct parsing function',
    },
    designer: {
        preview: 'Preview',
        clear: 'Clear',
        clearConfirm: 'Clear',
        clearCancel: 'Cancel',
        clearConfirmTitle: 'It will not be restored after cleared, are you sure you want to clear it? ',
        config: {
            component: 'Component',
            form: 'Form',
            rule: 'Basic',
            props: 'Property',
            validate: 'Verify',
        },
    },
    menu: {
        main: 'Form',
        aide: 'Auxiliary',
        layout: 'Layout',
    },
    props: {
        required: 'Is it required',
        options: 'Option data',
        option: 'Option',
        optionsType: {
            json: 'JSON',
            fetch: 'Fetch',
            struct: 'Struct',
        }
    },
    components: {
        group: {
            name: 'Subform',
            props: {
                disabled: 'Whether to disable',
                syncDisabled: 'Force synchronization of disabled status with subform',
                expand: 'Set default expansion options',
                button: 'The operation button displayed',
                sortBtn: 'The sorting button displayed',
                min: 'Minimum number of items to add',
                max: 'How many items can be added at most',
                mode: 'Mode',
                modeOpts: {
                    subform: 'SubForm',
                    group: 'Group'
                }
            }
        },
        radio: {
            name: 'Radio',
            props: {
                disabled: 'Whether to disable',
                type: 'Button form',
                textColor: 'The text color of the radio when the button is activated',
                fill: 'The fill color and border color when the radio in the button form is activated'
            }
        },
        checkbox: {
            name: 'Checkbox',
            props: {
                type: 'Button type',
                disabled: 'Whether to disable',
                min: 'The minimum number of checkboxes that can be checked',
                max: 'The maximum number of checkboxes that can be checked',
                textColor: 'The text color of the checkbox in the button form when it is activated',
                fill: 'The fill color and border color of the checkbox in the button form when it is activated'
            }
        },
        input: {
            name: 'Input',
            props: {
                type: 'Type',
                maxlength: 'Maximum input length',
                minlength: 'Minimum input length',
                showWordLimit: 'Whether to display input word count statistics',
                placeholder: 'Input box placeholder text',
                clearable: 'Whether it can be cleared',
                showPassword: 'Whether to display the switch password icon',
                disabled: 'Disabled',
                prefixIcon: 'Input box head icon',
                suffixIcon: 'Input box tail icon',
                rowsInfo: 'Only works when type is \'textarea\'',
                rows: 'Number of input box rows',
                autocomplete: 'Autocomplete',
                readonly: 'Whether read-only',
                resize: 'Whether the control can be zoomed by the user',
                autofocus: 'Automatically acquire focus'
            }
        },
        inputNumber: {
            name: 'Number',
            props: {
                min: 'Set the minimum value allowed by the counter',
                max: 'Set the maximum value allowed by the counter',
                step: 'Counter step size',
                stepStrictly: 'Whether only multiples of step can be entered',
                disabled: 'Whether to disable the counter',
                controls: 'Whether to use the control button',
                controlsPosition: 'Control button position',
                placeholder: 'Input box default placeholder'
            }
        },
        select: {
            name: 'Select',
            props: {
                multiple: 'Whether to choose multiple',
                disabled: 'Whether to disable',
                clearable: 'Is it possible to clear the options',
                collapseTags: 'Whether to display the selected value in the form of text when multiple selection',
                multipleLimit: 'The maximum number of items that the user can select in multi-selection, if it is 0, there is no limit',
                autocomplete: 'Autocomplete attribute',
                placeholder: 'Placeholder',
                filterable: 'Whether it is searchable',
                allowCreate: 'Whether to allow users to create new entries',
                noMatchText: 'The text displayed when the search condition has no match',
                noDataText: 'The text displayed when the option is empty',
                reserveKeyword: 'When multi-choice and searchable, whether to retain the current search keyword after selecting an option',
                defaultFirstOption: 'Press Enter in the input box to select the first match',
                popperAppendToBody: 'Whether to insert the popup box into the body element',
                automaticDropdown: 'For non-searchable Select, whether to automatically pop up the option menu after the input box gets focus'
            }
        },
        switch: {
            name: 'Switch',
            props: {
                disabled: 'Whether to disable',
                width: 'Width (px)',
                activeText: 'Text description when the switch is open',
                inactiveText: 'Text description when switch is closed',
                activeValue: 'The value when the switch is open',
                inactiveValue: 'Value when switch is closed',
                activeColor: 'Background color when the switch is open',
                inactiveColor: 'Background color when switch is closed'
            }
        },
        slider: {
            name: 'Slider',
            props: {
                min: 'Minimum value',
                max: 'Maximum value',
                disabled: 'Whether to disable',
                step: 'Step size',
                showInput: 'Whether to display the input box, only valid for non-range selection',
                showInputControls: 'Whether to display the control buttons of the input box when the input box is displayed',
                showStops: 'Whether to display the break point',
                range: 'Whether it is a range selection',
                vertical: 'Whether vertical mode',
                height: 'Slider height, required in vertical mode'
            }
        },
        timePicker: {
            name: 'TimePicker',
            props: {
                pickerOptions: 'Options specific to the current time and date picker',
                readonly: 'Completely read-only',
                disabled: 'Disabled',
                editable: 'The text box can be entered',
                clearable: 'Whether to display the clear button',
                placeholder: 'Placeholder content when non-range selection',
                startPlaceholder: 'The placeholder content of the start date when the range is selected',
                endPlaceholder: 'The placeholder content of the start date when the range is selected',
                isRange: 'Whether to select for the time range',
                arrowControl: 'Whether to use the arrow for time selection',
                align: 'Alignment',
                prefixIcon: 'Class name of custom header icon',
                clearIcon: 'The class name of the custom clear icon'
            }
        },
        datePicker: {
            name: 'DatePicker',
            props: {
                pickerOptions: 'Options specific to the current time and date picker',
                readonly: 'Completely read-only',
                disabled: 'Disabled',
                type: 'Display type',
                editable: 'The text box can be entered',
                clearable: 'Whether to display the clear button',
                placeholder: 'Placeholder content when non-range selection',
                startPlaceholder: 'The placeholder content of the start date when the range is selected',
                endPlaceholder: 'The placeholder content of the end date when the range is selected',
                format: 'The format displayed in the input box',
                align: 'Alignment',
                rangeSeparator: 'Separator when selecting a range',
                unlinkPanels: 'Unlink the linkage between two date panels in the range selector',
                prefixIcon: 'Class name of custom header icon',
                clearIcon: 'The class name of the custom clear icon'
            }
        },
        rate: {
            name: 'Rate',
            props: {
                max: 'Maximum score',
                disabled: 'Is it read-only',
                allowHalf: 'Whether half selection is allowed',
                voidColor: 'The color of the unselected icon',
                disabledVoidColor: 'The color of the unselected icon when it is read-only',
                voidIconClass: 'The class name of the unselected icon',
                disabledVoidIconClass: 'The class name of the unselected icon when it is read-only',
                showScore: 'Whether to display the current score, show-score and show-text cannot be true at the same time',
                textColor: 'The color of the auxiliary text',
                scoreTemplate: 'Score display template'
            }
        },
        colorPicker: {
            name: 'ColorPicker',
            props: {
                disabled: 'Whether to disable',
                showAlpha: 'Whether to support transparency selection',
                colorFormat: 'Color format'
            }
        },
        row: {
            name: 'Grid Layout',
            props: {
                gutter: 'Grid Interval',
                type: 'Flex layout mode',
                justify: 'Horizontal arrangement under flex layout',
                align: 'Vertical alignment under flex layout'
            }
        },
        col: {
            name: 'Grid',
            props: {
                span: 'The number of columns occupied by the grid',
                offset: 'Number of grids on the left side of the grid',
                push: 'The grid moves to the right by the number of grids',
                pull: 'The grid moves to the left by the number of grids'
            }
        },
        tab: {
            name: 'Tab',
            props: {
                type: 'Style type',
                closable: 'Whether the label can be closed',
                tabPosition: 'Tab position',
                stretch: 'Whether the width of the label is self-supporting'
            }
        },
        'tab-pane': {
            name: 'TabPane',
            props: {
                label: 'Tab Title',
                disabled: 'Whether to disable',
                name: 'Identifier corresponding to the tab binding value value, indicating the tab alias',
                lazy: 'Whether the label is rendered late'
            }
        },
        'el-divider': {
            name: 'Divider',
            props: {
                direction: 'Set the dividing line direction',
                formCreateChild: 'Set the dividing line text',
                contentPosition: 'Set the position of the dividing line text'
            }
        },
        cascader: {
            name: 'Cascader',
            props: {
                props: 'Configuration options',
                size: 'Size',
                placeholder: 'Input box placeholder text',
                disabled: 'Whether to disable',
                clearable: 'Whether to support the clear option',
                showAllLevels: 'Whether to display the full path of the selected value in the input box',
                collapseTags: 'Whether to collapse Tags in multi-select mode',
                separator: 'Option separator'
            }
        },
        upload: {
            name: 'Upload',
            props: {
                uploadType: 'Upload type',
                action: 'Address to upload (required)',
                headers: 'Set the upload request header',
                multiple: 'Whether to support multiple selection files',
                data: 'Additional parameters attached to upload',
                name: 'Uploaded file field name',
                withCredentials: 'Support sending cookie credential information',
                accept: 'Accept the uploaded file type (this parameter is invalid in thumbnail-mode mode)',
                autoUpload: 'Whether to upload immediately after selecting the file',
                disabled: 'Whether to disable',
                limit: 'Maximum number of uploads allowed'
            }
        },
        'el-transfer': {
            name: 'Transfer',
            props: {
                data: 'Transfer\'s data source',
                filterable: 'Whether it is searchable',
                filterPlaceholder: 'Search box placeholder',
                targetOrder: 'Sorting strategy for the right list elements',
                titles: 'Custom list title',
                buttonTexts: 'Custom button text',
                format: 'Check the status copy at the top of the list',
                props: 'Field alias of data source',
                leftDefaultChecked: 'The key array of checked items in the left list in the initial state',
                rightDefaultChecked: 'The key array of checked items in the right list in the initial state'
            }
        },
        tree: {
            name: 'Tree',
            props: {
                emptyText: 'The text displayed when the content is empty',
                props: 'Configuration options, see the table below',
                renderAfterExpand: 'Whether to render its child nodes after the first expansion of a tree node',
                defaultExpandAll: 'Whether to expand all nodes by default',
                expandOnClickNode: 'Whether to expand or contract the node when the node is clicked, the default value is true, if it is false, the node will only be expanded or contracted when the arrow icon is clicked. ',
                checkOnClickNode: 'Whether to select the node when the node is clicked, the default value is false, that is, the node will be selected only when the check box is clicked. ',
                autoExpandParent: 'Whether to automatically expand the parent node when expanding the child node',
                checkStrictly: 'In the case of displaying the check box, whether to strictly follow the practice that the parent and child are not related to each other, the default is false',
                accordion: 'Whether to open only one sibling tree node each time',
                indent: 'Horizontal indentation between adjacent level nodes, in pixels',
                iconClass: 'Custom tree node icon',
                nodeKey: 'Each tree node is used as a unique identification attribute, and the whole tree should be unique'
            }
        },
        'el-alert': {
            name: 'Alert',
            description: 'Description',
            props: {
                title: 'Title',
                type: 'Theme',
                description: 'Auxiliary text',
                closable: 'Whether it can be closed',
                center: 'Whether the text is centered',
                closeText: 'Close button custom text',
                showIcon: 'Whether to display the icon',
                effect: 'Select a provided theme'
            }
        },
        span: {
            name: 'Text',
            props: {
                formCreateTitle: 'Title',
                formCreateChild: 'Content'
            }
        },
        div: {
            name: 'Space',
            props: {
                height: 'height',
            }
        },
        'el-button': {
            name: 'Button',
            props: {
                formCreateChild: 'Content',
                size: 'Size',
                type: 'Type',
                plain: 'Is it a plain button',
                round: 'Whether round button',
                circle: 'Whether a circular button',
                loading: 'Whether loading status',
                disabled: 'Whether to disable the state',
                icon: 'Icon class name'
            }
        },
        'fc-editor': {
            name: 'Editor',
            props: {
                disabled: 'Whether to disable'
            }
        }
    }
};

export default En;

