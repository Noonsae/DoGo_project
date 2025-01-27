const NavigationSkeleton = () => {
  return (
    <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
      <div>
        <ul className="flex space-x-6 py-4">
          {Array.from({ length: 7 }, (_, index) => (
            <li key={index} className="animate-pulse">
              <div className="bg-gray-300 h-6 w-20 rounded"></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavigationSkeleton;
