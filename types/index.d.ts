import {Rule} from "@form-create/element-ui";
import FormCreate from "@form-create/element-ui";
import {Component, Plugin, Ref} from "@vue/runtime-core";

export interface MenuItem {
    label: string,
    name: string,
    icon: string;
}

export interface Menu {
    title: string;
    name: string;
    list: MenuItem[]
}

export interface Config {
    showBaseForm?: Boolean;
    showConfig?: Boolean;
    showFormConfig?: Boolean;
    baseRule?: (arg: { t: Object }) => Rule[] | { rule: (arg: { t: Object }) => Rule[], append?: boolean };
    validateRule?: (arg: { t: Object }) => Rule[] | { rule: (arg: { t: Object }) => Rule[], append?: boolean };
    formRule?: (arg: { t: Object }) => Rule[] | { rule: (arg: { t: Object }) => Rule[], append?: boolean };
    componentRule?: {
        [name: string]: (rule: Object, arg: { t: Object }) => Rule[] | {
            rule: (rule: Object, arg: { t: Object }) => Rule[],
            append?: boolean
        }
    };
}

export interface MenuList extends Array<Menu> {

}

export interface DragRule {
    name: string;

    component?: Component;

    rule(): Rule;

    props(): Rule[];

    parseRule?: (rule: Rule) => void;

    loadRule?: (rule: Rule) => void;

    watch?: {
        [key: string]: (arg: { value: any, rule: object, api: object, field: string }) => void;
    };
    children?: string;
    childrenLen?: number;
    inside?: true;
    drag?: true | String;
    dragBtn?: false;
    mask?: false;
}

interface FcDesignerProtoType {
    component(name: string, component: Component): void;

    useLocale(locale: Object): {
        name: Ref<string>;
        lang: Ref<string>;
        locale: Ref<Object>;
        t(key: string): string | undefined;
    }

    t(key: string): string | undefined;

    formCreate: typeof FormCreate;
    designerForm: typeof FormCreate;

    makeOptionsRule(t: (key: string) => string | undefined, to: string, flag?: boolean): Rule;
}

export declare const FcDesigner: import("vue").DefineComponent<{
    height?: Number | String;
    menu?: MenuList,
    config?: Config;
    mask?: boolean;
    locale?: Object;
}> & FcDesignerProtoType & Plugin & Record<string, any>;


export default FcDesigner;

export const formCreate: typeof FormCreate;
export const designerForm: typeof FormCreate;
