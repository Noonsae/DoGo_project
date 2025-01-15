import React from 'react';
import Recommend from './Recommend';
import History from './History';
import HotelByView from './HotelByView';
import HotelByRegion from './HotelByRegion';

const ContentsList = () => {
  return (
    <>
      <History />
      <Recommend />
      <HotelByRegion />
      <HotelByView />
    </>
  );
};

export default ContentsList;
