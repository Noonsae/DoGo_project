'use client';

import { useEffect } from 'react';

import { useParams, useRouter } from 'next/navigation';

import useAuthStore from '@/store/useAuth';

import useUserQuery from '@/hooks/user/useUserData';
import useFetchBookingData from '@/hooks/booking/useFetchBookingData';

import { getDayOfWeek } from '@/utils/calculator/dateCalculator';
import { clearBookingData } from '@/utils/booking/booking';

import IoCheckmarkCircle from '@/components/ui/icon/IoCheckmarkCircle';
import IoIosCopyIcon from '@/components/ui/icon/IoIosCopyIcon';
import IoBedIcon from '@/components/ui/icon/IoBedIcon';
import IoMdPinIcon from '@/components/ui/icon/IoMdPinIcon';

// 예약 확정 결과 페이지
const BookingConfirmPage = () => {
  const router = useRouter();

  const { user } = useAuthStore();
  const userId: string | null = user?.id ?? null;
  const { data: userData } = useUserQuery(userId);
  const safeUserData = userData || { user_name: null, email: null, phone_number: null };

  // 성공 페이지에 도달하면 로컬스토리지에 저장된 예약 일정 관련 정보를 제거함
  useEffect(() => {
    clearBookingData();
  }, []);

  const handleHome = () => {
    router.push('/');
  };

  const params = useParams();

  const { data: fetchBookingData } = useFetchBookingData(params.id as string);

  const checkInDayOfWeek = getDayOfWeek(fetchBookingData ? fetchBookingData.check_in_date : '');
  const checkOutDayOfWeek = getDayOfWeek(fetchBookingData ? fetchBookingData.check_out_date : '');

  const formatPhoneNumber = (phoneNumber: string): string => {
    return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  };

  const phone_number = safeUserData.phone_number ? formatPhoneNumber(safeUserData.phone_number) : '전화번호 없음';

  return (
    <section className="w-full max-w-[1300px] px-[50px] mx-auto py-32 md:px-10 lg:px-32 flex flex-col space-y-6">
      {/* 예약 확정 메시지 */}
      <div className="mb-8">
        <p className="text-[#B3916A] text-[24px] font-semibold mb-4">예약이 확정되었습니다.</p>

        <div className="flex felx-row items-center justify-start gap-2">
          <IoCheckmarkCircle />
          <p className="text-gray-500 text-sm mt-1">
            체크인 전까지 마이페이지에서 자유롭게 예약을 변경하거나 취소할 수 있습니다.
          </p>
        </div>
      </div>

      {/* 나의 예약 번호 */}
      <div className="w-full mb-8 px-9 py-8 border border-[#E2E2E2] rounded-[12px]">
        <p className="text-[20px] font-semibold text-[#232527] mb-2">나의 예약 번호</p>
        <div className="flex flex-row items-center justify-start gap-2">
          <p className="text-[#636363]"> {fetchBookingData?.id ?? '예약 정보 없음'}</p>
          <button
            onClick={() => navigator.clipboard.writeText(fetchBookingData?.id ?? '')}
            className="text-[#B3916A] text-[16px] leading-[1.45] font-normal underline flex flex-row items-center gab-1"
          >
            <IoIosCopyIcon className="text-[#B3916A]" />
            <span>복사하기</span>
          </button>
        </div>
      </div>

      {/* 호텔 정보 */}
      <div className="w-full px-9 py-4 border border-gray-200 rounded-[12px] ">
        {/* 호텔 정보 확인하기 */}
        <div className="py-4 border-b border-[#E2E2E2]">
          <p className="text-[20px] font-semibold text-[#232527] mb-2">호텔 정보 확인하기</p>
          <p className="text-[#777] text-4 leading0[1.45]">예약하신 호텔의 정보를 확인해 주세요.</p>
        </div>

        {/* 호텔 시설 정보 */}
        <div className="mt-5 mb-5">
          <p className="text-[20px] text-[#232527] mb-5 font-semibold">{fetchBookingData?.hotels.name}</p>

          <div className="flex flex-row items-center justify-start gap-3 mb-3">
            <IoBedIcon className="w-6 h-6 text-[#777]" />
            <p className="text-[#444] text-[16px] leading-[1.45]">{fetchBookingData?.rooms.room_name}</p>
          </div>

          <div className="flex flex-row items-center justify-start gap-3">
            <IoMdPinIcon className="w-6 h-6 text-[#777]" />
            <p className="text-[#444] text-[16px] leading-[1.45]">{fetchBookingData?.hotels.address}</p>
          </div>
        </div>

        {/* 체크인 & 체크아웃 정보 */}
        <div className="py-3 flex flex-row items-center justify-between w-[415px]">
          <div className="w-full px-6 py-4 border-r border-[#E2E2E2]">
            <p className="text-[16px] text-[#444] font-medium mb-2">체크인</p>
            <p className="text-[20px] text-[#444] font-semibold mb-2">
              {fetchBookingData?.check_in_date ?? '날짜 없음'}
              {''}
              <span>({checkInDayOfWeek})</span>
            </p>
            <p className="text-[#777] text-[16px] leading-[1.45]">{fetchBookingData?.hotels.check_in} ~ 00:00</p>
          </div>

          <div className="w-full px-6 py-4">
            <p className="text-[16px] text-[#444] font-medium mb-2">체크아웃</p>
            <p className="text-[20px] text-[#444] font-semibold mb-2">
              {fetchBookingData?.check_out_date ?? '날짜 없음'}
              {''}
              <span>({checkOutDayOfWeek})</span>
            </p>
            <p className="text-[#777] text-[16px] leading-[1.45]">00:00 ~ {fetchBookingData?.hotels.check_out}</p>
          </div>
        </div>
      </div>

      {/* 투숙객 정보 */}
      <div className="w-full px-9 py-4 border border-gray-200 rounded-[12px]">
        <div className="py-4 border-b border-[#E2E2E2]">
          <p className="text-[20px] text-[#232527] mb-2 font-semibold">투숙객 정보</p>
          <p className="text-[#777] text-4 leading0[1.45]">투숙하실 고객의 정보를 확인해 주세요.</p>
        </div>

        <div className="py-4">
          <p className="mb-5 text-[20px] text-[#232527] font-semibold">{safeUserData?.user_name} 님</p>
          {/* 고객님 영문이름 추가 */}
          <p className="text-[18px] text-[#444]font-semibold mb-3">
            <span>투숙객 성함</span>
            <span className="text-[#636363] font-normal ml-3">
              {fetchBookingData?.user_last_name}
              &nbsp;
              {fetchBookingData?.user_first_name}
            </span>
          </p>
          <p className="text-[18px] text-[#444]font-semibold mb-3">
            <span>이메일 주소</span>
            <span className="text-[#636363] font-normal ml-3">{safeUserData?.email}</span>
          </p>

          <p className="text-[18px] text-[#444]font-semibold mb-3">
            <span>휴대폰 번호</span>
            <span className="ml-3 text-[#636363] font-normal">{phone_number}</span>
          </p>
        </div>
      </div>

      {/* 홈으로 돌아가기 버튼 */}
      <div className="w-full flex flex-row justify-end">
        <button
          className="bg-[#B3916A] text-white text-[20px] font-semibold rounded-[8px] px-6 py-2.5 hover:bg-[#8F7455]"
          onClick={handleHome}
        >
          홈으로 돌아가기
        </button>
      </div>
    </section>
  );
};

export default BookingConfirmPage;
