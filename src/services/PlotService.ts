import { BaseService } from '@src/services/BaseService';
import { ENDPOINTS } from '@src/endpoints';
import { IPlotMenuItem } from '@src/interfaces';

export const PlotService = () => {
    const fetchPlotMenuList = async () => {
        return BaseService<IPlotMenuItem[]>(ENDPOINTS.PLOT_MENU_LIST);
    };

    return {
        fetchPlotMenuList,
    };
};
