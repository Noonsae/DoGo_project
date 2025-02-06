const RatingIcon = ({ className, fill }: { className: string; fill?: string }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M1.66683 7.49997H4.16683V17.5H1.66683C1.2066 17.5 0.833496 17.1269 0.833496 16.6667V8.33331C0.833496 7.87307 1.2066 7.49997 1.66683 7.49997ZM6.07757 6.42257L11.4113 1.08884C11.5579 0.942216 11.7901 0.925724 11.9559 1.05013L12.6664 1.583C13.0703 1.88593 13.2523 2.40211 13.1277 2.89138L12.1667 6.66664H17.5002C18.4207 6.66664 19.1668 7.41283 19.1668 8.33331V10.0869C19.1668 10.3047 19.1242 10.5202 19.0413 10.7215L16.4627 16.9839C16.3341 17.2962 16.0297 17.5 15.6921 17.5H6.66683C6.2066 17.5 5.8335 17.1269 5.8335 16.6667V7.01182C5.8335 6.79081 5.9213 6.57885 6.07757 6.42257Z"
        fill={fill || '#636363'}
      />
    </svg>
  );
};

export default RatingIcon;
