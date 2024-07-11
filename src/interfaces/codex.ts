import { IProperty } from '@src/interfaces/common';

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

export interface IPlace {
    name: string;
    location: string;
    description: {
        appearance: string;
        atmosphere: string;
        history: string;
    };
    inhabitants: {
        mainInhabitants: string;
        importantCharacters: IProperty[];
    };
    features: {
        landmarks: string[];
        dangers: string[];
        resources: string[];
    };
}

interface IShopItem {
    name: string;
    price: string;
    description: string;
}

interface IShopCategory {
    categoryName: string;
    items: IShopItem[];
}

export interface IShop {
    shopName: string;
    categories: IShopCategory[];
}

export interface ICodexCard {
    creature?: ICreature;
    artifact?: IArtifact;
    place?: IPlace;
    character?: ICharacter;
    goods?: IShop;
    description?: string;
    images?: string[];
    maps?: string[];
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
