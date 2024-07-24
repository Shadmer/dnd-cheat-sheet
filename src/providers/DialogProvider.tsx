import React, { ReactNode } from 'react';

type DialogContextProps = {
    dialogOpen: boolean;
    dialogContent: ReactNode | null;
    dialogFooter: ReactNode | null;
    dialogTitle: string;
    fullScreen: boolean;
    openDialog: (
        title: string,
        content: ReactNode,
        footer?: ReactNode,
        newFullScreen?: boolean
    ) => void;
    closeDialog: () => void;
};

const DialogContext = React.createContext<DialogContextProps | null>(null);

export const useDialog = () => {
    const context = React.useContext(DialogContext);
    if (!context) {
        throw new Error('useDialog must be used within a DialogProvider');
    }
    return context;
};

export const DialogProvider = ({ children }: { children: ReactNode }) => {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [dialogTitle, setDialogTitle] = React.useState('');
    const [dialogContent, setDialogContent] = React.useState<ReactNode>(null);
    const [dialogFooter, setDialogFooter] = React.useState<ReactNode>(null);
    const [fullScreen, setFullScreen] = React.useState(false);

    const openDialog = (
        title: string,
        content: ReactNode,
        footer: ReactNode,
        isFullScreen = false
    ) => {
        setDialogTitle(title);
        setDialogContent(content);
        setDialogFooter(footer);
        setFullScreen(isFullScreen);
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
    };

    return (
        <DialogContext.Provider
            value={{
                dialogOpen,
                dialogTitle,
                dialogContent,
                dialogFooter,
                fullScreen,
                openDialog,
                closeDialog,
            }}
        >
            {children}
        </DialogContext.Provider>
    );
};
