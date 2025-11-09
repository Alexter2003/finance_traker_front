import { useState, useEffect } from 'react';
import { apiClient } from '../../core/api';
import type { AxiosRequestConfig } from 'axios';

interface UseApiOptions {
    url: string;
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    data?: unknown;
    config?: AxiosRequestConfig;
    immediate?: boolean;
}

interface UseApiReturn<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
    execute: () => Promise<void>;
    reset: () => void;
}

function useApi<T = unknown>({
    url,
    method = 'GET',
    data: requestData,
    config,
    immediate = false,
}: UseApiOptions): UseApiReturn<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const execute = async () => {
        setLoading(true);
        setError(null);

        try {
            let response;
            switch (method) {
                case 'GET':
                    response = await apiClient.get<T>(url, config);
                    break;
                case 'POST':
                    response = await apiClient.post<T>(url, requestData, config);
                    break;
                case 'PUT':
                    response = await apiClient.put<T>(url, requestData, config);
                    break;
                case 'PATCH':
                    response = await apiClient.patch<T>(url, requestData, config);
                    break;
                case 'DELETE':
                    response = await apiClient.delete<T>(url, config);
                    break;
                default:
                    throw new Error(`Unsupported method: ${method}`);
            }

            setData(response.data);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Unknown error'));
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setData(null);
        setError(null);
        setLoading(false);
    };

    useEffect(() => {
        if (immediate) {
            execute();
        }
    }, [immediate]);

    return { data, loading, error, execute, reset };
}

export default useApi;

