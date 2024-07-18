import PlotStore from './PlotStore';
import CodexStore from './CodexStore';
import PrintStore from './PrintStore';
import WorkshopStore from './WorkshopStore';
import CampaignStore from './CampaignStore';

class RootStore {
    plot = PlotStore;
    codex = CodexStore;
    print = PrintStore;
    workshop = WorkshopStore;
    campaign = CampaignStore;
}

export default RootStore;
