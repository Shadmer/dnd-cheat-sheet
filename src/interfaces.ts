export interface IPlotMenuItem {
    sceneId: string;
    part: string;
    title: string;
    subTitle: string;
    description: string;
}

export interface ICodexMenuItem {
    sceneId: string;
    title: string;
    subTitle: string;
    desc: string;
}

export interface ICodexMenuList {
    part: string;
    title: string;
    content: ICodexMenuItem[];
}
