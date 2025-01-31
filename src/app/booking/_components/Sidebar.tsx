const Sidebar = () => {
  return (
    <aside className="ml-auto w-[278px] h-[682px] bg-white p-10 shadow-md rounded-lg mt-[50px] border border-gray-300 ">
      <p className="text-lg font-bold mb-4 border-b">Hotel Name</p>
      <p>체크인</p>
      <p>체크아웃</p>
      <div className="flex flex-row items-center ">
        <div className="w-[100px] h-[70px] bg-gray-300 mt-[20px] rounded-md mb-4"></div>

        <p className="text-sm font-semibold p-5">Room Name</p>
      </div>

      <ul className="mt-4 space-y-2">
        <li className="text-gray-700">• Service</li>
        <li className="text-gray-700">• Service</li>
        <li className="text-gray-700">• Service</li>
        <li className="text-gray-700">• Service</li>
      </ul>

      <div className="mt-6 p-4 border-t">
        <p className="text-gray-700">가격 상세정보</p>
        <p className="font-semibold text-lg">객실 1개 x 1박</p>
        <p className="text-gray-700 mt-2"> 총 결제 금액</p>
        <p className="font-semibold text-lg">₩ 150,000</p>
        <p className="font-semibold text-lg">₩ 150,000</p>
        <p className="font-semibold text-lg">₩ 150,000</p>
        <p className="font-semibold text-lg">₩ 150,000</p>
      </div>
    </aside>
  );
};

export default Sidebar;
