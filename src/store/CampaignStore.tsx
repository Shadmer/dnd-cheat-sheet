import { makeAutoObservable, runInAction } from 'mobx';
import { CampaignService } from '@src/services/CampaignService';
import { ICampaign } from '@src/interfaces/campaign';
import { ImageService } from '@src/services/ImageService';

class Campaign {
    campaignService = CampaignService();
    imageService = ImageService();
    campaignList: ICampaign[] = [];
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    private loadImage = async (image: string) => {
        if (!image) return '';

        const url = await this.imageService.fetchImage('', image);

        return URL.createObjectURL(url);
    };

    loadCampaignList = async () => {
        this.isLoading = true;

        try {
            const list = await this.campaignService.fetchCampaignList();

            const updatedList = await Promise.all(
                list.map(async (campaign) => {
                    const updatedStoryGameList = await Promise.all(
                        campaign.storyGameList.map(async (storyGame) => {
                            const updatedImage = await this.loadImage(
                                storyGame.image
                            );
                            return {
                                ...storyGame,
                                image: updatedImage,
                            };
                        })
                    );

                    return {
                        ...campaign,
                        storyGameList: updatedStoryGameList,
                    };
                })
            );

            runInAction(() => {
                this.campaignList = updatedList;
            });
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    };
}

const CampaignStore = new Campaign();

export default CampaignStore;
