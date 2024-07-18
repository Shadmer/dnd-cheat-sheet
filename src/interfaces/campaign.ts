export interface IStoryGame {
    id: string;
    title: string;
    description: string;
    image: string;
}

export interface ICampaign {
    id: string;
    title: string;
    storyGameList: IStoryGame[];
}
