import { makeAutoObservable, runInAction } from 'mobx';
import { CodexService } from '@src/services/CodexService';
import { ICodexMenuList } from '@src/interfaces';

class Codex {
    codexService = CodexService();
    codexMenuList: ICodexMenuList[] = [];
    filteredCodexMenuList: ICodexMenuList[] = [];

    // TODO: адаптировать под кодекс
    currentScene = '';

    constructor() {
        makeAutoObservable(this);
    }

    filterCodexMenuList = (searchTitle: string) => {
        runInAction(() => {
            this.filteredCodexMenuList = this.codexMenuList
                .map((category) => ({
                    ...category,
                    content: category.content.filter((item) =>
                        item.name
                            .toLowerCase()
                            .includes(searchTitle.toLowerCase())
                    ),
                }))
                .filter((category) => category.content.length > 0);
        });
    };

    loadCodexMenuList = async () => {
        const menuList = await this.codexService.fetchCodexMenuList();

        runInAction(() => {
            this.codexMenuList = menuList;
            this.filteredCodexMenuList = menuList;
        });
    };

    // TODO: адаптировать под кодекс
    loadScene = async (sceneId: string) => {
        const scene = await this.codexService.fetchScene(sceneId);
        runInAction(() => {
            this.currentScene = scene;
        });
    };

    // TODO: адаптировать под кодекс
    clearScene = () => {
        this.currentScene = '';
    };
}

const CodexStore = new Codex();

export default CodexStore;
