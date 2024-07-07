import React from 'react';
import { Params } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import {
    Collapse,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    TextField,
    Typography,
    Tooltip,
} from '@mui/material';
import { darken, lighten } from '@mui/material/styles';
import {
    ExpandMore,
    DirectionsOff,
    Directions,
    Star,
    StarBorder,
    SearchOff,
} from '@mui/icons-material';
import {
    FaUserFriends,
    FaUserTie,
    FaDragon,
    FaMapMarkedAlt,
    FaGavel,
    FaStickyNote,
} from 'react-icons/fa';

import { useStores } from '@src/providers/RootStoreContext';
import { useNavigateWithSave } from '@src/providers/NavigateWithSaveProvider';
import { useCustomTheme } from '@src/providers/CustomThemeProvider';

import { ScrollableBox } from '@src/components/common/ScrollableBox';
import { FlexHeightContainer } from '@src/components/common/FlexHeightContainer';

import { LastPageType, NavigationRoute } from '@src/enums';
import { ICodexMenuList, ICodexMenuItem } from '@src/interfaces';

const iconMap: Record<string, React.ReactNode> = {
    players: <FaUserFriends />,
    characters: <FaUserTie />,
    bestiary: <FaDragon />,
    places: <FaMapMarkedAlt />,
    artifacts: <FaGavel />,
    notes: <FaStickyNote />,
};

type CodexMenuListProps = {
    params: Params<string>;
    onItemSelect?: () => void;
};

export const CodexMenuList = observer(
    ({ params, onItemSelect }: CodexMenuListProps) => {
        const { navigateWithSave } = useNavigateWithSave();
        const { mode } = useCustomTheme();

        const {
            codex: {
                filterCodexMenuList,
                loadCodexMenuList,
                filteredCodexMenuList,
            },
        } = useStores();

        const searchInputRef = React.useRef<HTMLInputElement>(null);
        const [searchTitle, setSearchTitle] = React.useState('');
        const [openSections, setOpenSections] = React.useState<Record<
            string,
            boolean
        > | null>(params.section ? { [params.section]: true } : null);
        const [favorites, setFavorites] = React.useState<
            Record<string, Record<string, boolean>>
        >({});

        const hasOpenSections = React.useMemo(
            () =>
                filteredCodexMenuList.some(
                    (category) => openSections?.[category.section]
                ),
            [filteredCodexMenuList, openSections]
        );

        const isSelected = (section: string, id: string) =>
            params.section === section && params.id === id;
        const openAllSections = React.useCallback(() => {
            const newOpenSections: Record<string, boolean> = {};
            filteredCodexMenuList.forEach((category) => {
                newOpenSections[category.section] = true;
            });
            setOpenSections(newOpenSections);
        }, [filteredCodexMenuList]);

        const closeAllSections = () => {
            setOpenSections(null);
        };

        const handleSearchChange = (
            event: React.ChangeEvent<HTMLInputElement>
        ) => {
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

        const handleToggleOpeningItems = () => {
            if (hasOpenSections) {
                closeAllSections();
            } else {
                openAllSections();
            }
        };

        const handleToggleOpeningItem = (section: string) => {
            setOpenSections((prevState) => {
                const updatedOpenSections = {
                    ...prevState,
                    [section]: !prevState?.[section],
                };

                return updatedOpenSections;
            });
        };
        const handleIconClick = (section: string, id: string) => {
            setFavorites((prevState) => {
                const newState = { ...prevState };

                if (newState[section]?.[id]) {
                    delete newState[section][id];
                    if (Object.keys(newState[section]).length === 0) {
                        delete newState[section];
                    }
                } else {
                    if (!newState[section]) {
                        newState[section] = {};
                    }
                    newState[section][id] = true;
                }

                return newState;
            });
        };

        // TODO: создать стор для favorites
        React.useEffect(() => {
            // console.log('favorites', favorites);
        }, [favorites]);

        React.useEffect(() => {
            loadCodexMenuList();
        }, [loadCodexMenuList]);

        React.useEffect(() => {
            if (searchTitle) {
                openAllSections();
            }
        }, [openAllSections, searchTitle]);

        const searchIcon = (
            <InputAdornment position="start">
                <IconButton onClick={handleReset}>
                    <SearchOff fontSize="small" />
                </IconButton>
            </InputAdornment>
        );

        const toggleOpening = (
            <Tooltip title={hasOpenSections ? 'Закрыть всё' : 'Открыть всё'}>
                <IconButton onClick={handleToggleOpeningItems} size="small">
                    {hasOpenSections ? (
                        <DirectionsOff fontSize="small" />
                    ) : (
                        <Directions fontSize="small" />
                    )}
                </IconButton>
            </Tooltip>
        );

        const header = (
            <Stack spacing={2} pb={2}>
                <Typography variant="h3" component="h3">
                    Кодекс
                </Typography>
                <Stack
                    direction="row"
                    alignItems="flex-end"
                    spacing={1}
                    sx={{
                        width: 'calc(100% - var(--border-width))',
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
                            endAdornment: toggleOpening,
                        }}
                    />
                </Stack>
            </Stack>
        );

        const availableFavorites = (section: string) => {
            // TODO: раскомментировать после начала работы над Полем битвы
            // const favorites = ['players', 'characters', 'bestiary', 'places'];
            // return favorites.includes(section);
            return [''].includes(section);
        };

        const innerListItemButton = (
            category: ICodexMenuList,
            item: ICodexMenuItem
        ) => (
            <ListItemButton
                key={item.id}
                sx={{
                    pl: 4,
                    '&.Mui-selected': {
                        backgroundColor: (theme) =>
                            mode === 'light'
                                ? lighten(theme.palette.primary.main, 0.8)
                                : darken(theme.palette.primary.main, 0.4),
                    },
                }}
                selected={isSelected(category.section, item.id)}
                onClick={() => {
                    onItemSelect && onItemSelect();
                    navigateWithSave(
                        `${NavigationRoute.codex}/${category.section}/${item.id}`,
                        LastPageType.codex
                    );
                }}
            >
                {availableFavorites(category.section) && (
                    <ListItemIcon>
                        <IconButton
                            onClick={(e) => {
                                e.stopPropagation();
                                handleIconClick(category.section, item.id);
                            }}
                        >
                            {favorites[category.section]?.[item.id] ? (
                                <Star
                                    sx={{
                                        color: 'secondary.main',
                                    }}
                                />
                            ) : (
                                <StarBorder />
                            )}
                        </IconButton>
                    </ListItemIcon>
                )}
                <ListItemText primary={item.name} />
            </ListItemButton>
        );

        const content = (
            <ScrollableBox>
                <List component="nav">
                    {filteredCodexMenuList.length ? (
                        filteredCodexMenuList.map((category) => (
                            <React.Fragment key={category.section}>
                                {category.content.length ? (
                                    <>
                                        <ListItemButton
                                            sx={{
                                                marginTop: 2,
                                                columnGap: '10px',
                                                bgcolor: 'background.paper',
                                                borderBottom: openSections?.[
                                                    category.section
                                                ]
                                                    ? '1px solid'
                                                    : 'none',
                                                '&:hover': {
                                                    background: (theme) =>
                                                        darken(
                                                            theme.palette
                                                                .background
                                                                .paper,
                                                            0.1
                                                        ),
                                                },
                                                '&:first-of-type': {
                                                    marginTop: 0,
                                                },
                                            }}
                                            onClick={() =>
                                                handleToggleOpeningItem(
                                                    category.section
                                                )
                                            }
                                        >
                                            <ListItemIcon>
                                                {iconMap[category.section] || (
                                                    <FaStickyNote />
                                                )}
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={category.title}
                                                primaryTypographyProps={{
                                                    fontWeight: 'medium',
                                                }}
                                            />
                                            <ExpandMore
                                                sx={{
                                                    transform: openSections?.[
                                                        category.section
                                                    ]
                                                        ? 'rotate(180deg)'
                                                        : 'rotate(0deg)',
                                                    transition:
                                                        'transform 0.3s ease',
                                                }}
                                            />
                                        </ListItemButton>
                                        <Collapse
                                            in={
                                                openSections?.[category.section]
                                            }
                                            timeout="auto"
                                            unmountOnExit
                                        >
                                            <List
                                                component="div"
                                                disablePadding
                                                sx={{
                                                    bgcolor:
                                                        'background.default',
                                                }}
                                            >
                                                {category.content.map((item) =>
                                                    innerListItemButton(
                                                        category,
                                                        item
                                                    )
                                                )}
                                            </List>
                                        </Collapse>
                                    </>
                                ) : null}
                            </React.Fragment>
                        ))
                    ) : (
                        <ListItem>
                            <Typography variant="body2" color="text.secondary">
                                Ничего не найдено
                            </Typography>
                        </ListItem>
                    )}
                </List>
            </ScrollableBox>
        );

        return <FlexHeightContainer header={header} content={content} />;
    }
);
