import { makeAutoObservable } from 'mobx';
import { PlotService } from '@src/services/PlotService';

class Plot {
    plots = [];

    constructor() {
        makeAutoObservable(this);
    }

    async loadPlots() {
        try {
            const plots = await PlotService().fetchPlots();
            this.plots = plots;
        } catch (error) {
            console.error('Error loading plots:', error);
        }
    }
}

const PlotStore = new Plot();

export default PlotStore;
