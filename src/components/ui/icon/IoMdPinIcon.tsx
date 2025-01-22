import { IconType } from '@/types/icon/icon-type';

const IoMdPinIcon: React.FC<IconType> = (className) => {
  return (
    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2C7.87481 2 4.5 5.30736 4.5 9.35005C4.5 14.8625 12 23 12 23C12 23 19.5 14.8625 19.5 9.35005C19.5 5.30736 16.1252 2 12 2ZM12 11.975C10.5002 11.975 9.32137 10.8198 9.32137 9.35005C9.32137 7.88019 10.5001 6.72505 12 6.72505C13.4999 6.72505 14.6786 7.88019 14.6786 9.35005C14.6786 10.8198 13.4998 11.975 12 11.975Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default IoMdPinIcon;
