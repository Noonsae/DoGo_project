import { IconType } from '@/types/icon/icon-type';

const IoIosRemoveCircleOutlineIcon: React.FC<IconType> = ({className, onClick}) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path
        d="M16.2422 11.75H7.75781C7.34531 11.75 7.00781 12.0312 7.00781 12.5C7.00781 12.9688 7.35938 13.25 7.75781 13.25H16.2422C16.6547 13.25 16.9922 12.9125 16.9922 12.5C16.9922 12.0875 16.6547 11.75 16.2422 11.75Z"
        fill="currentColor"
      />
      <path
        d="M12 4.0625C14.2547 4.0625 16.3734 4.93906 17.9672 6.53281C19.5609 8.12656 20.4375 10.2453 20.4375 12.5C20.4375 14.7547 19.5609 16.8734 17.9672 18.4672C16.3734 20.0609 14.2547 20.9375 12 20.9375C9.74531 20.9375 7.62656 20.0609 6.03281 18.4672C4.43906 16.8734 3.5625 14.7547 3.5625 12.5C3.5625 10.2453 4.43906 8.12656 6.03281 6.53281C7.62656 4.93906 9.74531 4.0625 12 4.0625ZM12 2.75C6.61406 2.75 2.25 7.11406 2.25 12.5C2.25 17.8859 6.61406 22.25 12 22.25C17.3859 22.25 21.75 17.8859 21.75 12.5C21.75 7.11406 17.3859 2.75 12 2.75Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default IoIosRemoveCircleOutlineIcon;
