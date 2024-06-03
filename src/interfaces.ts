export interface IPlotMenuItem {
    sceneId: string;
    part: string;
    title: string;
    subTitle: string;
    description: string;
}

export interface ICodexMenuItem {
    id: string;
    name: string;
}

export interface ICodexMenuList {
    section: string;
    title: string;
    content: ICodexMenuItem[];
}
