import { LastPageType, Module, NavigationRoute } from '@src/constants/enums';
import { IMenuList } from '@src/interfaces/common';

export const moduleMap: Record<
    Module,
    {
        title: string;
        navigationPrefix: NavigationRoute;
        lastPage: LastPageType;
    }
> = {
    codex: {
        title: 'Кодекс',
        navigationPrefix: NavigationRoute.codex,
        lastPage: LastPageType.codex,
    },
    workshop: {
        title: 'Мастерская',
        navigationPrefix: NavigationRoute.workshop,
        lastPage: LastPageType.workshop,
    },
};

export const workshopMenuList: IMenuList[] = [
    {
        section: 'process',
        title: 'Игровой процесс',
        content: [
            {
                id: 'battlefield',
                name: 'Поле битвы',
            },
        ],
    },
];
