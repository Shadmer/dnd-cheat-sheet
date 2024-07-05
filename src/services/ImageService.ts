import { BaseService } from '@src/services/BaseService';

export const ImageService = () => {
    const fetchImages = async (urls: string[]) => {
        const imagePromises = urls.map((url) => BaseService<Blob>(url));
        return Promise.all(imagePromises);
    };

    return {
        fetchImages,
    };
};
