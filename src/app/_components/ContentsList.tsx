import React from 'react';
import Recommend from './Recommend';
import History from './History';
import HotelByView from './HotelByView';
import HotelByLocation from './HotelByLocation';

const ContentsList = () => {
  return (
    <>
      <History />
      <Recommend />
      <HotelByLocation />
      <HotelByView />
    </>
  );
};

export default ContentsList;
