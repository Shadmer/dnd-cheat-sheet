import { campaignWithPrefix } from '@src/constants/constants';
import { BaseService } from '@src/services/BaseService';

export const ImageService = () => {
    const fetchImage = async (campaign: string, url: string) =>
        BaseService<Blob>(campaignWithPrefix(campaign) + url);

    const fetchImages = async (campaign: string, urls: string[]) => {
        const imagePromises = urls.map((url) => fetchImage(campaign, url));
        return Promise.all(imagePromises);
    };

    return {
        fetchImage,
        fetchImages,
    };
};
