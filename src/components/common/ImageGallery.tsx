import React from 'react';
import { observer } from 'mobx-react-lite';
import {
    ImageList,
    ImageListItem,
    useMediaQuery,
    useTheme,
    CircularProgress,
    Box,
} from '@mui/material';
import Lightbox from 'react-18-image-lightbox';
import 'react-18-image-lightbox/style.css';

import { ImageService } from '@src/services/ImageService';
import { useCampaign } from '@src/providers/CampaignProvider';

interface ImageGalleryProps {
    images: string[];
    alt?: string;
    noLightBox?: boolean;
}

export const ImageGallery: React.FC<ImageGalleryProps> = observer(
    ({ images, alt, noLightBox = false }) => {
        const { currentCampaign } = useCampaign();
        const theme = useTheme();
        const [isOpen, setIsOpen] = React.useState(false);
        const [photoIndex, setPhotoIndex] = React.useState(0);
        const [imageUrls, setImageUrls] = React.useState<string[]>([]);
        const [loading, setLoading] = React.useState(false);
        const imageService = React.useMemo(() => ImageService(), []);

        const isXs = useMediaQuery(theme.breakpoints.only('xs'));
        const isSm = useMediaQuery(theme.breakpoints.only('sm'));

        const getCols = React.useCallback(() => {
            if (noLightBox) return 1;

            let cols = 3;
            if (isXs) cols = 1;
            if (isSm) cols = 2;
            return Math.min(cols, images.length);
        }, [images, isSm, isXs, noLightBox]);

        const loadImages = React.useCallback(async () => {
            const campaignUrl = currentCampaign;

            try {
                setLoading(true);
                const result = await imageService.fetchImages(
                    campaignUrl,
                    images
                );
                const mappedResult = result.map((item) =>
                    URL.createObjectURL(item)
                );
                setImageUrls(mappedResult);
            } finally {
                setLoading(false);
            }
        }, [currentCampaign, imageService, images]);

        const handleImageClick = (index: number) => {
            if (noLightBox) return;

            setPhotoIndex(index);
            setIsOpen(true);
        };

        React.useEffect(() => {
            loadImages();
        }, [loadImages]);

        return (
            <>
                {loading ? (
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
                    <ImageList
                        variant="masonry"
                        cols={getCols()}
                        sx={{ overflow: 'hidden', margin: '0' }}
                    >
                        {imageUrls.map((item, index) => (
                            <ImageListItem
                                key={index}
                                onClick={() => handleImageClick(index)}
                                sx={{
                                    marginBottom: noLightBox
                                        ? '0 !important'
                                        : 'auto',
                                }}
                            >
                                <img
                                    src={item}
                                    alt={
                                        `${alt}-${index + 1}` ||
                                        `Image-${index + 1}`
                                    }
                                    loading="lazy"
                                    style={{
                                        cursor: noLightBox
                                            ? 'default'
                                            : 'pointer',
                                    }}
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                )}
                {isOpen && (
                    <Lightbox
                        mainSrc={imageUrls[photoIndex]}
                        nextSrc={imageUrls[(photoIndex + 1) % imageUrls.length]}
                        prevSrc={
                            imageUrls[
                                (photoIndex + imageUrls.length - 1) %
                                    imageUrls.length
                            ]
                        }
                        onCloseRequest={() => setIsOpen(false)}
                        onMovePrevRequest={() =>
                            setPhotoIndex(
                                (photoIndex + imageUrls.length - 1) %
                                    imageUrls.length
                            )
                        }
                        onMoveNextRequest={() =>
                            setPhotoIndex((photoIndex + 1) % imageUrls.length)
                        }
                    />
                )}
            </>
        );
    }
);

export default ImageGallery;
