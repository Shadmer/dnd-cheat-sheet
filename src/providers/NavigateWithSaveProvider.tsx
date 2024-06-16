import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { LastPageType } from '@src/enums';

type NavigateWithSaveProviderProps = {
    children: ReactNode;
};

type NavigateWithSaveContextType = {
    navigateWithSave: (path: string, key: LastPageType) => void;
    getLastPlotPage: () => string | null;
    getLastCodexPage: () => string | null;
};

const NavigateWithSaveContext =
    React.createContext<NavigateWithSaveContextType | null>(null);

export const useNavigateWithSave = (): NavigateWithSaveContextType => {
    const context = React.useContext(NavigateWithSaveContext);

    if (!context) {
        throw new Error(
            'useNavigateWithSave must be used within a NavigateWithSaveProvider'
        );
    }
    return context;
};

export const NavigateWithSaveProvider: React.FC<
    NavigateWithSaveProviderProps
> = ({ children }) => {
    const navigate = useNavigate();

    const navigateWithSave = React.useCallback(
        (path: string, key: LastPageType) => {
            localStorage.setItem(key, path);
            navigate(path);
        },
        [navigate]
    );

    const value = React.useMemo<NavigateWithSaveContextType>(
        () => ({
            navigateWithSave,
            getLastPlotPage: () => localStorage.getItem(LastPageType.scene),
            getLastCodexPage: () => localStorage.getItem(LastPageType.codex),
        }),
        [navigateWithSave]
    );

    return (
        <NavigateWithSaveContext.Provider value={value}>
            {children}
        </NavigateWithSaveContext.Provider>
    );
};
