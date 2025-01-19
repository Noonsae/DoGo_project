import HotelHistory from "./_contents/HotelHistory";
import Recommend from "./_contents/Recommend";
import HotelByLocation from "./_contents/HotelByLocation";
import HotelByView from "./_contents/HotelByView";

const ContentsList = () => {
  return (
    <>
      <HotelHistory />
      <Recommend />
      <HotelByLocation />
      <HotelByView />
    </>
  );
};

export default ContentsList;
