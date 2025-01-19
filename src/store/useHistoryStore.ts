import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { HistoryStoreType } from '@/types/zustand/history-state-type';

const useHistoryStore = create<HistoryStoreType>()(
  persist(
    (set) => ({
      history: [],
      mostFrequentLocation: '', // 초기값은 빈 문자열
      setMostFrequentLocation: (location: string) => set(() => ({ mostFrequentLocation: location })),
      addHotel: (hotel) =>
        set((state) => {
          const isAlreadyInHistory = state.history.some((item) => item.id === hotel.id);
          if (!isAlreadyInHistory) {
            const price = hotel.room?.[0]?.price || null;

            const updatedHotel = {
              ...hotel,
              price // 가격 정보가 있으면 추가, 없으면 null로 설정
            };

            return { history: [...state.history, updatedHotel] };
          }
          return state;
        }),

      removeHotel: (locationId: string) =>
        set((state) => ({
          history: state.history.filter((item) => item.location !== locationId) // locationId가 일치하지 않는 항목만 유지
        }))
    }),
    {
      name: 'history-storage', // 로컬 스토리지에 저장될 키
      storage: {
        getItem: (key) => JSON.parse(localStorage.getItem(key) || 'null'),
        setItem: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
        removeItem: (key) => localStorage.removeItem(key)
      }
    }
  )
);

export default useHistoryStore;
