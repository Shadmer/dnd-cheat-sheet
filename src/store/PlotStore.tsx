import { makeAutoObservable, runInAction } from 'mobx';
import { PlotService } from '@src/services/PlotService';
import { IPlotMenuItem } from '@src/interfaces';

class Plot {
    plotService = PlotService();
    plotMenuList: IPlotMenuItem[] = [];
    filteredPlotMenuList: IPlotMenuItem[] = [];
    currentScene = '';

    constructor() {
        makeAutoObservable(this);
    }

    filterPlotMenuList = (searchTitle: string) => {
        runInAction(() => {
            this.filteredPlotMenuList = this.plotMenuList.filter((item) => {
                const lowercaseTitle = item.title.toLowerCase();
                const lowercaseSearchTitle = searchTitle.toLowerCase();
                return lowercaseTitle.includes(lowercaseSearchTitle);
            });
        });
    };

    loadPlotMenuList = async () => {
        const menuList = await this.plotService.fetchPlotMenuList();

        runInAction(() => {
            this.plotMenuList = menuList;
            this.filteredPlotMenuList = menuList;
        });
    };

    loadScene = async (sceneId: string) => {
        const scene = await this.plotService.fetchScene(sceneId);
        runInAction(() => {
            this.currentScene = scene.content;
        });
    };

    clearScene = () => {
        this.currentScene = '';
    };
}

const PlotStore = new Plot();

export default PlotStore;
