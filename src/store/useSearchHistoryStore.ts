import { create } from 'zustand';

interface HistoryState {
  history: string[]; // 검색 기록 저장
  addHistory: (location: string) => void; // 기록 추가
  removeHistory: (location: string) => void; // 기록 삭제
  getVisibleHistory: () => string[]; // 화면에 표시할 기록 가져오기
}

const useSearchHistoryStore = create<HistoryState>((set, get) => ({
  history: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('searchHistory') || '[]') : [], // 브라우저 환경에서만 초기값 로드
  addHistory: (location) =>
    set((state) => {
      const updatedHistory = [location, ...state.history.filter((h) => h !== location)].slice(0, 10); // 중복 제거 후 10개 유지
      if (typeof window !== 'undefined') {
        localStorage.setItem('searchHistory', JSON.stringify(updatedHistory)); // 브라우저 환경에서만 저장
      }
      return { history: updatedHistory };
    }),
  removeHistory: (location) =>
    set((state) => {
      const updatedHistory = state.history.filter((h) => h !== location); // 해당 location 제거
      if (typeof window !== 'undefined') {
        localStorage.setItem('searchHistory', JSON.stringify(updatedHistory)); // 브라우저 환경에서만 저장
      }
      return { history: updatedHistory };
    }),
  getVisibleHistory: () => get().history.slice(0, 3) // 최근 3개 기록만 반환
}));

export default useSearchHistoryStore;
