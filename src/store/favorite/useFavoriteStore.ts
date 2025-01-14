import { create } from 'zustand';
import useAuthStore from '../useAuth';

interface FavoriteState {
  favoriteStatus: Record<string, boolean>;
  setFavoriteStatus: (hotelId: string, isFavorite: boolean) => void;
  toggleFavorite: (hotelId: string) => Promise<void>;
  initializeFavorites: (userId: string) => Promise<void>; // 사용자의 즐겨찾기 상태 초기화
}

const useFavoriteStore = create<FavoriteState>((set, get) => ({
  favoriteStatus: {},

  setFavoriteStatus: (hotelId: string, isFavorite: boolean) => {
    console.log(`Setting favorite for hotelId: ${hotelId} to ${isFavorite}`);
    set((state) => ({
      favoriteStatus: { ...state.favoriteStatus, [hotelId]: isFavorite },
    }));
  },

  toggleFavorite: async (hotelId: string) => {
    const { favoriteStatus } = get();
    const userId = useAuthStore.getState().user?.id;
    if (!userId) {
      console.error('User ID is missing');
      return;
    }
  
    const isFavorite = favoriteStatus[hotelId]; // if the hotel is in favorites, it's marked as favorite
    const action = isFavorite ? 'remove' : 'add';
  
    console.log(`Toggling favorite for hotelId: ${hotelId}, current status: ${isFavorite}`);
  
    try {
      const response = await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          hotelId,
          userId,
        }),
      });
  
      if (!response.ok) {
        const error = await response.json();
        console.error('Error toggling favorite:', error);
        throw new Error(error.message || 'Failed to toggle favorite');
      }
  
      console.log(`Successfully toggled favorite for hotelId: ${hotelId}`);
      set((state) => ({
        favoriteStatus: {
          ...state.favoriteStatus,
          [hotelId]: !isFavorite, // Toggle the favorite status
        },
      }));
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  },
  initializeFavorites: async (userId: string) => {
    if (!userId) {
      console.error('User ID is missing');
      return;
    }
  
    console.log(`Initializing favorites for userId: ${userId}`);
  
    try {
      const response = await fetch(`/api/favorites?userId=${userId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (!response.ok) {
        const error = await response.json();
        console.error('Error fetching favorites:', error);
        throw new Error(error.message || 'Failed to fetch favorite status');
      }
  
      const favorites = await response.json();
      console.log('Fetched favorites: ', favorites); // Debug log
  
      // Create favoriteStatus object based on existing favorites
      const favoriteStatus = favorites.reduce(
        (acc: Record<string, boolean>, { hotel_id }: any) => {
          acc[hotel_id] = true; // hotel_id exists in favorites
          return acc;
        },
        {}
      );
  
      console.log('Updated favoriteStatus: ', favoriteStatus); // Debug log
  
      set({ favoriteStatus }); // Update global state
    } catch (error) {
      console.error('Error initializing favorites:', error);
    }
  },
}));

export default useFavoriteStore;
