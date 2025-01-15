import React from 'react';
import TopPicks from './TopPicks';
import History from './History';
import HotelByView from './HotelByView';
import HotelByRegion from './HotelByRegion';

const ContentsList = () => {
  return (
    <>
      <TopPicks />
      <History />
      <HotelByRegion />
      <HotelByView />
    </>
  );
};

export default ContentsList;
