import { BaseService } from '@src/services/BaseService';
import { ENDPOINTS } from '@src/constants/endpoints';
import { IPlotItemResponse, IPlotMenuItem } from '@src/interfaces/plot';
import { campaignWithPrefix } from '@src/constants/constants';

export const PlotService = () => {
    const fetchPlotMenuList = async (campaign: string) =>
        BaseService<IPlotMenuItem[]>(
            campaignWithPrefix(campaign) + ENDPOINTS.PLOT_MENU_LIST
        );

    const fetchScene = async (campaign: string, sceneId: string) =>
        BaseService<IPlotItemResponse>(
            campaignWithPrefix(campaign) + ENDPOINTS.PLOT_SCENE(sceneId)
        );

    return {
        fetchPlotMenuList,
        fetchScene,
    };
};
