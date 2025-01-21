const RenderStars = ({ rating }: { rating: number }) => {
  return (
    <div>
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} className={`text-lg ${index < rating ? 'text-[#EEC18D]' : 'text-gray-300'}`}>
          ★
        </span>
      ))}
    </div>
  );
};

export default RenderStars;
