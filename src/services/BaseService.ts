const BASE_URL = '/dnd-cheat-sheet/data';

type RequestOptions = {
    headers?: Record<string, string>;
    method?: string;
    body?: string | FormData;
};

export const BaseService = async <T>(
    endpoint: string,
    options?: RequestOptions
): Promise<T> => {
    const url = BASE_URL + endpoint;
    const defaultHeaders = options?.headers || {};

    try {
        const response = await fetch(url, {
            headers: { ...defaultHeaders },
            ...options,
        });

        if (!response.ok) {
            throw new Error('Failed to fetch');
        }
        const contentType = response.headers.get('Content-Type');

        if (
            contentType?.includes('text/markdown') ||
            contentType?.includes('text/plain')
        ) {
            return response.text() as unknown as T;
        }

        if (contentType?.includes('image/')) {
            return response.blob() as unknown as T;
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching:', error);
        return Promise.reject(error);
    }
};
