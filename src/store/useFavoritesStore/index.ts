import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Flight } from '@/components/organisms/cards/transport';
import { Lodging } from '@/components/organisms/cards/lodging';

type FavoriteItem = Flight | Lodging;
type ServiceType = 'flights' | 'lodging';

interface FavoritesStore {
  favorites: FavoriteItem[];
  activeService: ServiceType;
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (itemId: string) => void;
  isFavorite: (itemId: string) => boolean;
  loadFavorites: () => Promise<void>;
  setActiveService: (service: ServiceType) => void;
}

const STORAGE_KEY = '@favorites';
const ACTIVE_SERVICE_KEY = '@activeService';

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  favorites: [],
  activeService: 'flights',
  
  loadFavorites: async () => {
    try {
      const [storedFavorites, storedService] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEY),
        AsyncStorage.getItem(ACTIVE_SERVICE_KEY)
      ]);
      
      if (storedFavorites) {
        set({ favorites: JSON.parse(storedFavorites) });
      }
      if (storedService) {
        set({ activeService: JSON.parse(storedService) });
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  },

  addFavorite: async (item) => {
    try {
      const newFavorites = [...get().favorites, item];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
      set({ favorites: newFavorites });
    } catch (error) {
      console.error('Error saving favorite:', error);
    }
  },

  removeFavorite: async (itemId) => {
    try {
      const newFavorites = get().favorites.filter((item) => item.id !== itemId);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
      set({ favorites: newFavorites });
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  },

  isFavorite: (itemId) => {
    return get().favorites.some((item) => item.id === itemId);
  },

  setActiveService: async (service) => {
    try {
      await AsyncStorage.setItem(ACTIVE_SERVICE_KEY, JSON.stringify(service));
      set({ activeService: service });
    } catch (error) {
      console.error('Error saving active service:', error);
    }
  },
}));