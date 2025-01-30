import useFacilities from '@/hooks/hotel/useFacilities';
import { FacilitiesType } from '@/types/supabase/facilities-type';

interface FacilitiesFilterProps {
  selectedFacilities: FacilitiesType[];
  onFacilityChange: (facility: FacilitiesType) => void;
}

const FacilityList: React.FC<FacilitiesFilterProps> = ({ selectedFacilities, onFacilityChange }) => {
  const { data: facilities } = useFacilities();

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">공용 시설</h3>
      <ul className="flex flex-wrap gap-2">
        {facilities?.map((facility) => (
          <li key={facility.id}>
            <button
              type="button"
              onClick={() => onFacilityChange(facility)}
              className={`px-3 py-1 rounded-full border ${
                selectedFacilities.some((fac) => fac.id === facility.id)
                  ? 'bg-[#B3916A] text-white'
                  : 'bg-white text-gray-700'
              }`}
            >
              {facility.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FacilityList;
