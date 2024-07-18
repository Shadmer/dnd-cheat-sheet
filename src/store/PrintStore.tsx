import { makeAutoObservable, runInAction } from 'mobx';
import { CodexService } from '@src/services/CodexService';
import { IMenuList } from '@src/interfaces/common';
import { IPrintSection, IPrintContent } from '@src/interfaces/print';

class Print {
    codexService = CodexService();
    sections: IPrintSection[] = [];
    loadedImages: string[] = [];
    menuListLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    getPrintMenuList = async (campaign: string, codexMenuList: IMenuList[]) => {
        const menuList = codexMenuList;
        const sections: IPrintSection[] = [];
        const mapSection: IPrintSection = {
            section: 'maps',
            title: 'Карты',
            content: [],
        };

        for (const menuListItem of menuList) {
            runInAction(() => {
                this.menuListLoading = true;
            });

            const sectionContent: IPrintContent[] = [];

            for (const item of menuListItem.content) {
                const page = await this.codexService.fetchPage(
                    campaign,
                    menuListItem.section,
                    item.id
                );

                if (page.images?.length) {
                    runInAction(() => {
                        sectionContent.push({
                            id: `image_${item.id}`,
                            name: item.name,
                            images: page.images,
                        });
                    });
                }

                if (page.maps?.length) {
                    runInAction(() => {
                        mapSection.content.push({
                            id: `map_${item.id}`,
                            name: item.name,
                            images: page.maps,
                        });
                    });
                }
            }

            if (sectionContent.length) {
                runInAction(() => {
                    sections.push({
                        section: menuListItem.section,
                        title: menuListItem.title,
                        content: sectionContent,
                    });
                });
            }
        }

        if (mapSection.content.length) {
            runInAction(() => {
                sections.push(mapSection);
            });
        }

        runInAction(() => {
            this.sections = sections;
            this.menuListLoading = false;
        });
    };

    toggleImageLoad = (contentItem: IPrintContent) => {
        runInAction(() => {
            const { id } = contentItem;
            if (this.loadedImages.includes(id)) {
                this.loadedImages = this.loadedImages.filter(
                    (imageId) => imageId !== id
                );
            } else {
                this.loadedImages.push(id);
            }
        });
    };

    get loadedImagesUrls(): string[] {
        return this.sections.flatMap((section) =>
            section.content
                .filter((item) => this.loadedImages.includes(item.id))
                .flatMap((item) => item.images || [])
        );
    }

    loadAllImages = () => {
        runInAction(() => {
            this.loadedImages = this.sections.flatMap((section) =>
                section.content.map((item) => item.id)
            );
        });
    };

    unloadAllImages = () => {
        runInAction(() => {
            this.loadedImages = [];
        });
    };
}

const PrintStore = new Print();

export default PrintStore;
