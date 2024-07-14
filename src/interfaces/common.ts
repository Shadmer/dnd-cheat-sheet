import { ICodexCard } from './codex';
import { IWorkshopCard } from './workshop';

export interface IProperty {
    name: string;
    value: string | number;
}

export interface ICard extends ICodexCard, IWorkshopCard {}

export interface IMenuItem {
    id: string;
    name: string;
}

export interface IMenuList {
    section: string;
    title: string;
    content: IMenuItem[];
}
