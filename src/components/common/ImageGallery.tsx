import React, { useState } from 'react';
import {
    ImageList,
    ImageListItem,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import Lightbox from 'react-18-image-lightbox';
import 'react-18-image-lightbox/style.css';
import { IImageData } from '@src/interfaces';

interface ImageGalleryProps {
    images: IImageData[];
    single?: boolean;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
    images,
    single = false,
}) => {
    const theme = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    const isXs = useMediaQuery(theme.breakpoints.only('xs'));
    const isSm = useMediaQuery(theme.breakpoints.only('sm'));
    const isMd = useMediaQuery(theme.breakpoints.only('md'));

    const getCols = () => {
        if (isXs || single) return 1;
        if (isSm) return 2;
        if (isMd) return 3;
        return 3;
    };

    const handleImageClick = (index: number) => {
        setPhotoIndex(index);
        setIsOpen(true);
    };

    return (
        <>
            <ImageList variant="masonry" cols={getCols()} gap={8}>
                {images.map((item, index) => (
                    <ImageListItem
                        key={index}
                        onClick={() => handleImageClick(index)}
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            loading="lazy"
                            style={{ cursor: 'pointer' }}
                        />
                    </ImageListItem>
                ))}
            </ImageList>
            {isOpen && (
                <Lightbox
                    mainSrc={images[photoIndex].image}
                    nextSrc={images[(photoIndex + 1) % images.length].image}
                    prevSrc={
                        images[(photoIndex + images.length - 1) % images.length]
                            .image
                    }
                    onCloseRequest={() => setIsOpen(false)}
                    onMovePrevRequest={() =>
                        setPhotoIndex(
                            (photoIndex + images.length - 1) % images.length
                        )
                    }
                    onMoveNextRequest={() =>
                        setPhotoIndex((photoIndex + 1) % images.length)
                    }
                />
            )}
        </>
    );
};
