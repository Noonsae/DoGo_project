import { FacilitiesType } from '../supabase/facilities-type';
import { ServicesType } from '../supabase/services-type';

export interface HotelFacilityProps {
  facilityData: FacilitiesType[];
  roomOption: React.ReactNode;
  hotelId: string;
  serviceData: ServicesType[];
}
