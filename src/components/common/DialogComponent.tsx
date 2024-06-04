import React from 'react';
import { Dialog, IconButton, Box } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useDialog } from '@src/providers/DialogProvider';

export const DialogComponent = () => {
    const { dialogOpen, dialogContent, closeDialog } = useDialog();

    return (
        <Dialog open={dialogOpen} onClose={closeDialog}>
            <Box sx={{ position: 'relative', padding: 2 }}>
                <IconButton
                    onClick={closeDialog}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: 'primary.main',
                    }}
                >
                    <Close />
                </IconButton>
                {dialogContent}
            </Box>
        </Dialog>
    );
};
