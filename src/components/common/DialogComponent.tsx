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
            <DialogContent dividers>
                <Box>{dialogContent}</Box>
            </DialogContent>
        </Dialog>
    );
};
