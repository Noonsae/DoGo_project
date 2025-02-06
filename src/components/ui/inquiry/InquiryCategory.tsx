'use client';
//카테고리 드롭다운
import { useState } from 'react';
interface InquiryCategoryProps {
  onCategoryChange: (category: string) => void;
}

const InquiryCategory = ({ onCategoryChange }: InquiryCategoryProps) => {
  const categories = ['호텔 시설 관련 문의', '호텔 정책 관련 문의', '예약 문의', '결제 및 환불 문의', '기타 문의'];
  const [selectedCategory, setSelectedCategory] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    onCategoryChange(newCategory);
  };

  return (
    <div className="flex flex-col gap-2 w-full max-w-[90%] sm:max-w-[500px] md:max-w-[600px] mx-auto">
      <label className="text-neutral-800 font-pretendard text-[16px] font-semibold leading-[135%] mt-[32px] sm:mt-[60px]">
        카테고리 <span className="ml-1 text-red-500">*</span>
      </label>
      <select
        value={selectedCategory}
        onChange={handleChange}
        className={`w-[320px] h-[48px] px-[16px] py-[8px] min-w-full sm:w-auto sm:max-w-[500px] md:max-w-[600px]  
          items-center border rounded text-[16px] sm:text-[14px] md:text-[16px] lg:text-[18px] font-medium leading-[135%] 
          bg-white bg-no-repeat bg-[right_16px_center] border-neutral-400 focus:ring-1 focus:ring-[#B3916A] focus:border-[#B3916A] outline-none 
          ${selectedCategory ? 'text-black' : 'text-[#A0A0A0]'}`}
        style={{
          WebkitAppearance: 'none',
          MozAppearance: 'none',
          appearance: 'none',
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>')`,
          backgroundPosition: 'right 16px center',
          backgroundSize: '16px 16px',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <option value="" disabled>
          문의 사항의 카테고리를 선택해 주세요.
        </option>
        {categories.map((category) => (
          <option key={category} value={category} className="text-black">
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InquiryCategory;
