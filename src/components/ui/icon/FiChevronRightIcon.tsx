import { IconType } from '@/types/icon/icon-type';

const FiChevronRightIcon: React.FC<IconType> = ({ className }) => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M9 18.5L15 12.5L9 6.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default FiChevronRightIcon;
