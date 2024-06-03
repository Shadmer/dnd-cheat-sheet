import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { Box, IconButton, Paper, Stack, Typography } from '@mui/material';
import { Clear } from '@mui/icons-material';
import { useStores } from '@src/providers/rootStoreContext';
import { ScrollableBox } from '@src/components/common/ScrollableBox';
import { MarkdownRenderer } from '@src/components/common/MarkdownRenderer';
import { FlexHeightContainer } from '@src/components/common/FlexHeightContainer';

export const CodexCard = observer(() => {
    const params = useParams();
    const {
        codex: { loadScene, clearScene, currentScene, codexMenuList },
    } = useStores();

    // const codexSectionTitle =
    //     codexMenuList.find((item) => item.section === params.section)?.title ??
    //     '';

    const currentSection = codexMenuList.find(
        (section) => section.section === params.section
    );

    const codexSectionTitle = currentSection?.title ?? '';

    const codexItemTitle =
        currentSection?.content.find((item) => item.id === params.id)?.name ??
        'Инструкция по применению';

    const header = (
        <Stack
            direction="row"
            alignItems="flex-start"
            justifyContent="space-between"
            p="1rem 2rem"
            bgcolor="background.paper"
            boxShadow={1}
        >
            <Box>
                <Typography variant="body2" component="p">
                    {codexSectionTitle}
                </Typography>
                <Typography fontWeight="500" variant="h2" component="h1">
                    {codexItemTitle}
                </Typography>
            </Box>

            <IconButton component={Link} to="../codex" color="primary">
                <Clear />
            </IconButton>
        </Stack>
    );

    const content = (
        <ScrollableBox>
            <Box p="2rem">
                {/* <MarkdownRenderer markdown={currentScene} /> */}
                Контент
            </Box>
        </ScrollableBox>
    );

    return (
        <Paper>
            <FlexHeightContainer header={header} content={content} />
        </Paper>
    );
});
