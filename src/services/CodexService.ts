import { BaseService } from '@src/services/BaseService';
import { ENDPOINTS } from '@src/constants/endpoints';
import { ICard, IMenuList } from '@src/interfaces/common';

export const CodexService = () => {
    const fetchCodexMenuList = async () =>
        BaseService<IMenuList[]>(ENDPOINTS.CODEX_MENU_LIST);

    const fetchPage = async (section: string, id: string) =>
        BaseService<ICard>(ENDPOINTS.CODEX_PAGE(section, id));

    return {
        fetchCodexMenuList,
        fetchPage,
    };
};
