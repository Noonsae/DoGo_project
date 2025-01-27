import FiChevronLeftIcon from "../icon/FiChevronLeftIcon";
import FiChevronRightIcon from "../icon/FiChevronRightIcon";

const CustomPrevArrow = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLButtonElement> }) => {
  return (
    <button
      onClick={onClick}
      className="absolute top-[55%] -left-[20px] transform -translate-y-[100%] shadow-[0px_2px_4px_rgba(0,0,0,0.3)] rounded-full bg-white z-10"
    >
      <div>
        <FiChevronLeftIcon className="w-[40px] h-[40px] text-[#777]" />
      </div>
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
      <div>
        <FiChevronRightIcon className="w-[40px] h-[40px] text-[#777]" />
      </div>
    </button>
  );
};

export { CustomPrevArrow, CustomNextArrow };
