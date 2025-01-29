import useServices from '@/hooks/hotel/useServices';
import { ServicesType } from '@/types/supabase/services-type';

interface ServicesFilterProps {
  selectedServices: ServicesType[];
  onServiceChange: (service: ServicesType) => void;
}

const ServiceList: React.FC<ServicesFilterProps> = ({ selectedServices, onServiceChange }) => {
  const { data: services } = useServices();

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">제공 서비스</h3>
      <ul className="flex flex-wrap gap-2">
        {services?.map((service) => (
          <li key={service.id}>
            <button
              type="button"
              onClick={() => onServiceChange(service)}
              className={`px-3 py-1 rounded-full border ${
                selectedServices.some((svc) => svc.id === service.id)
                  ? 'bg-[#B3916A] text-white'
                  : 'bg-white text-gray-700'
              }`}
            >
              {service.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceList;
