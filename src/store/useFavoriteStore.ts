import { create } from 'zustand';
import Swal from 'sweetalert2'; // SweetAlert2 import
import useAuthStore from '@/store/useAuth';

interface FavoriteState {
  favoriteStatus: Record<string, boolean>;
  setFavoriteStatus: (hotelId: string, isFavorite: boolean) => void;
  toggleFavorite: (hotelId: string) => Promise<void>;
  initializeFavorites: (userId: string) => Promise<void>; // 사용자의 즐겨찾기 상태 초기화
}

const useFavoriteStore = create<FavoriteState>((set, get) => ({
  favoriteStatus: {},

  setFavoriteStatus: (hotelId: string, isFavorite: boolean) => {
    set((state) => ({
      favoriteStatus: { ...state.favoriteStatus, [hotelId]: isFavorite }
    }));
  },

  toggleFavorite: async (hotelId: string) => {
    const { favoriteStatus } = get();
    const userId = useAuthStore.getState().user?.id;

    if (!userId) {
      Swal.fire({
        icon: 'warning',
        title: '로그인이 필요합니다',
        text: '즐겨찾기 기능을 사용하려면 로그인해주세요.',
        confirmButtonText: '로그인하기'
      }).then(() => {
        window.location.href = '/sign-in';
      });
      return;
    }

    const isFavorite = favoriteStatus[hotelId];
    const action = isFavorite ? 'remove' : 'add';

    try {
      const response = await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          hotelId,
          userId
        })
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Error toggling favorite:', error);
        throw new Error(error.message || 'Failed to toggle favorite');
      }

      set((state) => ({
        favoriteStatus: {
          ...state.favoriteStatus,
          [hotelId]: !isFavorite
        }
      }));

      // 성공 알림
      Swal.fire({
        icon: 'success',
        title: action === 'add' ? '즐겨찾기 추가' : '즐겨찾기 제거',
        text: action === 'add' ? '숙소가 즐겨찾기에 추가되었습니다.' : '숙소가 즐겨찾기에서 제거되었습니다.'
      });
    } catch (error) {
      console.error('Error toggling favorite:', error);
      Swal.fire({
        icon: 'error',
        title: '오류 발생',
        text: '즐겨찾기 상태를 변경하는 중 문제가 발생했습니다.'
      });
    }
  },

  initializeFavorites: async (userId: string) => {
    try {
      const response = await fetch(`/api/favorites?userId=${userId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Error fetching favorites:', error);
        throw new Error(error.message || 'Failed to fetch favorite status');
      }

      const favorites = await response.json();

      const favoriteStatus = favorites.reduce((acc: Record<string, boolean>, { hotel_id }: any) => {
        acc[hotel_id] = true;
        return acc;
      }, {});

      set({ favoriteStatus });
    } catch (error) {
      console.error('Error initializing favorites:', error);
      Swal.fire({
        icon: 'error',
        title: '오류 발생',
        text: '즐겨찾기 상태를 불러오는 중 문제가 발생했습니다.'
      });
    }
  }
}));

export default useFavoriteStore;
