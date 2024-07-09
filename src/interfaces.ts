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

export interface IProperty {
    name: string;
    value: string | number;
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
    feats: IProperty[];
    actions: IProperty[];
}

export interface IArtifact {
    name: {
        rus: string;
        eng: string;
    };
    type: string;
    rarity: string;
    customization: boolean;
    cost: string;
    features: IProperty[];
    blessings: {
        small: IProperty[];
        basic: IProperty[];
    };
    curses: {
        small: IProperty[];
        basic: IProperty[];
    };
    destruction: string[];
}

export interface ICharacter {
    name: string;
    race: string;
    class: string;
    background: string;
    alignment: string;
    physical: {
        appearance: string;
        health: string;
    };
    social: {
        originAndStatus: string;
        educationAndSkills: string;
        familyAndConnections: string;
    };
    psychological: {
        personality: {
            traits: string;
            flaw: string;
        };
        motivesAndGoals: {
            motives: string;
            goal: string;
        };
        innerWorld: {
            treasure: string;
            secret: string;
        };
        valuesAndBonds: {
            ideals: string;
            bonds: string;
        };
        weaknesses: {
            phobiasAndVulnerabilities: string;
        };
    };
}

export interface ICodexCard {
    character?: ICharacter;
    creature?: ICreature;
    artifact?: IArtifact;
    description?: string;
    images?: string[];
    maps?: string[];
}

export interface IPrintContent {
    id: string;
    name: string;
    images: string[];
}

export interface IPrintSection {
    section: string;
    title: string;
    content: IPrintContent[];
}
