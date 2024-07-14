import { BaseService } from '@src/services/BaseService';
import { ENDPOINTS } from '@src/constants/endpoints';

export const WorkshopService = () => {
    const fetchDefaultCardText = async () =>
        BaseService<{ content: string }>(ENDPOINTS.WORKSHOP_DEFAULT_TEXT);

    return {
        fetchDefaultCardText,
    };
};
