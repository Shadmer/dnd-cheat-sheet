import { BaseService } from '@src/services/BaseService';
import { ENDPOINTS } from '@src/constants/endpoints';
import { ICard, IMenuList } from '@src/interfaces/common';

export const CodexService = () => {
    const fetchDefaultCardText = async () =>
        BaseService<{ content: string }>(ENDPOINTS.CODEX_DEFAULT_TEXT);

    const fetchCodexMenuList = async () =>
        BaseService<IMenuList[]>(ENDPOINTS.CODEX_MENU_LIST);

    const fetchPage = async (page: string) =>
        BaseService<ICard>(ENDPOINTS.CODEX_PAGE(page));

    return {
        fetchDefaultCardText,
        fetchCodexMenuList,
        fetchPage,
    };
};
