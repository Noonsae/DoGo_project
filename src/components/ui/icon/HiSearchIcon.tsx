import { IconType } from '@/types/icon/icon-type';

const HiSearchIcon: React.FC<IconType> = ({ className }) => {
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
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9.5999 5.29997C8.32686 5.29997 7.10596 5.80568 6.20579 6.70585C5.30562 7.60603 4.7999 8.82693 4.7999 10.1C4.7999 11.373 5.30562 12.5939 6.20579 13.4941C7.10596 14.3943 8.32686 14.9 9.5999 14.9C10.8729 14.9 12.0938 14.3943 12.994 13.4941C13.8942 12.5939 14.3999 11.373 14.3999 10.1C14.3999 8.82693 13.8942 7.60603 12.994 6.70585C12.0938 5.80568 10.8729 5.29997 9.5999 5.29997ZM2.3999 10.1C2.39976 8.96681 2.66707 7.84962 3.18011 6.83926C3.69314 5.82889 4.43741 4.95388 5.35238 4.2854C6.26735 3.61691 7.32718 3.17382 8.44568 2.99217C9.56418 2.81051 10.7098 2.89542 11.7893 3.23999C12.8688 3.58455 13.8517 4.17905 14.6581 4.97512C15.4645 5.7712 16.0717 6.74637 16.4301 7.82133C16.7886 8.89629 16.8883 10.0407 16.7211 11.1614C16.5539 12.2822 16.1245 13.3476 15.4679 14.2712L21.2483 20.0516C21.4669 20.2779 21.5878 20.581 21.5851 20.8956C21.5824 21.2103 21.4562 21.5113 21.2337 21.7338C21.0112 21.9562 20.7102 22.0824 20.3956 22.0852C20.0809 22.0879 19.7778 21.967 19.5515 21.7484L13.7723 15.9692C12.6951 16.7351 11.4279 17.1898 10.1095 17.2833C8.79111 17.3769 7.47239 17.1057 6.29786 16.4995C5.12334 15.8934 4.13833 14.9756 3.45077 13.8468C2.76321 12.718 2.39965 11.4217 2.3999 10.1Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default HiSearchIcon;
