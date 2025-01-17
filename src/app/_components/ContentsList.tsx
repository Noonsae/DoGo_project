import History from "./_contents/History";
import HotelByLocation from "./_contents/HotelByLocation";
import HotelByView from "./_contents/HotelByView";
import Recommend from "./_contents/Recommend";


const ContentsList = () => {
  return (
    <>
      <History   />
      <Recommend />
      <HotelByLocation />
      <HotelByView />
    </>
  );
};

export default ContentsList;
