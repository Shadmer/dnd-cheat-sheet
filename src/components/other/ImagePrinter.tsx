import React from 'react';
import { observer } from 'mobx-react-lite';
import { useReactToPrint } from 'react-to-print';
import { Box, Button, Grid } from '@mui/material';

import { useStores } from '@src/providers/RootStoreContext';

export const ImagePrinter: React.FC = observer(() => {
    // const {
    //     image: { loadImage, imageUrl },
    // } = useStores();

    // React.useEffect(() => {
    //     loadImage('images/test.jpg');
    // }, [loadImage]);

    const componentRef = React.useRef<HTMLDivElement>(null);
    const [images, setImages] = React.useState<string[]>([]);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <Box>
            <div ref={componentRef}>
                <Grid container spacing={2}>
                    {images.map((image, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <img
                                src={image}
                                alt={`some_image ${index + 1}`}
                                style={{ maxWidth: '100%' }}
                            />
                        </Grid>
                    ))}
                </Grid>
            </div>
            <Button
                variant="contained"
                color="primary"
                onClick={handlePrint}
                sx={{ mt: 2 }}
            >
                Печать изображений
            </Button>
        </Box>
    );
});
