import { makeAutoObservable, runInAction } from 'mobx';
import { CodexService } from '@src/services/CodexService';
import { IPrintSection, IPrintContent } from '@src/interfaces';

class Print {
    codexService = CodexService();
    sections: IPrintSection[] = [];
    loadedImages: string[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    loadPrintMenuList = async () => {
        const menuList = await this.codexService.fetchCodexMenuList();
        const sections: IPrintSection[] = [];
        const mapSection: IPrintSection = {
            section: 'maps',
            title: 'Карты',
            content: [],
        };

        for (const menuListItem of menuList) {
            const sectionContent: IPrintContent[] = [];

            for (const item of menuListItem.content) {
                const url = `${menuListItem.section}/cards/${item.id}`;
                const page = await this.codexService.fetchPage(url);

                if (page.images?.length) {
                    sectionContent.push({
                        id: `image_${item.id}`,
                        name: item.name,
                        images: page.images,
                    });
                }

                if (page.maps?.length) {
                    mapSection.content.push({
                        id: `map_${item.id}`,
                        name: item.name,
                        images: page.maps,
                    });
                }
            }

            if (sectionContent.length) {
                sections.push({
                    section: menuListItem.section,
                    title: menuListItem.title,
                    content: sectionContent,
                });
            }
        }

        if (mapSection.content.length) {
            sections.push(mapSection);
        }

        runInAction(() => {
            this.sections = sections;
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
