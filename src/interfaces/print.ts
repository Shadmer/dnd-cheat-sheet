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
