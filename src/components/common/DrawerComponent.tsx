import React from 'react';
import { Drawer, IconButton, Box } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useDrawer } from '@src/providers/DrawerProvider';

export const DrawerComponent = () => {
    const { drawerOpen, drawerContent, closeDrawer } = useDrawer();

    return (
        <Drawer open={drawerOpen} onClose={closeDrawer}>
            <Box sx={{ position: 'relative', padding: 2 }}>
                <IconButton
                    onClick={closeDrawer}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: 'primary.main',
                    }}
                >
                    <Close />
                </IconButton>
                {drawerContent}
            </Box>
        </Drawer>
    );
};
