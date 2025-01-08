import type { Metadata } from 'next';

import MyProvider from './_provider/provider';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'DoGo',
  description: 'DoGo는 국내 4성~5성 호텔 예약을 할 수 있는 애플리케이션 프로젝트입니다.',
  openGraph: {
    title: 'DoGo Application',
    description: '국내 4성~5성 호텔 예약 애플리케이션',
    url: 'http://localhost:3000', // 사이트 URL
    siteName: 'DoGo',
    images: [
      {
        url: 'http://localhost:3000/images/dogo_site_preview.webp', // OpenGraph 이미지 URL
        width: 1200,
        height: 630,
        alt: 'DoGo: 호텔 예약 애플리케이션'
      }
    ],
    type: 'website', // 콘텐츠 유형
    locale: 'ko_KR' // 언어 설정
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <MyProvider>
        <body>
          <Header />
          {children}
          <Footer />
        </body>
      </MyProvider>
    </html>
  );
}
