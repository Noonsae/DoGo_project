// 아이디 찾기 페이지
'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const FindIdPage = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleFined = () => {
    router.push('/sign-in');
  };
  const handleFindId = async () => {
    if (!name || !phone) {
      Swal.fire({
        icon: 'warning',
        title: '입력 오류',
        text: '이름과 휴대폰 번호를 입력해주세요.'
      });
      return;
    }

    setIsLoading(true);
    try {
      // TODO: API 호출로 아이디(이메일) 조회
      const response = await fetch('/api/auth/find-id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone })
      });
      const result = await response.json();

      if (response.ok && result.email) {
        Swal.fire({
          icon: 'success',
          title: '아이디 찾기 성공',
          text: `등록된 이메일: ${result.email}`
        }).then(() => {
          // 로그인 화면으로 이동
          router.push('/sign-in');
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: '아이디 찾기 실패',
          text: '입력한 정보와 일치하는 이메일을 찾을 수 없습니다.'
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '서버 오류',
        text: '아이디 찾기 중 문제가 발생했습니다. 다시 시도해주세요.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="p-8 bg-white rounded-lg w-[400px]">
        <h1 className="text-2xl font-bold mb-4">아이디 찾기</h1>
        <input
          type="text"
          placeholder="이름을 입력해주세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <input
          type="tel"
          placeholder="휴대폰 번호를 입력해주세요"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button
          onClick={handleFindId}
          className="w-full bg-[#7C7C7C] text-white py-2 rounded hover:bg-[#a3a3a3] transition"
          disabled={isLoading}
        >
          {isLoading ? '조회 중...' : '아이디 찾기'}
        </button>
      </div>
    </div>
  );
};

export default FindIdPage;
