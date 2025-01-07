import React from 'react';

import SearchSectionList from './_components/SearchSection';
import EventSection from './_components/EventSection';
import ContentsList from './_components/_contents/ContentsList';
import HeroSection from './_components/HeroSection';

const HomePage = () => {
  return (
    <div className="">
      <HeroSection />
      <EventSection />
      <ContentsList />
    </div>
  );
};

export default HomePage;
