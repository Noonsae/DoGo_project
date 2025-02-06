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
    <section className="bg-white shadow-lg rounded-lg p-6 w-[892px]">
      <p className="text-lg font-semibold">{`요청 사항 (선택)`}</p>
      <p className="text-gray-600 text-sm">
        별도의 요청 사항을 보장해드릴 수는 없으나, 숙소 측에서 서비스 제공을 위해 최선의 노력을 다할 것입니다.
      </p>
      <div className="mt-4 space-y-2">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="w-5 h-5"
            onChange={(e) => handleCheckboxChange('유아용 침대', e.target.checked)}
          />
          <span>{`유아용 침대 (선택)`}</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="w-5 h-5"
            onChange={(e) => handleCheckboxChange('예약한 객실은 서로 붙여주세요.', e.target.checked)}
          />
          <span>{`예약한 객실은 서로 붙여주세요. (선택)`}</span>
        </label>

        <input
          className="border p-3 w-full rounded-md"
          placeholder="별도의 요청사항을 작성해 주세요."
          value={customRequest}
          onChange={handleCustomRequestChange}
        />
      </div>
    </section>
  );
};

export default Requests;
