import React, { useEffect, useMemo, useRef } from 'react';
import { useTheme, alpha } from '@mui/material/styles';

interface Raindrop {
    x: number;
    y: number;
    length: number;
    speed: number;
}

export const RainEffect: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const theme = useTheme();
    const raindrops: Raindrop[] = useMemo(() => [], []);

    const rainColor = alpha(theme.palette.common.white, 0.3);
    const density = 100;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        const createRaindrops = () => {
            for (let i = 0; i < density; i++) {
                raindrops.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    length: Math.random() * 20 + 10,
                    speed: Math.random() * 5 + 2,
                });
            }
        };

        const drawRaindrops = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.strokeStyle = rainColor;
            context.lineWidth = 1;

            raindrops.forEach((drop) => {
                context.beginPath();
                context.moveTo(drop.x, drop.y);
                context.lineTo(drop.x, drop.y + drop.length);
                context.stroke();

                drop.y += drop.speed;
                if (drop.y > canvas.height) {
                    drop.y = -drop.length;
                }
            });
        };

        const animate = () => {
            drawRaindrops();
            requestAnimationFrame(animate);
        };

        createRaindrops();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [rainColor, raindrops]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
            }}
        />
    );
};
