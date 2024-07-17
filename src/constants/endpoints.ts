export const ENDPOINTS = {
    // PLOT
    PLOT_MENU_LIST: '/plot/plotMenuList.json',
    PLOT_SCENE: (sceneId: string) => `/plot/scenes/${sceneId}.json`,

    // CODEX
    CODEX_MENU_LIST: '/codex/codexMenuList.json',
    CODEX_PAGE: (section: string, id: string) =>
        `/codex/${section}/cards/${id}.json`,
};
