import type { Metadata } from 'next';
import '../styles/globals.css';
import MyProvider from './_provider/provider';

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
        <body>{children}</body>
      </MyProvider>
    </html>
  );
}
