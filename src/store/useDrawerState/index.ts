import { create } from 'zustand';

type DrawerState = {
    isOpen: boolean;
    openDrawer: () => void;
    closeDrawer: () => void;
    toggleDrawer: () => void;
};

export const useDrawerStore = create<DrawerState>((set) => ({
    isOpen: false,
    openDrawer: () => set({ isOpen: true }),
    closeDrawer: () => set({ isOpen: false }),
    toggleDrawer: () => set((state) => ({ isOpen: !state.isOpen })),
}));