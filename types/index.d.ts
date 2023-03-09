import {Rule} from "@form-create/element-ui";
import Vue from "vue";
import {ExtendedVue} from "vue/types/vue";
import {PluginObject} from "vue/types/plugin";
import elmFormCreate from "@form-create/element-ui";

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

export interface MenuList extends Array<Menu> {

}

export interface Config {
    showBaseForm: Boolean;
    showConfig: Boolean;
    showFormConfig: Boolean;
}

export interface DragRule {
    name: string;

    rule(): Rule;

    props(): Rule[];

    children?: string;
    childrenLen?: number,
    inside?: true;
    drag?: true | String;
    dragBtn?: false;
    mask?: false;
}


declare const FcDesigner: {
    install: (app: typeof Vue) => any;
} & ExtendedVue<Vue, {}, {}, {}, {}, {}> & PluginObject<any>;

export default FcDesigner;

export const formCreate: typeof elmFormCreate;
export const designerForm: typeof elmFormCreate;
