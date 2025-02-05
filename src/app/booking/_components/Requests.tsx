const Requests = () => {
  return (
    <section className="bg-white shadow-lg rounded-lg p-6 w-[892px]">
      <p className="text-lg font-semibold">요청 사항</p>
      <p className="text-gray-600 text-sm">
        별도의 요청 사항을 보장해드릴 수는 없으나, 숙소 측에서 서비스 제공을 위해 최선의 노력을 다할 것입니다.
      </p>
      <div className="mt-4 space-y-2">
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="w-5 h-5" />
          <span>{`유아용 침대 (선택사항)`}</span>
        </label>

        <label className="flex items-center space-x-2">
          <input type="checkbox" className="w-5 h-5" />
          <span>{`예약한 객실은 서로 붙여주세요. (선택사항)`}</span>
        </label>

        <input className="border p-3 w-full rounded-md" placeholder="별도의 요청사항을 작성해 주세요." />
      </div>
    </section>
  );
};

export default Requests;
