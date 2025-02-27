import { IconType } from '@/types/icon/icon-type';

const HiOutlineMenuIcon: React.FC<IconType> = ({ className }) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 6.5H20M4 12.5H20M4 18.5H20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default HiOutlineMenuIcon;
