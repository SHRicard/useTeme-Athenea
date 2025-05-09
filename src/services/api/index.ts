import axios from "axios";
import { Platform } from "react-native";
import Constants from 'expo-constants';
import { getTokens, removeTokens, storeTokens } from "@/utils";

const { API_URL_BACK, API_URL_ANDROID } = Constants.expoConfig?.extra || {};

const API_URL = Platform.OS === 'android' ? API_URL_ANDROID : API_URL_BACK;

export const apiClient = axios.create({
    baseURL: API_URL,
    timeout: 15000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor para añadir el token a las peticiones
apiClient.interceptors.request.use(
    async (config) => {
        const { accessToken } = await getTokens();
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para refrescar el token si expira
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const { refreshToken } = await getTokens();
                if (!refreshToken) {
                    await removeTokens();
                    return Promise.reject(error);
                }
                const response = await axios.post(`${API_URL}/auth/refresh`, {
                    refreshToken,
                });
                await storeTokens(response.data.accessToken, response.data.refreshToken);
                originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
                return apiClient(originalRequest);
            } catch (refreshError) {
                await removeTokens();
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);