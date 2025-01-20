const RenderStars = ({ rating }: { rating: number }) => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} className={`text-lg ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}>
          ★
        </span>
      ))}
    </>
  );
};

export default RenderStars;
