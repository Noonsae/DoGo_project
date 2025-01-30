import { Metadata } from 'next';

import EventSection from './_components/EventSection';
import HeroSection from './_components/HeroSection';
import ContentsList from './_components/ContentsList';

const siteUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'; // 로컬 개발 환경 대비

export const metadata: Metadata = {
  title: 'DoGo : 홈페이지',
  description: '국내 4성~5성 호텔 예약 애플리케이션 DoGo의 홈페이지입니다.',
  openGraph: {
    title: 'DoGo Application',
    description: '국내 4성~5성 호텔 예약 애플리케이션',
    url: siteUrl,
    siteName: 'DoGo',
    images: [
      {
        url: `${siteUrl}/images/DoGo_site_preview.webp`, // OpenGraph 이미지 URL
        width: 1200,
        height: 630,
        alt: 'DoGo: 호텔 예약 애플리케이션'
      }
    ]
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
