import AsyncStorage from "@react-native-async-storage/async-storage";


// Almacenar tokens en AsyncStorage
export const storeTokens = async (
    accessToken: string,
    refreshToken: string
): Promise<boolean> => {
    try {
        await AsyncStorage.setItem("accessToken", accessToken);
        await AsyncStorage.setItem("refreshToken", refreshToken);
        return true;
    } catch (error) {
        console.error("Error al guardar tokens:", error);
        return false;
    }
};

// Almacenar code en AsyncStorage
export const storeCode = async (
    accessCode: string,
): Promise<boolean> => {
    try {
        await AsyncStorage.setItem("accessCode", accessCode);
        return true;
    } catch (error) {
        console.error("Error al guardar tokens:", error);
        return false;
    }
};

// Obtener los tokens de 
export const getTokens = async () => {
    try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        return { accessToken, refreshToken };
    } catch (error) {
        console.error("Error al obtener tokens:", error);
        return { accessToken: null, refreshToken: null };
    }
};

// Eliminar tokens AsyncStorage 
export const removeTokens = async () => {
    try {
        await AsyncStorage.removeItem("accessToken");
        await AsyncStorage.removeItem("refreshToken");
        return true;
    } catch (error) {
        console.error("Error al eliminar tokens:", error);
        return false;
    }
};