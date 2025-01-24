import { FacilitiesType } from '../supabase/facilities-type';
import { ServicesType } from '../supabase/services-type';

export interface HotelFacilityProps {
  facilityData: FacilitiesType[];
  roomOption: React.ReactNode;
  setFacilityData: React.Dispatch<React.SetStateAction<FacilitiesType[]>>;
  hotelId: string;
  setServicesData: React.Dispatch<React.SetStateAction<ServicesType[]>>; // 수정: 상태 관리 함수로 정의
  serviceData: ServicesType[];
}
