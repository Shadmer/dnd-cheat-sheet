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
    SearchOff,
} from '@mui/icons-material';
import { FaStickyNote } from 'react-icons/fa';

import { iconMap } from '@src/constants/iconMap';
import { IMenuList, IMenuItem } from '@src/interfaces/common';
import { Module } from '@src/constants/enums';
import { useNavigateWithSave } from '@src/providers/NavigateWithSaveProvider';
import { useCustomTheme } from '@src/providers/CustomThemeProvider';
import { ScrollableBox } from '@src/components/common/ScrollableBox';
import { FlexHeightContainer } from '@src/components/common/FlexHeightContainer';
import { moduleMap } from '@src/constants/constants';

type MainMenuListProps = {
    module: Module;
    params: Params<string>;
    filteredMenuList: IMenuList[];
    filterMenuList: (searchTitle: string) => void;
    onItemSelect?: () => void;
};

export const MainMenuList = observer(
    ({
        module,
        params,
        filteredMenuList,
        filterMenuList,
        onItemSelect,
    }: MainMenuListProps) => {
        const { mode } = useCustomTheme();
        const { navigateWithSave } = useNavigateWithSave();

        const searchInputRef = React.useRef<HTMLInputElement>(null);
        const [searchTitle, setSearchTitle] = React.useState('');
        const [openSections, setOpenSections] = React.useState<Record<
            string,
            boolean
        > | null>(params.section ? { [params.section]: true } : null);

        const hasOpenSections = React.useMemo(
            () =>
                filteredMenuList.some(
                    (category) => openSections?.[category.section]
                ),
            [filteredMenuList, openSections]
        );

        const isSelected = (section: string, id: string) =>
            params.section === section && params.id === id;
        const openAllSections = React.useCallback(() => {
            const newOpenSections: Record<string, boolean> = {};
            filteredMenuList.forEach((category) => {
                newOpenSections[category.section] = true;
            });
            setOpenSections(newOpenSections);
        }, [filteredMenuList]);

        const closeAllSections = () => {
            setOpenSections(null);
        };

        const handleSearchChange = (
            event: React.ChangeEvent<HTMLInputElement>
        ) => {
            const { value } = event.target;

            setSearchTitle(value);
            filterMenuList(value);
        };

        const handleReset = () => {
            setSearchTitle('');
            filterMenuList('');

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
                <Typography variant="h3" component="h3" fontFamily="ofont">
                    {moduleMap[module].title}
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

        const innerListItemButton = (category: IMenuList, item: IMenuItem) => (
            <ListItemButton
                key={item.id}
                sx={{
                    pl: 4,
                    '&.Mui-selected': {
                        backgroundColor: (theme) =>
                            mode === 'light'
                                ? lighten(theme.palette.primary.main, 0.8)
                                : darken(theme.palette.primary.main, 0.4),
                        boxShadow: (theme) =>
                            `0px 4px 8px ${
                                theme.palette.mode === 'light'
                                    ? lighten(theme.palette.primary.main, 0.4)
                                    : darken(theme.palette.primary.main, 0.6)
                            }`,
                        transform: 'translateY(-2px)',
                        transition:
                            'background-color 0.3s, box-shadow 0.3s, transform 0.3s',
                        zIndex: 1,
                    },
                }}
                selected={isSelected(category.section, item.id)}
                onClick={() => {
                    onItemSelect && onItemSelect();
                    navigateWithSave(
                        `${moduleMap[module].navigationPrefix}/${category.section}/${item.id}`,
                        moduleMap[module].lastPage
                    );
                }}
            >
                <ListItemText primary={item.name} />
            </ListItemButton>
        );

        const content = (
            <ScrollableBox>
                <List component="nav">
                    {filteredMenuList.length ? (
                        filteredMenuList.map((category) => (
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

        React.useEffect(() => {
            if (searchTitle) {
                openAllSections();
            }
        }, [openAllSections, searchTitle]);

        return <FlexHeightContainer header={header} content={content} />;
    }
);
