import { create } from 'zustand';
import { HistoryStoreType } from '@/types/zustand/history-state-type';

const useHistoryStore = create<HistoryStoreType>((set) => ({
  history: [],
  mostFrequentLocation: '', // 초기값은 빈 문자열
  setMostFrequentLocation: (location: string) => set(() => ({ mostFrequentLocation: location })), // location 값을 업데이트
  addHotel: (hotel) =>
    set((state) => {
      const isAlreadyInHistory = state.history.some((item) => item.id === hotel.id);
      if (!isAlreadyInHistory) {
        // rooms 배열이 있고, 배열의 첫 번째 아이템에서 price를 가져옴
        const price = hotel.room?.[0]?.price || null;

        const updatedHotel = {
          ...hotel,
          price // 가격 정보가 있으면 추가, 없으면 null로 설정
        };

        return { history: [...state.history, updatedHotel] };
      }
      return state;
    })
}));

export default useHistoryStore;
