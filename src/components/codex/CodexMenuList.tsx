import React from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Unstable_Grid2 as Grid,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { Clear, ExpandMore } from '@mui/icons-material';
import { useStores } from '@src/providers/rootStoreContext';
import { ScrollableBox } from '@src/components/common/ScrollableBox';
import { CodexMenuItem } from '@src/components/codex/CodexMenuItem';
import { FlexHeightContainer } from '@src/components/common/FlexHeightContainer';
import { ICodexMenuItem } from '@src/interfaces';

export const CodexMenuList = observer(() => {
    const { scene } = useParams();

    const {
        codex: {
            filterCodexMenuList,
            loadCodexMenuList,
            codexMenuList,
            filteredCodexMenuList,
        },
    } = useStores();

    const searchInputRef = React.useRef<HTMLInputElement>(null);
    const [searchTitle, setSearchTitle] = React.useState('');

    const menuGridWidth = React.useMemo(
        () => (scene ? { xs: 12 } : { xs: 12, md: 6, lg: 4 }),
        [scene]
    );

    const getMarginBottom = (index: number, length: number) => {
        if (!scene) return 0;

        return index === length - 1 ? 0 : '1rem';
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSearchTitle(value);
        filterCodexMenuList(value);
    };

    const handleReset = () => {
        setSearchTitle('');
        filterCodexMenuList('');
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    };

    React.useEffect(() => {
        loadCodexMenuList();
    }, [loadCodexMenuList]);

    const searchIcon = (
        <InputAdornment position="start">
            <IconButton onClick={handleReset} color="primary">
                <Clear fontSize="small" />
            </IconButton>
        </InputAdornment>
    );

    const header = (
        <Stack spacing={2} pb={2}>
            <Typography variant="h3" component="h3">
                Сцены
            </Typography>
            <Stack
                direction="row"
                alignItems="flex-end"
                spacing={1}
                sx={{
                    width: scene ? 'calc(100% - var(--border-width))' : '100%',
                }}
            >
                <TextField
                    inputRef={searchInputRef}
                    placeholder="Поиск..."
                    size="small"
                    variant="standard"
                    sx={{ width: '100%' }}
                    value={searchTitle}
                    onChange={handleSearchChange}
                    InputProps={{
                        startAdornment: searchIcon,
                    }}
                />
            </Stack>
        </Stack>
    );

    // const content = (
    //     <ScrollableBox bgcolor="default" disableCustomScroll={!scene}>
    //         <Grid container spacing={scene ? 0 : 2}>
    //             {filteredCodexMenuList.length ? (
    //                 filteredCodexMenuList.map(
    //                     (scene: ICodexMenuItem, index: number) => (
    //                         <Grid
    //                             key={scene.sceneId}
    //                             {...menuGridWidth}
    //                             sx={{
    //                                 mb: getMarginBottom(
    //                                     index,
    //                                     filteredCodexMenuList.length
    //                                 ),
    //                             }}
    //                         >
    //                             <CodexMenuItem scene={scene} />
    //                         </Grid>
    //                     )
    //                 )
    //             ) : (
    //                 <Grid py={2}>
    //                     <Typography variant="body2" color="text.secondary">
    //                         Ничего не найдено
    //                     </Typography>
    //                 </Grid>
    //             )}
    //         </Grid>
    //     </ScrollableBox>
    // );

    const content = (
        <ScrollableBox bgcolor="default" disableCustomScroll={!scene}>
            <Box>
                {codexMenuList.length ? (
                    codexMenuList.map((part) => (
                        <Accordion key={part.part}>
                            <AccordionSummary expandIcon={<ExpandMore />}>
                                <Typography variant="h5">
                                    {part.title}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={scene ? 0 : 2}>
                                    {part.content.map((scene, index) => (
                                        <Grid
                                            key={scene.sceneId}
                                            {...menuGridWidth}
                                            sx={{
                                                mb: getMarginBottom(
                                                    index,
                                                    filteredCodexMenuList.length
                                                ),
                                            }}
                                        >
                                            <CodexMenuItem scene={scene} />
                                        </Grid>
                                    ))}
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    ))
                ) : (
                    <Typography variant="body2" color="text.secondary">
                        Ничего не найдено
                    </Typography>
                )}
            </Box>
        </ScrollableBox>
    );

    return (
        <Box>
            <FlexHeightContainer header={header} content={content} />
        </Box>
    );
});
