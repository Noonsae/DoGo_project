const GuestInfo = () => {
  return (
    <section className="bg-white shadow-lg rounded-lg p-6 w-[892px]">
      <p className="text-lg font-semibold">투숙객 정보</p>
      <div className="flex flex-row items-center justify-around">
        <div className="flex flex-col justify-center">
          <p className="w-[400px]">영문 이름</p>
          <input className="border p-3 mt-2 rounded-md" placeholder="영문으로 작성해주세요" />
        </div>
        <div className="flex flex-col justify-center">
          <p className="flex flex-col justify-end w-[400px]">영문 성</p>
          <input className="border p-3 mt-2 rounded-md" placeholder="영문으로 작성해주세요" />
        </div>
      </div>
    </section>
  );
};

export default GuestInfo;