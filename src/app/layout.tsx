import type { Metadata } from 'next';

import MyProvider from './_provider/provider';

import localFont from 'next/font/local';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AuthProvider from './_provider/AuthProvider';
import InquiryFloatingButton from '@/components/common/InquiryFloatingButton';

import '../styles/globals.css';
import { headers } from 'next/headers';
import ClientWrapper from '@/components/layout/ClientWrapper';

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap'
});

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

const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko" className={`${pretendard.variable} leading-[1.35]`}>
      <AuthProvider>
        <MyProvider>
          <body className="font-pretendard">
            {/* /⭐설명: auth 모바일 헤더 달라서 ClientWrapper로 감싸주었습니다. */}
            <ClientWrapper>
              <Header />
            </ClientWrapper>
            {children}
            <Footer />
            <InquiryFloatingButton />
          </body>
        </MyProvider>
      </AuthProvider>
    </html>
  );
};
export default RootLayout;
