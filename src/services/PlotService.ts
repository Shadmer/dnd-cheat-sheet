export const PlotService = () => {
    const fetchPlots = async () => {
        try {
            const response = await fetch('/data/plots.json', {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch plots');
            }
            const plots = await response.json();
            return plots;
        } catch (error) {
            console.error('Error fetching plots:', error);
            return [];
        }
    };

    return {
        fetchPlots,
    };
};
