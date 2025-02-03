import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { HistoryStoreType } from '@/types/zustand/history-state-type';

const useHistoryStore = create<HistoryStoreType>()(
  persist(
    (set) => ({
      history: [],
      mostFrequentLocation: '', // 초기값은 빈 문자열
      setMostFrequentLocation: (location: string) => set(() => ({ mostFrequentLocation: location })),

      addHotel: (hotel, reviews = []) =>
        set((state) => {
          // 동일한 id의 호텔이 이미 있는지 확인
          const isAlreadyInHistory = state.history.some((item) => item.id === hotel.id);

          const price = hotel.min_price || null;
          const updatedHotel = {
            ...hotel,
            price, // 가격 정보가 있으면 추가, 없으면 null로 설정
            reviews: reviews || []
          };

          // 기존 값이 있다면 해당 값을 지우고 새 값을 추가
          if (isAlreadyInHistory) {
            return {
              history: [
                ...state.history.filter((item) => item.id !== hotel.id), // 기존 항목 제거
                updatedHotel // 새 항목 추가
              ]
            };
          }

          // 기존 값이 없으면 그냥 추가
          return { history: [...state.history, updatedHotel] };
        })
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
