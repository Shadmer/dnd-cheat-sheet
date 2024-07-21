export enum UnitSections {
    players = 'players',
    custom = 'custom',
    characters = 'characters',
    bestiary = 'bestiary',
}

export interface IUnit {
    id: string;
    name: string;
    section: UnitSections;
    parentId: string;
    initiative: string;
    maxHealth: string;
    health: string;
    armor: string;
    isInBattle: boolean | null;
    isCurrentMove: boolean;
}
