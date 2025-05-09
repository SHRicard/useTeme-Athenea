import { storeTokens } from "@/utils";
import { apiClient } from "../api"


export const processGoogleToken = async (token: string) => {
    try {
        const response = await apiClient.post("/auth/google", { token });
        if (!response.data) {
            throw new Error("Respuesta vacía del servidor");
        }
        const { user, accessToken, refreshToken } = response.data;
        await storeTokens(accessToken, refreshToken);

        return {
            user,
            accessToken,
            refreshToken,
            isAuthenticated: true,
        };
    } catch (error: any) {
        console.error("Error procesando token:", error);

        if (error.response) {
            console.error("Datos de respuesta:", error.response.data);
            console.error("Estado:", error.response.status);
        }

        throw error;
    }
};