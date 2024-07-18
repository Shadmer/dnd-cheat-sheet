import { BaseService } from '@src/services/BaseService';
import { ENDPOINTS } from '@src/constants/endpoints';
import { ICard, IMenuList } from '@src/interfaces/common';

export const CodexService = () => {
    const fetchCodexMenuList = async (campaign: string) =>
        BaseService<IMenuList[]>(campaign + ENDPOINTS.CODEX_MENU_LIST);

    const fetchPage = async (campaign: string, section: string, id: string) =>
        BaseService<ICard>(campaign + ENDPOINTS.CODEX_PAGE(section, id));

    return {
        fetchCodexMenuList,
        fetchPage,
    };
};
