import React, { ReactNode } from 'react';

type DialogContextProps = {
    dialogOpen: boolean;
    dialogContent: ReactNode | null;
    openDialog: (content: ReactNode) => void;
    closeDialog: () => void;
};

const defaultContext: DialogContextProps = {
    dialogOpen: false,
    dialogContent: null,
    openDialog: () => {
        /* пустая функция */
    },
    closeDialog: () => {
        /* пустая функция */
    },
};

const DialogContext = React.createContext<DialogContextProps>(defaultContext);

export const useDialog = () => {
    const context = React.useContext(DialogContext);
    if (!context) {
        throw new Error('useDialog must be used within a DialogProvider');
    }
    return context;
};

export const DialogProvider = ({ children }: { children: ReactNode }) => {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [dialogContent, setDialogContent] = React.useState<ReactNode>(null);

    const openDialog = (content: ReactNode) => {
        setDialogContent(content);
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
        setDialogContent(null);
    };

    return (
        <DialogContext.Provider
            value={{ dialogOpen, dialogContent, openDialog, closeDialog }}
        >
            {children}
        </DialogContext.Provider>
    );
};
