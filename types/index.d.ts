import {Api, Options, Rule} from "@form-create/element-ui";
import FormCreate from "@form-create/element-ui";
import {Component, Plugin, Ref, App} from "@vue/runtime-core";

//多语言读取函数
type t = (name, ...args) => string;

export type MenuName = 'main' | 'aide' | 'layout' | 'subform' | string;

//菜单中的拖拽组件描述
export interface MenuItem {
    //拖拽组件名
    label: string;
    //拖拽组件id
    name: string;
    //拖拽组件图标
    icon: string;
}

//菜单
export interface Menu {
    //菜单名
    title: string;
    //菜单id
    name: string;
    //拖拽组件列表
    list: MenuItem[];
}

//菜单列表
type MenuList = Menu[];

//定义函数返回规则或者通过rule字段返回规则
type extendRule = ((arg: { t: t }) => Rule[]) | {
    //生成规则
    rule: (arg: { t: t }) => Rule[];
    //追加
    append?: boolean;
    //前置
    prepend?: boolean;
};

//设计器组件的props.config配置
export interface Config {
    //配置field是否可以编辑
    fieldReadonly?: boolean;
    //隐藏拖拽操作按钮
    hiddenDragMenu: boolean;
    //隐藏拖拽按钮
    hiddenDragBtn: boolean;
    //隐藏部分菜单
    hiddenMenu: MenuName[]
    //隐藏部分组件
    hiddenItem: string[]
    //是否显示保存按钮
    showSaveBtn?: boolean;
    //是否显示右侧的配置界面
    showConfig?: boolean;
    //是否显示组件的基础配置表单
    showBaseForm?: boolean;
    //是否显示组件联动
    showControl?: boolean;
    //是否显示组件的属性配置表单
    showPropsForm?: boolean;
    //是否显示组件的事件配置表单
    showEventForm?: boolean;
    //是否显示组件的验证配置表单
    showValidateForm?: boolean;
    //是否显示表单配置
    showFormConfig?: boolean;
    //是否显示多端适配选项
    showDevice?: boolean;
    //定义渲染规则所需的formData
    appendConfigData: string[] | ((rule: Rule) => Object);
    //基础配置的渲染规则,可以覆盖默认规则.append为true时追加到默认规则后面
    baseRule?: extendRule;
    //验证配置的渲染规则,可以覆盖默认规则.append为true时追加到默认规则后面
    validateRule?: extendRule;
    //表单的渲染规则,可以覆盖默认规则.append为true时追加到默认规则后面
    formRule?: extendRule;
    //组件配置的渲染规则,可以覆盖默认规则.append为true时追加到默认规则后面
    componentRule?: {
        default: (rule: Rule, arg: { t: t }) => Rule[] | {
            rule: (rule: Rule, arg: { t: t }) => Rule[];
            append?: boolean;
            prepend?: boolean;
        };
        //id组件拖拽组件规则的id,rule为当前组件的生成规则
        [id: string]: (rule: Rule, arg: { t: t }) => Rule[] | {
            rule: (rule: Rule, arg: { t: t }) => Rule[];
            append?: boolean;
            prepend?: boolean;
        };
    };
}

//拖拽组件描述规则
export interface DragRule {
    //组件id,不能重复
    name: string;
    //组件的名称
    label: string;
    //组件的图标
    icon: string;
    //插入的分类
    menu?: MenuName;
    //是否支持样式配置
    style?: boolean;
    //如果是子表单组件,需要定义`value`的类型
    subForm?: 'object' | 'array';
    //组件,不建议使用
    component?: Component;

    //组件的生成规则
    rule(arg: { t: t }): Rule;

    //组件属性配置的规则
    props(rule: Rule, arg: { t: t, api: Api }): Rule[];

    //导出规则时通过这个方法转成最终规则
    parseRule?: (rule: Rule) => void;
    //导入规则时通过这个方法转成设计器中的渲染规则
    loadRule?: (rule: Rule) => void;
    //当props中的字段变化时触发
    watch?: {
        [key: string]: (arg: { value: any, rule: Rule, api: Api, field: string }) => void;
    };
    //是否有配套的子组件,例如Row和Col
    children?: string;
    //初始化时渲染几个子组件
    childrenLen?: number;
    //当前组件的操作容器是否显示在组件内部,为false时操作容器包裹当前组件
    inside?: true | boolean;
    //是否可以拖入其他组件到当前组件内部
    drag?: true | string | boolean;
    //是否显示拖拽按钮
    dragBtn?: false | boolean;
    //控制操作操作按钮是否显示,显示哪些
    handleBtn?: true | boolean | Array<'create' | 'copy' | 'addChild' | 'delete'>;
    //隐藏基础配置中的字段
    hiddenBaseField?: string[];
    //是否显示遮罩, 避免对组件操作. 建议有子组件时为true,其他为false
    mask?: false | boolean;
    //是否只能拖入一个
    only?: boolean;
    //当前组件支持的事件
    event?: string[];
    //当前组件`value`的数据类型
    validate?: string[] | boolean;
}

//远程数据
export interface FetchDataItem {
    //数据名称
    label: string;
    //数据类型
    type: 'fetch';
    //请求链接
    action: string;
    //请求方式
    method: 'GET' | 'POST';
    //请求头部
    headers?: Object;
    //附带数据
    data?: Object;
    //远程数据解析
    parse?: string | ((res: any) => any);
    //远程异常处理
    onError?: string | ((e) => void);
}

//扩展操作
export type Handle = Array<{
    //按钮名称
    label: String;
    //回调函数
    callback: Function;
}>

//描述规则
export type DescriptionData = Array<{
    //唯一值
    _fc_id: string;
    //组件类型
    type: string;
    //字段id
    field?: string;
    //组件名称
    title?: string;
    //插槽名称
    slot?: string;
    //组件属性配置
    props: Object;
    //子级
    children?: DescriptionData;
}>

//用于预览的渲染器
export type formCreate = FormCreate;

//用于设计的渲染器
export type designerForm = FormCreate;

//原型方法
interface FcDesignerProtoType {
    //多语言读取函数
    t: t;
    //用于预览的渲染器
    formCreate: formCreate;
    //用于设计的渲染器
    designerForm: designerForm;

    //往渲染器中挂载组件
    component(name: string, component: Component, previewComponent?: Component): void;

    //设置默认的多语言
    useLocale(locale: Object): {
        name: Ref<string>;
        lang: Ref<string>;
        locale: Ref<Object>;
        t(key: string): string | undefined;
    }

    //获取组件配置中选项配置规则
    makeOptionsRule(t: t, to: string): Rule;

    //挂载组件
    install: (app: App, ...options: any[]) => any;
}

//设计器组件
export declare const FcDesigner: import("vue").DefineComponent<{
    //设计器组件的⾼度
    height?: Number | string;
    //⾃定义左侧的菜单列表，会覆盖默认的菜单列表
    menu?: MenuList,
    //可以配置设计器内模块是否显示和默认规则的修改
    config?: Config;
    //扩展操作
    handle?: Handle;
    //是否显示组件的遮罩，默认为true，不可以操作组件
    mask?: boolean;
    //多语⾔配置，默认为中⽂
    locale?: Object;
}, {}, {}, {}, {
    //添加模板和拖拽组件的描述⽂件，并按照 menu 字段⾃动添加到对应的菜单下
    addComponent: (dragRule: DragRule | Array<DragRule>) => void;
    //覆盖添加拖拽组件到指定的菜单下
    setMenuItem: (menuName: string, list: MenuList) => void;
    //在设计器左侧添加新的菜单
    addMenu: (menu: Menu) => void;
    //设置设计器表单的⽣成规则
    setRule: (rule: string | Rule[]) => void;
    //设置设计器表单的表单配置
    setOption: (opt: Options) => void;
    //设置设计器表单的表单配置
    setOptions: (opt: Options) => void;
    //获取设计器表单的渲染规则(Array)
    getRule: () => Rule[];
    //获取设计器表单的json渲染规则(string)
    getJson: () => string;
    //获取设计器表单的表单配置(Object)
    getOption: () => Options;
    //获取设计器表单的表单配置(Object)
    getOptions: () => Options;
    //获取设计器表单的表单的json配置(string)
    getOptionsJson: () => string;
    //获取设计器的表单的层级规则描述
    getDescription: () => DescriptionData;
    //获取设计器的表单中表单组件的规则描述
    getFormDescription: () => DescriptionData;
    //预览表单
    openPreview: () => void;
    //清空设计器的表单
    clearDragRule: () => void;
    //选中设计器中指定组件
    toolActive: (rule: Rule) => void;
    //清空设计器中组件的选中状态
    clearActiveRule: () => void;
    //设置表单配置的表单规则，于 config.formRule 相同
    setFormRuleConfig: (rule: () => Rule[], append: boolean) => void;
    //设置组件基础配置表单的表单规则，于 config.baseRule 相同
    setBaseRuleConfig: (rule: () => Rule[], append: boolean) => void;
    //设置组件验证配置表单的表单规则，于 config.validateRule 相同
    setValidateRuleConfig: (rule: () => Rule[], append: boolean) => void;
    //设置指定组件属性配置的表单规则，于 config.componentRule 相同
    setComponentRuleConfig: (id: string, rule: () => Rule[], append: boolean) => void;
    //获取表单的formData
    getFormData: () => Object;
    //设置表单的formData
    setFormData: (formData: Object) => void;
    //开启录入数据模式
    openInputData: (open: boolean) => void;
}> & FcDesignerProtoType & Plugin & Record<string, any>;


export default FcDesigner;
