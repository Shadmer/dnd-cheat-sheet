export interface IPlotItemResponse {
    content: string;
}

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

export interface IImageData {
    image: string;
    title: string;
}

export interface ICodexCard<T> {
    content: T;
    description: string;
    images: IImageData[];
    maps: IImageData[];
}
