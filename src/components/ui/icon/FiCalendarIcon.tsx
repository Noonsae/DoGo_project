import { IconType } from "@/types/icon/icon-type";

const FiCalendarIcon:React.FC<IconType> = ({className}) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M19 4.5H5C3.89543 4.5 3 5.39543 3 6.5V20.5C3 21.6046 3.89543 22.5 5 22.5H19C20.1046 22.5 21 21.6046 21 20.5V6.5C21 5.39543 20.1046 4.5 19 4.5Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path d="M16 2.5V6.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M8 2.5V6.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M3 10.5H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  );
}

export default FiCalendarIcon