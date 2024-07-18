import { BaseService } from '@src/services/BaseService';
import { ENDPOINTS } from '@src/constants/endpoints';
import { IPlotItemResponse, IPlotMenuItem } from '@src/interfaces/plot';

export const PlotService = () => {
    const fetchPlotMenuList = async (campaign: string) =>
        BaseService<IPlotMenuItem[]>(campaign + ENDPOINTS.PLOT_MENU_LIST);

    const fetchScene = async (campaign: string, sceneId: string) =>
        BaseService<IPlotItemResponse>(
            campaign + ENDPOINTS.PLOT_SCENE(sceneId)
        );

    return {
        fetchPlotMenuList,
        fetchScene,
    };
};
