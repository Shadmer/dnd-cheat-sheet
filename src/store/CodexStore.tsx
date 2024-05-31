import { makeAutoObservable, runInAction } from 'mobx';
import { CodexService } from '@src/services/CodexService';
import { ICodexMenuList } from '@src/interfaces';

class Codex {
    codexService = CodexService();
    codexMenuList: ICodexMenuList[] = [];
    filteredCodexMenuList: ICodexMenuList[] = [];
    currentScene = '';

    constructor() {
        makeAutoObservable(this);
    }

    filterCodexMenuList = (searchTitle: string) => {
        runInAction(() => {
            this.filteredCodexMenuList = this.codexMenuList.filter((item) => {
                const lowercaseTitle = item.title.toLowerCase();
                const lowercaseSearchTitle = searchTitle.toLowerCase();
                return lowercaseTitle.includes(lowercaseSearchTitle);
            });
        });
    };

    loadCodexMenuList = async () => {
        const menuList = await this.codexService.fetchCodexMenuList();

        runInAction(() => {
            this.codexMenuList = menuList;
            this.filteredCodexMenuList = menuList;
        });
    };

    loadScene = async (sceneId: string) => {
        const scene = await this.codexService.fetchScene(sceneId);
        runInAction(() => {
            this.currentScene = scene;
        });
    };

    clearScene = () => {
        this.currentScene = '';
    };
}

const CodexStore = new Codex();

export default CodexStore;
