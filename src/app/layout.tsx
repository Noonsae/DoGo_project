import type { Metadata } from 'next';

import MyProvider from './_provider/provider';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'DoGo Project',
  description: '호텔 숙박 시설 중개 애플리케이션입니다.'
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
