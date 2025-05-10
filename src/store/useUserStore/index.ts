// import { create } from 'zustand';
// import { IUser } from '@/interfaces';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as SecureStore from 'expo-secure-store';

// interface UserStore {
//     user: IUser | null;
//     setUser: (user: IUser) => void;
//     resetUser: () => void;
//     hydrate: () => Promise<void>;
// }

// export const useUserStore = create<UserStore>((set) => ({
//     user: null,
//     setUser: async (user) => {
//         set({ user });
//         const data = JSON.stringify(user);
//         if (typeof window === 'undefined') {
//             await SecureStore.setItemAsync('user', data);
//         } else {
//             await AsyncStorage.setItem('user', data);
//         }
//     },
//     resetUser: async () => {
//         set({ user: null });
//         if (typeof window === 'undefined') {
//             await SecureStore.deleteItemAsync('user');
//         } else {
//             await AsyncStorage.removeItem('user');
//         }
//     },
//     hydrate: async () => {
//         let data: string | null = null;
//         if (typeof window === 'undefined') {
//             data = await SecureStore.getItemAsync('user');
//         } else {
//             data = await AsyncStorage.getItem('user');
//         }
//         if (data) {
//             set({ user: JSON.parse(data) });
//         }
//     }
// }));



import { create } from 'zustand';
import { IUser } from '@/interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

interface UserStore {
    user: IUser | null;
    setUser: (user: IUser) => void;
    resetUser: () => void;
    hydrate: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,

    setUser: (user) => {
        // Actualiza el estado inmediatamente
        set({ user });

        // Persiste el usuario de forma asíncrona sin bloquear el render
        const data = JSON.stringify(user);
        if (typeof window === 'undefined') {
            SecureStore.setItemAsync('user', data);
        } else {
            AsyncStorage.setItem('user', data);
        }
    },

    resetUser: () => {
        set({ user: null });

        // Limpia el almacenamiento de manera asíncrona
        if (typeof window === 'undefined') {
            SecureStore.deleteItemAsync('user');
        } else {
            AsyncStorage.removeItem('user');
        }
    },

    hydrate: async () => {
        let data: string | null = null;

        if (typeof window === 'undefined') {
            data = await SecureStore.getItemAsync('user');
        } else {
            data = await AsyncStorage.getItem('user');
        }

        if (data) {
            try {
                set({ user: JSON.parse(data) });
            } catch (error) {
                console.error("Error al parsear el usuario:", error);
                set({ user: null });
            }
        }
    },
}));
