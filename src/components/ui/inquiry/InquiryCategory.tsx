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
    <select
      value={selectedCategory}
      onChange={handleChange}
      className={`flex h-[48px] px-4 py-2 items-center gap-1 sm:gap-2 md:gap-4 border rounded mt-2 w-full text-[16px] sm:text-[14px] md:text-[16px] lg:text-[18px] font-medium leading-[135%] ${
        selectedCategory ? 'text-black' : 'text-[#A0A0A0]'
      }`}
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
  );
};

export default InquiryCategory;
