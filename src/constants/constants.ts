import { LastPageType, Module, NavigationRoute } from '@src/constants/enums';

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
