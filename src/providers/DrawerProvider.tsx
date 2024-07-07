import React, { ReactNode } from 'react';

type DrawerContextProps = {
    drawerOpen: boolean;
    drawerContent: ReactNode | null;
    openDrawer: (content: ReactNode) => void;
    closeDrawer: () => void;
};

const DrawerContext = React.createContext<DrawerContextProps | null>(null);

export const useDrawer = () => {
    const context = React.useContext(DrawerContext);
    if (!context) {
        throw new Error('useDrawer must be used within a DrawerProvider');
    }
    return context;
};

export const DrawerProvider = ({ children }: { children: ReactNode }) => {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [drawerContent, setDrawerContent] = React.useState<ReactNode>(null);

    const openDrawer = React.useCallback((content: ReactNode) => {
        setDrawerContent(content);
        setDrawerOpen(true);
    }, []);

    const closeDrawer = React.useCallback(() => {
        setDrawerOpen(false);
        setDrawerContent(null);
    }, []);

    return (
        <DrawerContext.Provider
            value={{ drawerOpen, drawerContent, openDrawer, closeDrawer }}
        >
            {children}
        </DrawerContext.Provider>
    );
};
