import { NavigateFunction } from 'react-router-dom';
import { makeAutoObservable, runInAction } from 'mobx';

import { ImageService } from '@src/services/ImageService';
import { CodexService } from '@src/services/CodexService';

import { ICodexCard, ICodexMenuList } from '@src/interfaces';
import { NavigationRoute } from '@src/enums';

class Codex {
    imageService = ImageService();
    codexService = CodexService();
    codexMenuList: ICodexMenuList[] = [];
    filteredCodexMenuList: ICodexMenuList[] = [];
    currentPage: ICodexCard | null = null;
    imageUrls: string[] = [];
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
        try {
            const page = await this.codexService.fetchPage(id);
            runInAction(() => {
                this.currentPage = page;
            });
        } catch {
            this.navigate && this.navigate(NavigationRoute.codex);
        }
    };

    clearPage = () => {
        this.currentPage = null;
    };

    loadImages = async (urls: string[]) => {
        const images = await this.imageService.fetchImages(urls);
        const imageUrls = images.map((image) => URL.createObjectURL(image));

        runInAction(() => {
            this.imageUrls = imageUrls;
        });
    };

    clearImages = () => {
        this.imageUrls = [];
    };
}

const CodexStore = new Codex();

export default CodexStore;
