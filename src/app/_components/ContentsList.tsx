import HotelHistory from "./_contents/HotelHistory";
import Recommend from "./_contents/Recommend";
import HotelByLocation from "./_contents/HotelByLocation";
import HotelByView from "./_contents/HotelByView";

const ContentsList = () => {
  return (
    <div className="pb-20">
      <HotelHistory />
      <Recommend />
      <HotelByLocation />
      <HotelByView />
    </div>
  );
};

export default ContentsList;
