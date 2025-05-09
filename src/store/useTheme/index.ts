import { create } from 'zustand';

type ThemeState = {
    isDarkMode: boolean;
    toggleTheme: () => void;
    setTheme: (theme: boolean) => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
    isDarkMode: false,
    toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    setTheme: (theme) => set({ isDarkMode: theme }),
}));
