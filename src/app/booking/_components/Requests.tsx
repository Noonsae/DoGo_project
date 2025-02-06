import { useState } from 'react';

const Requests = ({ request, setRequest }: { request: string[]; setRequest: (value: string[]) => void }) => {
  const [customRequest, setCustomRequest] = useState(''); // 별도의 요청사항 입력 값

  // 체크박스 값 변경 핸들러
  const handleCheckboxChange = (value: string, isChecked: boolean) => {
    if (isChecked) {
      setRequest([...request, value]); // 체크된 값 추가
    } else {
      setRequest(request.filter((item) => item !== value)); // 체크 해제된 값 제거
    }
  };

  // 별도의 요청사항 입력 핸들러
  const handleCustomRequestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomRequest(value);
    setRequest([...request.filter((item) => item !== customRequest), value]); // 기존 입력값 교체
  };

  return (
    <section className="w-full px-9 py-4 mb-8 bg-white rounded-[12px] border border-[#E2E2E2]">
      {/* 요청 사항 */}
      <div className="py-4 border-b border-[#e2e2e2]">
        <p className="text-[20px] text-[#232527] font-semibold mb-2">{`요청 사항 (선택)`}</p>
        <p className="text-[16px] leading-[1.45] font-normal text-neutral-600">
          별도의 요청 사항을 보장해드릴 수는 없으나, 숙소 측에서 서비스 제공을 위해 최선의 노력을 다할 것 입니다. 예약을
          완료한 후에도 별도의 요쳥 사항을 보내실 수 있으니 참고 바랍니다.
        </p>
      </div>

      {/* 유아용 침대 */}
      <div className="mt-4 py-4">
        <p className="text-[#444] text-[16px] font-semibold mb-2">
          유아용 침대/엑스트라 베드
          <span className="text-[#A0A0A0] ml-2 text-[14px] leading-[1.45] font-normal">(선택 사항)</span>
        </p>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="w-[15px] h-[15px]"
            onChange={(e) => handleCheckboxChange('유아용 침대', e.target.checked)}
          />
          <span className="ml-2 text-[16px] text-[#777] leading-[1.45]">{`유아용 침대 (가능한 경우)`}</span>
        </label>
      </div>

      {/* 별도 요청 사항 */}
      <div className="pt-4 pb-8">
        <p className="text-[#444] text-[16px] font-semibold mb-2">
          요청사항
          <span className="text-[#A0A0A0] ml-2 text-[14px] leading-[1.45] font-normal">(선택 사항)</span>
        </p>
        <input
          className=" w-full px-4 py-3 text-[#232527] rounded-[8px] border border-[#BFBFBF] mb-2"
          placeholder="별도의 요청사항을 작성해 주세요."
          value={customRequest}
          onChange={handleCustomRequestChange}
        />

        <label className="flex items-center ">
          <input
            type="checkbox"
            className="w-5 h-5"
            onChange={(e) => handleCheckboxChange('예약한 객실은 서로 붙여주세요.', e.target.checked)}
          />
          <span className="ml-2 text-[16px] text-[#777] leading-[1.45]">{`예약한 객실은 서로 붙여주세요. (가능한 경우)`}</span>
        </label>
      </div>
    </section>
  );
};

export default Requests;
