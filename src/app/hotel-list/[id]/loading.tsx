import HotelBoxSkeleton from '@/components/ui/skeleton/HotelBoxSkeleton';
import NavigationSkeleton from '@/components/ui/skeleton/HotelNavigationSkeleton';
import HotelOverviewSkeleton from '@/components/ui/skeleton/HotelOverviewSkeleton';

const page = () => {
  return (
    <div>
      <NavigationSkeleton />
      <HotelOverviewSkeleton />
      <HotelBoxSkeleton />
    </div>
  );
};

export default page;
