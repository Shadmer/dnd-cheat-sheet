import { NavigateFunction } from 'react-router-dom';
import { makeAutoObservable, runInAction } from 'mobx';

import { CodexService } from '@src/services/CodexService';

import { ICodexCard, ICodexMenuList } from '@src/interfaces/codex';
import { NavigationRoute } from '@src/enums';

class Codex {
    codexService = CodexService();
    codexMenuList: ICodexMenuList[] = [];
    filteredCodexMenuList: ICodexMenuList[] = [];
    currentPage: ICodexCard | null = null;
    currentPageLoading = false;
    navigate: NavigateFunction | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setNavigate = (navigate: NavigateFunction) => {
        this.navigate = navigate;
    };

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

    loadPage = async (id: string) => {
        this.currentPageLoading = true;

        try {
            const page = await this.codexService.fetchPage(id);
            runInAction(() => {
                this.currentPage = page;
            });
        } catch {
            this.navigate && this.navigate(NavigationRoute.codex);
        } finally {
            setTimeout(() => {
                runInAction(() => {
                    this.currentPageLoading = false;
                });
            }, 200);
        }
    };

    clearPage = () => {
        this.currentPage = null;
    };
}

const CodexStore = new Codex();

export default CodexStore;
