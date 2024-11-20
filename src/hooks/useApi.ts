import { useState, useCallback } from 'react';
import api from '../services/api';
import { ApiError } from '../types/api';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
}

export function useApi<T = any>() {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const request = useCallback(async (
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    data?: any,
    mockResponse?: any
  ) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      if (mockResponse) {
        setState({ data: mockResponse, loading: false, error: null });
        return mockResponse;
      }
      const response = await api[method](url, data);
      setState({ data: response.data, loading: false, error: null });
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      setState(prev => ({ ...prev, loading: false, error: apiError }));
      throw apiError;
    }
  }, []);

  return {
    ...state,
    request,
  };
} 