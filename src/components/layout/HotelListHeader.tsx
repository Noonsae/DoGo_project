'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Link from 'next/link';

import MyPageIcon from './navigator/MyPageIcon';
import HamburgerBtn from './navigator/HamburgerBtn';
import { WhiteGoBackIcon } from '../ui/icon/WhiteIcon';

// TODO 함수 표현식으로 변경
export default function HotelListHeader() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  // TODO 데이터 요청 함수 분리
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/hotel-user'); // 🔥 서버 API 호출
        const data = await response.json();

        if (data?.userId) {
          setUserId(data.userId);
          setUserRole(data.userRole);
        }
      } catch (error) {
        console.error('❌ 사용자 정보를 불러오는 중 오류 발생:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  const mypageLink =
    userRole === 'admin' ? `/my-page/admin` : userRole ? `/my-page/${userRole}/profile` : '/my-page/user/profile';

  return (
    <div className="bg-[#221A1A]">
      <div className="w-full max-w-[1300px] px-[20px] h-[76px] mx-auto flex flex-row justify-between items-center">
        {/* 🔙 뒤로 가기 버튼 */}
        <button onClick={handleBack} className="text-red-500">
          <WhiteGoBackIcon />
        </button>

        {/* 👤 아이콘 영역 */}
        <div className="flex flex-row">
          <div className="flex flex-row items-center">
            {/* 🔥 로그인된 사용자만 마이페이지 아이콘 표시 */}
            {userId && userRole && (
              <Link href={mypageLink} className="">
                <MyPageIcon />
              </Link>
            )}
            {/* 🍔 햄버거 메뉴 */}
            <HamburgerBtn />
          </div>
        </div>
      </div>
    </div>
  );
}
