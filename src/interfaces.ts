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

export interface IProperty {
    name: string;
    value: string | number;
}

export interface ICharacter {
    foo: string;
}

export interface ICreature {
    name: {
        rus: string;
        eng: string;
    };
    size: string;
    type: string;
    alignment: string;
    challengeRating: string;
    proficiencyBonus: string;
    armorClass: number;
    hits: {
        average: number;
        formula: string;
    };
    speed: string;
    ability: {
        str: number;
        dex: number;
        con: number;
        int: number;
        wiz: number;
        cha: number;
    };
    savingThrows: IProperty[];
    damageImmunities: string[];
    conditionImmunities: string[];
    senses: {
        passivePerception: string;
        senses: IProperty[];
    };
    languages: string[];
    areas: string[];
    feats: IProperty[];
    actions: IProperty[];
}

export interface ICodexCard {
    creature?: ICreature;
    description?: string;
    images?: IImageData[];
    maps?: IImageData[];
}
