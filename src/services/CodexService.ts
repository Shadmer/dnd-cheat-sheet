import { BaseService } from '@src/services/BaseService';
import { ENDPOINTS } from '@src/constants/endpoints';
import { ICodexCard, ICodexMenuList } from '@src/interfaces/codex';

export const CodexService = () => {
    const fetchCodexMenuList = async () =>
        BaseService<ICodexMenuList[]>(ENDPOINTS.CODEX_MENU_LIST);

    const fetchPage = async (page: string) =>
        BaseService<ICodexCard>(ENDPOINTS.CODEX_PAGE(page));

    return {
        fetchCodexMenuList,
        fetchPage,
    };
};
