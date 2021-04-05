import {Rule} from "@form-create/element-ui";

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

export interface DragRule {
    name: string;

    rule(): Rule;

    props(): Rule[];

    children?: string;
    inside?: true;
    drag?: true | String;
    dragBtn?: false;
}