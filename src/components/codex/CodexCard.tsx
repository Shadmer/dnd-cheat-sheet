import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { Box, IconButton, Paper, Stack, Typography } from '@mui/material';
import { Clear } from '@mui/icons-material';
import { useStores } from '@src/providers/RootStoreContext';
import { ScrollableBox } from '@src/components/common/ScrollableBox';
import { MarkdownRenderer } from '@src/components/common/MarkdownRenderer';
import { FlexHeightContainer } from '@src/components/common/FlexHeightContainer';

export const CodexCard = observer(() => {
    const params = useParams();
    const {
        codex: { loadScene, clearScene, currentScene, codexMenuList },
    } = useStores();

    const currentSection = codexMenuList.find(
        (section) => section.section === params.section
    );

    const codexSectionTitle = currentSection?.title ?? '';

    const codexItemTitle =
        currentSection?.content.find((item) => item.id === params.id)?.name ??
        'Кодекс мастера';

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

            {currentSection && (
                <IconButton component={Link} to="../codex" color="primary">
                    <Clear />
                </IconButton>
            )}
        </Stack>
    );

    const defaultContentText = (
        <Stack spacing={2}>
            <Box>
                <Typography variant="h3" gutterBottom>
                    Игроки
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Здесь вы найдете всю необходимую информацию о героях вашего
                    приключения, от их имен и характеристик до уникальных
                    историй и личных целей.
                </Typography>
            </Box>
            <Box>
                <Typography variant="h3" gutterBottom>
                    Персонажи мастера
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Этот раздел представляет собой галерею персонажей, которыми
                    управляет мастер. От верных союзников до зловещих врагов,
                    здесь вы найдете всех, кого герои могут встретить.
                </Typography>
            </Box>
            <Box>
                <Typography variant="h3" gutterBottom>
                    Бестиарий
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Встречайте чудовищ и монстров вашего мира! Здесь вы найдете
                    подробные описания существ, их способностей, поведения и
                    мест обитания.
                </Typography>
            </Box>
            <Box>
                <Typography variant="h3" gutterBottom>
                    Интересные места
                </Typography>
                <Typography variant="body1" gutterBottom>
                    От тихих деревень до величественных замков, этот раздел
                    содержит описание всех мест, которые герои могут исследовать
                    во время своего путешествия.
                </Typography>
            </Box>
            <Box>
                <Typography variant="h3" gutterBottom>
                    Артефакты и способности
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Здесь собраны все магические артефакты и уникальные
                    способности, которые герои могут обнаружить во время своих
                    приключений.
                </Typography>
            </Box>
            <Box>
                <Typography variant="h3" gutterBottom>
                    Заметки
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Этот раздел предназначен для хранения ваших заметок,
                    таинственных записок и карт, которые могут пригодиться во
                    время игры.
                </Typography>
            </Box>
        </Stack>
    );

    const content = (
        <ScrollableBox>
            <Box p="2rem">
                {/* <MarkdownRenderer markdown={currentScene} /> */}
                {currentSection ? 'Контент' : defaultContentText}
            </Box>
        </ScrollableBox>
    );

    return (
        <Paper>
            <FlexHeightContainer header={header} content={content} />
        </Paper>
    );
});
