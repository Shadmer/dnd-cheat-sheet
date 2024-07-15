import { NavigateFunction } from 'react-router-dom';
import { makeAutoObservable, runInAction } from 'mobx';

import { WorkshopService } from '@src/services/WorkshopService';

import { ICard, IMenuList } from '@src/interfaces/common';
import { NavigationRoute } from '@src/constants/enums';

const workshopMenuList: IMenuList[] = [
    {
        section: 'test',
        title: 'Тест',
        content: [
            {
                id: 'some',
                name: 'Что-то',
            },
        ],
    },
];

class Workshop {
    workshopService = WorkshopService();
    isLoading = false;
    defaultCardText = '';
    menuList: IMenuList[] = workshopMenuList;
    filteredMenuList: IMenuList[] = workshopMenuList;
    currentPage: ICard | null = null;
    navigate: NavigateFunction | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    loadDefaultCardText = async () => {
        this.isLoading = true;

        try {
            const { content } =
                await this.workshopService.fetchDefaultCardText();

            runInAction(() => {
                this.defaultCardText = content;
            });
        } finally {
            setTimeout(() => {
                runInAction(() => {
                    this.isLoading = false;
                });
            }, 200);
        }
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

    loadPage = (id: string) => {
        this.isLoading = true;

        try {
            const isWorkshopItem = workshopMenuList.some((section) =>
                section.content.some((item) => item.id === id)
            );

            if (isWorkshopItem) {
                const page = { [id]: true } as ICard;

                runInAction(() => {
                    this.currentPage = page;
                });
            } else {
                this.navigate && this.navigate(NavigationRoute.workshop);
            }
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

    setNavigate = (navigate: NavigateFunction) => {
        this.navigate = navigate;
    };
}

const WorkshopStore = new Workshop();

export default WorkshopStore;
