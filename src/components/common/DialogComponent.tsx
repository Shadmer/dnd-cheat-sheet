import React from 'react';
import {
    Dialog,
    IconButton,
    Box,
    DialogTitle,
    DialogContent,
    Typography,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useDialog } from '@src/providers/DialogProvider';
import { styled } from '@mui/system';

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
    '&::-webkit-scrollbar': {
        width: '8px',
    },
    '&::-webkit-scrollbar-track': {
        background: theme.palette.background.default,
    },
    '&::-webkit-scrollbar-thumb': {
        background: theme.palette.primary.main,
        borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        background: theme.palette.primary.dark,
    },
}));

export const DialogComponent = () => {
    const { dialogOpen, dialogTitle, dialogContent, fullScreen, closeDialog } =
        useDialog();

    return (
        <Dialog fullScreen={fullScreen} open={dialogOpen} onClose={closeDialog}>
            <DialogTitle
                display="flex"
                alignItems="center"
                justifyContent={fullScreen ? 'flex-start' : 'space-between'}
                gap={4}
                p={2}
            >
                <Typography fontWeight="bold" sx={{ order: +fullScreen }}>
                    {dialogTitle || 'Модальное окно'}
                </Typography>
                <IconButton size="small" onClick={closeDialog}>
                    <Close />
                </IconButton>
            </DialogTitle>
            <StyledDialogContent dividers>
                <Box>{dialogContent}</Box>
            </StyledDialogContent>
        </Dialog>
    );
};
