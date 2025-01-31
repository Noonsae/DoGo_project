'use client';

import { useState } from 'react';

interface PhoneNumberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (phone: string) => void;
}
const KaKaoUpdate = ({ isOpen, onClose, onSubmit }: PhoneNumberModalProps) => {
  const [phone, setPhone] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-semibold mb-4">전화번호 입력</h2>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="전화번호를 입력하세요"
          className="w-full border p-2 rounded-lg"
        />
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg">
            취소
          </button>
          <button onClick={() => onSubmit(phone)} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default KaKaoUpdate;
