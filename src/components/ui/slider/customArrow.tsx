import { FiChevronLeft } from 'react-icons/fi';
import { FiChevronRight } from 'react-icons/fi';

const CustomPrevArrow = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLButtonElement> }) => {
  return (
    <button
      onClick={onClick}
      className="absolute top-[55%] -left-[20px] transform -translate-y-[100%] shadow-[0px_2px_4px_rgba(0,0,0,0.3)] rounded-full bg-white z-10"
    >
      <FiChevronLeft className="w-[40px] h-[40px] text-[#777]" />
    </button>
  );
};

// White Custom Next Arrow
const CustomNextArrow = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLButtonElement> }) => {
  return (
    <button
      onClick={onClick}
      className="absolute top-[55%] -right-[20px] transform -translate-y-[100%] shadow-[0px_2px_4px_rgba(0,0,0,0.3)] rounded-full bg-white z-10"
    >
      <FiChevronRight className="w-[40px] h-[40px] text-[#777]" />
    </button>
  );
};

export { CustomPrevArrow, CustomNextArrow };
