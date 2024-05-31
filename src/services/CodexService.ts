import { BaseService } from '@src/services/BaseService';
import { ENDPOINTS } from '@src/endpoints';
import { ICodexMenuList } from '@src/interfaces';

export const CodexService = () => {
    const fetchCodexMenuList = async () =>
        BaseService<ICodexMenuList[]>(ENDPOINTS.CODEX_MENU_LIST);

    const fetchScene = async (sceneId: string) =>
        BaseService<string>(ENDPOINTS.PLOT_SCENE(sceneId));

    return {
        fetchCodexMenuList,
        fetchScene,
    };
};
