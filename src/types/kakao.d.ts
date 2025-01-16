/// <reference types="kakao.maps.d.ts" />

declare global {
  interface Window {
    Kakao: typeof import('kakao.maps');
  }
}

export {};
