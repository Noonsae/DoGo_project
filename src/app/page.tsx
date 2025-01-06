import React from 'react';

import SearchSectionList from './_components/SearchSection';
import EventSection from './_components/EventSection';
import RecommendedSectionList from './_components/RecommendedSectionList';
import HeroSection from './_components/HeroSection';

const HomePage = () => {
  return (
    <div className="">
      <HeroSection/>
      <EventSection />
      <RecommendedSectionList />
    </div>
  );
};

export default HomePage;
