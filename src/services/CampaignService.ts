import { BaseService } from '@src/services/BaseService';
import { ENDPOINTS } from '@src/constants/endpoints';
import { ICampaign } from '@src/interfaces/campaign';

export const CampaignService = () => {
    const fetchCampaignList = async () =>
        BaseService<ICampaign[]>(ENDPOINTS.CAMPAIGN_MENU_LIST);

    return {
        fetchCampaignList,
    };
};
