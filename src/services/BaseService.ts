const BASE_URL = '/dnd-cheat-sheet/data/';

type RequestOptions = {
    headers?: Record<string, string>;
    method?: string;
    body?: string | FormData;
};

export const BaseService = async <T>(
    endpoint: string,
    options?: RequestOptions
): Promise<T | []> => {
    const url = BASE_URL + endpoint;
    const defaultHeaders = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    };

    try {
        const response = await fetch(url, {
            headers: { ...defaultHeaders, ...options?.headers },
            ...options,
        });

        if (!response.ok) {
            throw new Error('Failed to fetch');
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching:', error);
        return [];
    }
};
