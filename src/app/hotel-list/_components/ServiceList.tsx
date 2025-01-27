import useServices from '@/hooks/hotel/useServices';

interface ServicesFilterProps {
  selectedServices: string[];
  onServiceChange: (service: string) => void;
}

const ServiceList: React.FC<ServicesFilterProps> = ({ selectedServices, onServiceChange }) => {
  const { data: services, isLoading, error } = useServices();

  if (isLoading) {
    return <p>Loading facilities...</p>; // 로딩 중 메시지
  }

  if (error) {
    return <p>Error loading facilities: {error.message}</p>; // 오류 메시지
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">편의 시설</h3>
      <ul className="flex flex-wrap gap-2">
        {services?.map((service) => (
          <li key={service}>
            {/* <button
              type="button"
              onClick={() => onServiceChange(service.id)}
              className={`px-3 py-1 rounded-full border ${
                selectedServices.includes(service.id) ? 'bg-[#B3916A] text-white' : 'bg-white text-gray-700'
              }`}
            > */}
              {/* {service.name} */}
            {/* </button> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceList;
