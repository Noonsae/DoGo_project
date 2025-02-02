//문의하기버튼
'use client';
import React from 'react';

const InquiryButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div>
      {' '}
      <button onClick={onClick} className="bg-green-500 text-white p-2 rounded">
        문의하기
      </button>
    </div>
  );
};

export default InquiryButton;
