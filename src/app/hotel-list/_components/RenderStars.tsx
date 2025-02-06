const RenderStars = ({ stars }: { stars: number }) => {
  return (
    <div>
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className={`text-lg max-[360px]:text-base ${index < stars ? 'text-[#EEC18D]' : 'text-gray-300'}`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default RenderStars;
