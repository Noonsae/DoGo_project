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
    <div className="flex flex-col gap-4 mt-4 w-full max-w-[90%] sm:max-w-[500px] md:max-w-[600px] mx-auto">
      <label className="font-semibold text-[#444]">
        카테고리 <span className="ml-1 text-red-500">*</span>
      </label>
      <select
        value={selectedCategory}
        onChange={handleChange}
        className={`flex flex-row justify-center w-full min-w-full sm:w-auto sm:max-w-[500px] md:max-w-[600px] h-[48px] 
        items-center sm:gap-2 md:gap-4 border rounded text-[16px] sm:text-[14px] md:text-[16px] lg:text-[18px] 
        font-medium leading-[135%] ${selectedCategory ? 'text-black' : 'text-[#A0A0A0]'}`}
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
      <style jsx global>{`
        select {
          width: 100%;
          max-width: 600px;
        }
        @media (max-width: 640px) {
          select {
            width: 100%;
            max-width: 90%;
          }
        }
        /* ✅ iOS 사파리 & 안드로이드 크롬에서 드롭다운 크기 강제 확장 */
        @supports (-webkit-touch-callout: none) {
          select {
            font-size: 16px; /* iOS에서 확대 방지 */
          }
        }
      `}</style>
    </div>
  );
};

export default InquiryCategory;
