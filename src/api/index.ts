import axios from 'axios';
import type { DownloadRequest, PlatformsResponse, HealthResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const downloadVideo = async (url: string): Promise<Blob> => {
  const response = await api.post<Blob>('/download', { url } as DownloadRequest, {
    responseType: 'blob',
  });
  return response.data;
};

export const getPlatforms = async (): Promise<PlatformsResponse> => {
  const response = await api.get<PlatformsResponse>('/platforms');
  return response.data;
};

export const getHealth = async (): Promise<HealthResponse> => {
  const response = await api.get<HealthResponse>('/health');
  return response.data;
};

export default api;
