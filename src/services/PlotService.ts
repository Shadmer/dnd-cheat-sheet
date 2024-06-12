import { BaseService } from '@src/services/BaseService';
import { ENDPOINTS } from '@src/endpoints';
import { IPlotItemResponse, IPlotMenuItem } from '@src/interfaces';

export const PlotService = () => {
    const fetchPlotMenuList = async () =>
        BaseService<IPlotMenuItem[]>(ENDPOINTS.PLOT_MENU_LIST);

    const fetchScene = async (sceneId: string) =>
        BaseService<IPlotItemResponse>(ENDPOINTS.PLOT_SCENE(sceneId));

    return {
        fetchPlotMenuList,
        fetchScene,
    };
};
