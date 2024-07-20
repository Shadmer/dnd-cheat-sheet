import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '@src/providers/RootStoreContext';
import { useCampaign } from '@src/providers/CampaignProvider';
import { FlexHeightContainer } from '@src/components/common/FlexHeightContainer';
import { ScrollableBox } from '@src/components/common/ScrollableBox';
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    CircularProgress,
    Collapse,
    Unstable_Grid2 as Grid,
    Typography,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

export const CampaignPage: React.FC = observer(() => {
    const { setCurrentCampaign, setCurrentCampaignTitle, currentCampaign } =
        useCampaign();
    const {
        campaign: { loadCampaignList, campaignList, isLoading },
    } = useStores();

    const [expanded, setExpanded] = React.useState<string | null>(null);

    React.useEffect(() => {
        loadCampaignList();
    }, [loadCampaignList]);

    const handleExpandClick = (storyGameId: string) => {
        setExpanded((prevExpanded) =>
            prevExpanded === storyGameId ? null : storyGameId
        );
    };

    const getCampaignList = campaignList.length ? (
        campaignList.map((campaign, index) => (
            <Box key={campaign.id}>
                <Box
                    sx={{
                        mt: index ? 2 : 0,
                        mb: 1,
                        p: '.7rem',
                        borderRadius: 1,
                        background: (theme) => theme.palette.primary.main,
                        color: (theme) => theme.palette.primary.contrastText,
                    }}
                >
                    <Typography variant="h5" fontFamily="ofont" gutterBottom>
                        {campaign.title}
                    </Typography>
                </Box>
                <Grid container spacing={2}>
                    {campaign.storyGameList.map((storyGame) => (
                        <Grid key={storyGame.id} xs={12} md={6} lg={4}>
                            <Card
                                sx={{
                                    position: 'relative',
                                    boxShadow: (theme) =>
                                        storyGame.id === currentCampaign
                                            ? `5px 5px 10px 0px ${theme.palette.primary.main}`
                                            : 'none',
                                }}
                            >
                                <CardActionArea
                                    onClick={() => {
                                        setCurrentCampaign(storyGame.id);
                                        setCurrentCampaignTitle(
                                            storyGame.title
                                        );
                                    }}
                                >
                                    <Box
                                        sx={{
                                            position: 'relative',
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={storyGame.image}
                                            alt={storyGame.title}
                                            sx={{
                                                filter:
                                                    storyGame.id ===
                                                    currentCampaign
                                                        ? 'none'
                                                        : 'blur(5px)',
                                                transition: 'filter 0.3s ease',
                                            }}
                                        />
                                        {storyGame.id !== currentCampaign && (
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    backgroundColor:
                                                        'rgba(0, 0, 0, 0.3)',
                                                    zIndex: 1,
                                                }}
                                            />
                                        )}
                                    </Box>
                                    <CardContent
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            gap: 2,
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleExpandClick(storyGame.id);
                                        }}
                                    >
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            sx={{
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace:
                                                    expanded === storyGame.id
                                                        ? 'wrap'
                                                        : 'nowrap',
                                                width: 'calc(100% - 40px)',
                                            }}
                                        >
                                            {storyGame.title}
                                        </Typography>

                                        <ExpandMore
                                            sx={{
                                                transform:
                                                    expanded === storyGame.id
                                                        ? 'rotate(180deg)'
                                                        : 'rotate(0deg)',
                                                transition: 'transform .3s',
                                            }}
                                        />
                                    </CardContent>
                                </CardActionArea>
                                <Collapse
                                    in={expanded === storyGame.id}
                                    timeout="auto"
                                    unmountOnExit
                                >
                                    <CardContent>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {storyGame.description}
                                        </Typography>
                                    </CardContent>
                                </Collapse>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        ))
    ) : (
        <Typography mt={2} variant="body2" color="text.secondary">
            Ничего не найдено
        </Typography>
    );

    const header = (
        <Box pt={1} pb={2}>
            <Typography variant="h2" component="h1" fontFamily="ofont">
                Ваши кампании
            </Typography>
        </Box>
    );

    const content = (
        <ScrollableBox>
            {isLoading ? (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                    }}
                >
                    <CircularProgress />
                </Box>
            ) : (
                getCampaignList
            )}
        </ScrollableBox>
    );

    return <FlexHeightContainer header={header} content={content} />;
});
