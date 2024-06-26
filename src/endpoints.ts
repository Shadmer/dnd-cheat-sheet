export const ENDPOINTS = {
    PLOT_MENU_LIST: 'plot/plotMenuList.json',
    PLOT_SCENE: (sceneId: string) => `plot/scenes/${sceneId}.json`,
    CODEX_MENU_LIST: 'codex/codexMenuList.json',
    CODEX_PAGE: (page: string) => `codex/${page}.json`,
};
