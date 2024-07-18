import { NavigateFunction } from 'react-router-dom';
import { makeAutoObservable, runInAction } from 'mobx';

import { CodexService } from '@src/services/CodexService';

import { ICard, IMenuList } from '@src/interfaces/common';
import { NavigationRoute } from '@src/constants/enums';

class Codex {
    codexService = CodexService();
    menuList: IMenuList[] = [];
    filteredMenuList: IMenuList[] = [];
    currentPage: ICard | null = null;
    isLoading = false;
    navigate: NavigateFunction | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setNavigate = (navigate: NavigateFunction) => {
        this.navigate = navigate;
    };

    filterMenuList = (searchTitle: string) => {
        runInAction(() => {
            this.filteredMenuList = this.menuList
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

    loadMenuList = async (campaign: string) => {
        const menuList = campaign
            ? await this.codexService.fetchCodexMenuList(campaign)
            : [];

        runInAction(() => {
            this.menuList = menuList;
            this.filteredMenuList = menuList;
        });
    };

    loadPage = async (campaign: string, section: string, id: string) => {
        this.isLoading = true;

        try {
            const page = await this.codexService.fetchPage(
                campaign,
                section,
                id
            );
            runInAction(() => {
                this.currentPage = page;
            });
        } catch {
            this.navigate && this.navigate(NavigationRoute.codex);
        } finally {
            setTimeout(() => {
                runInAction(() => {
                    this.isLoading = false;
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
