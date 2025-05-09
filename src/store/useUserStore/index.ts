import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IUser } from '@/interfaces';

interface UserStore {
    user: IUser | null;
    setUser: (user: IUser) => void;
    resetUser: () => void;
}

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),
            resetUser: () => set({ user: null }),
        }),
        {
            name: 'user-storage',
        }
    )
);
