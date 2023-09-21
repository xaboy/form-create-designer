import {Rule} from "@form-create/element-ui";
import FormCreate from "@form-create/element-ui";
import {App, Component} from "@vue/runtime-core";

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
    showBaseForm: Boolean;
    showConfig: Boolean;
    showFormConfig: Boolean;
}

export interface MenuList extends Array<Menu> {

}

export interface DragRule {
    name: string;

    component?: Component;

    rule(): Rule;

    props(): Rule[];

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

declare const FcDesigner: {
    install: (app: App, ...options: any[]) => any;
} & Component;

export default FcDesigner;

export const formCreate: typeof FormCreate;
export const designerForm: typeof FormCreate;
