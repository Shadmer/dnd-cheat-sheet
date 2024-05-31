// import React from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { observer } from 'mobx-react-lite';

// import { Box, IconButton, Paper, Stack, Typography } from '@mui/material';
// import { ArrowBack, ArrowForward, Clear } from '@mui/icons-material';
// import { useStores } from '@src/providers/rootStoreContext';
// import { ScrollableBox } from '@src/components/common/ScrollableBox';
// import { MarkdownRenderer } from '@src/components/common/MarkdownRenderer';
// import { FlexHeightContainer } from '@src/components/common/FlexHeightContainer';

// export const CodexCard = observer(() => {
//     const { scene } = useParams();
//     const {
//         codex: { loadScene, clearScene, currentScene, codexMenuList },
//     } = useStores();

//     const codexMenuTitle =
//         codexMenuList.find((item) => item.sceneId === scene)?.title ?? '';

//     const codexMenuSubTitle =
//         codexMenuList.find((item) => item.sceneId === scene)?.subTitle ?? '';

//     const currentIndex = codexMenuList.findIndex(
//         (item) => item.sceneId === scene
//     );

//     const prevScene =
//         currentIndex > 0
//             ? `../codex/${codexMenuList[currentIndex - 1].sceneId}`
//             : '';

//     const nextScene =
//         currentIndex < codexMenuList.length - 1
//             ? `../codex/${codexMenuList[currentIndex + 1].sceneId}`
//             : '';

//     React.useEffect(() => {
//         if (scene) loadScene(scene);

//         return () => {
//             clearScene();
//         };
//     }, [clearScene, loadScene, scene]);

//     const header = (
//         <Stack
//             direction="row"
//             alignItems="flex-start"
//             justifyContent="space-between"
//             p="1rem 2rem"
//             bgcolor="background.paper"
//             boxShadow={1}
//         >
//             <Box>
//                 <Typography variant="body2" component="p">
//                     {codexMenuSubTitle}
//                 </Typography>
//                 <Typography fontWeight="500" variant="h2" component="h1">
//                     {codexMenuTitle}
//                 </Typography>
//             </Box>

//             <IconButton component={Link} to="../codex" color="primary">
//                 <Clear />
//             </IconButton>
//         </Stack>
//     );

//     const content = (
//         <ScrollableBox>
//             <Box p="2rem">
//                 <MarkdownRenderer markdown={currentScene} />
//             </Box>
//         </ScrollableBox>
//     );

//     const footer = (
//         <Stack
//             direction="row"
//             alignItems="center"
//             justifyContent="space-between"
//             p={1}
//             bgcolor="background.paper"
//         >
//             <IconButton
//                 component={Link}
//                 disabled={currentIndex === 0}
//                 to={prevScene}
//                 color="primary"
//             >
//                 <ArrowBack />
//             </IconButton>
//             <IconButton
//                 component={Link}
//                 disabled={currentIndex === codexMenuList.length - 1}
//                 to={nextScene}
//                 color="primary"
//             >
//                 <ArrowForward />
//             </IconButton>
//         </Stack>
//     );

//     return (
//         <Paper>
//             <FlexHeightContainer
//                 header={header}
//                 content={content}
//                 footer={footer}
//             />
//         </Paper>
//     );
// });

export {};
