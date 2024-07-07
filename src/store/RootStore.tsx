import PlotStore from './PlotStore';
import CodexStore from './CodexStore';
import PrintStore from './PrintStore';

class RootStore {
    plot = PlotStore;
    codex = CodexStore;
    print = PrintStore;
}

export default RootStore;
