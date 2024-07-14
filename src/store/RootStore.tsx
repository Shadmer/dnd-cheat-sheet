import PlotStore from './PlotStore';
import CodexStore from './CodexStore';
import PrintStore from './PrintStore';
import WorkshopStore from './WorkshopStore';

class RootStore {
    plot = PlotStore;
    codex = CodexStore;
    print = PrintStore;
    workshop = WorkshopStore;
}

export default RootStore;
