import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import {
    Clear,
    ExpandMore,
    DirectionsOff,
    Star,
    StarBorder,
} from '@mui/icons-material';
import { useStores } from '@src/providers/RootStoreContext';
import { ScrollableBox } from '@src/components/common/ScrollableBox';
import { FlexHeightContainer } from '@src/components/common/FlexHeightContainer';
import {
    FaUserFriends,
    FaUserTie,
    FaDragon,
    FaMapMarkedAlt,
    FaGavel,
    FaStickyNote,
} from 'react-icons/fa';

const iconMap: Record<string, React.ReactNode> = {
    players: <FaUserFriends />,
    characters: <FaUserTie />,
    bestiary: <FaDragon />,
    places: <FaMapMarkedAlt />,
    artifacts: <FaGavel />,
    notes: <FaStickyNote />,
};

export const CodexMenuList = observer(() => {
    const params = useParams();
    const navigate = useNavigate();

    const {
        codex: {
            filterCodexMenuList,
            loadCodexMenuList,
            filteredCodexMenuList,
        },
    } = useStores();

    const searchInputRef = React.useRef<HTMLInputElement>(null);
    const [searchTitle, setSearchTitle] = React.useState('');
    const [openSections, setOpenSections] = React.useState<
        Record<string, boolean>
    >({});
    const [prevOpenSections, setPrevOpenSections] = React.useState<
        Record<string, boolean>
    >({});

    const [favorites, setFavorites] = React.useState<
        Record<string, Record<string, boolean>>
    >({});

    const isSelected = (section: string, id: string) => {
        return params.section === section && params.id === id;
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        setSearchTitle(value);

        if (!value) {
            setOpenSections(prevOpenSections);
        }

        filterCodexMenuList(value);
    };

    const handleReset = () => {
        setSearchTitle('');
        filterCodexMenuList('');
        setOpenSections(prevOpenSections);

        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    };

    const handleToggleOpeningItem = (section: string) => {
        setOpenSections((prevState) => {
            const updatedOpenSections = {
                ...prevState,
                [section]: !prevState[section],
            };

            if (!searchTitle) {
                setPrevOpenSections(updatedOpenSections);
            }

            return updatedOpenSections;
        });
    };

    const handleCloseAllSections = () => {
        setOpenSections({});
        setPrevOpenSections({});
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
        console.log('favorites', favorites);
    }, [favorites]);

    React.useEffect(() => {
        loadCodexMenuList();
    }, [loadCodexMenuList]);

    React.useEffect(() => {
        if (searchTitle) {
            const newOpenSections: Record<string, boolean> = {};
            filteredCodexMenuList.forEach((category) => {
                newOpenSections[category.section] = true;
            });
            setOpenSections(newOpenSections);
        }
    }, [searchTitle, filteredCodexMenuList]);

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
                    }}
                />
                <Tooltip title="Закрыть все">
                    <IconButton
                        sx={{
                            color: 'primary.main',
                        }}
                        onClick={handleCloseAllSections}
                        size="small"
                    >
                        <DirectionsOff />
                    </IconButton>
                </Tooltip>
            </Stack>
        </Stack>
    );

    const content = (
        <ScrollableBox bgcolor="default">
            <List component="nav" sx={{ bgcolor: 'background.paper' }}>
                {filteredCodexMenuList.length ? (
                    filteredCodexMenuList.map((category) => (
                        <React.Fragment key={category.section}>
                            {category.content.length ? (
                                <>
                                    <ListItemButton
                                        onClick={() =>
                                            handleToggleOpeningItem(
                                                category.section
                                            )
                                        }
                                    >
                                        <ListItemIcon
                                            sx={{
                                                color: 'primary.main',
                                            }}
                                        >
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
                                                transform: openSections[
                                                    category.section
                                                ]
                                                    ? 'rotate(180deg)'
                                                    : 'rotate(0deg)',
                                                transition:
                                                    'transform 0.3s ease',
                                                color: 'primary.main',
                                            }}
                                        />
                                    </ListItemButton>
                                    <Collapse
                                        in={openSections[category.section]}
                                        timeout="auto"
                                        unmountOnExit
                                    >
                                        <List component="div" disablePadding>
                                            {category.content.map((item) => (
                                                <ListItemButton
                                                    key={item.id}
                                                    sx={{
                                                        pl: 4,
                                                    }}
                                                    selected={isSelected(
                                                        category.section,
                                                        item.id
                                                    )}
                                                    onClick={() =>
                                                        navigate(
                                                            `../codex/${category.section}/${item.id}`
                                                        )
                                                    }
                                                >
                                                    <ListItemIcon>
                                                        <IconButton
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleIconClick(
                                                                    category.section,
                                                                    item.id
                                                                );
                                                            }}
                                                        >
                                                            {favorites[
                                                                category.section
                                                            ]?.[item.id] ? (
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
                                                    <ListItemText
                                                        primary={item.name}
                                                    />
                                                </ListItemButton>
                                            ))}
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
});
