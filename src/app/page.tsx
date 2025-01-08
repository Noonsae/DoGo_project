import React from 'react';
import { Metadata } from 'next';

import EventSection from './_components/EventSection';
import ContentsList from './_components/_contents/ContentsList';
import HeroSection from './_components/HeroSection';

export const metadata: Metadata = {
  title: 'DoGo : 홈페이지',
  description: '국내 4성~5성 호텔 예약 애플리케이션 DoGo의 홈페이지입니다.',
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
  }
};

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <EventSection />
      <ContentsList />
    </div>
  );
};

export default HomePage;
