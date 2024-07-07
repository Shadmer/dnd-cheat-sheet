import { BaseService } from '@src/services/BaseService';

export const ImageService = () => {
    const fetchImage = async (url: string) => BaseService<Blob>(url);

    const fetchImages = async (urls: string[]) => {
        const imagePromises = urls.map((url) => fetchImage(url));
        return Promise.all(imagePromises);
    };

    return {
        fetchImage,
        fetchImages,
    };
};
