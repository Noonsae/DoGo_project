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
    <select value={selectedCategory} onChange={handleChange} className="border p-2 rounded mt-2 w-full ">
      <option value="" disabled>
        문의 사항의 카테고리를 선택해 주세요.
      </option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default InquiryCategory;
