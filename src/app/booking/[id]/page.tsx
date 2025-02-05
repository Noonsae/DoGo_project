'use client';

import { useParams, useRouter } from 'next/navigation';

import useAuthStore from '@/store/useAuth';

import useUserQuery from '@/hooks/user/useUserData';
import useFetchBookingData from '@/hooks/booking/useFetchBookingData';

import FileIcon from '@/components/ui/icon/FileIcon';

//예약확정페이지

const BookingConfirmPage = () => {

  const router = useRouter();

  const { user } = useAuthStore();
  const userId: string | null = user?.id ?? null;
  const { data: userData } = useUserQuery(userId);
  const safeUserData = userData || { user_name: null, email: null, phone_number: null };

  console.log(userData);

  const handleHome = () => {
    router.push('/');
  };

  const params = useParams();

  const { data: fetchBookingData } = useFetchBookingData(params.id as string);

  console.log(fetchBookingData);

  const formatPhoneNumber = (phoneNumber: string): string => {
    return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  };

  const phone_number = safeUserData.phone_number ? formatPhoneNumber(safeUserData.phone_number) : '전화번호 없음';

  return (
    <div className="container mx-auto py-32 px-4 md:px-10 lg:px-32 max-w-4xl flex flex-col space-y-6">
      {/* 예약 확정 메시지 */}
      <div>
        <p className="text-[#B3916A] text-xl font-bold">예약이 확정되었습니다.</p>

        <p className="text-gray-500 text-sm mt-1">
          체크인 전까지 마이페이지에서 자유롭게 예약을 변경하거나 취소할 수 있습니다.
        </p>
      </div>

      {/* 예약 번호 */}
      <div className="  rounded-lg p-6 border border-gray-200">
        <p className="text-lg font-semibold text-gray-700">나의 예약 번호</p>
        <p className="text-gray-800 mt-2"> {fetchBookingData?.id ?? '예약 정보 없음'}</p>
        <div className="flex flex-row items-center">
          <FileIcon />
          <button
            onClick={() => navigator.clipboard.writeText(fetchBookingData?.id ?? '')}
            className="mt-2 ml-[10px] text-[#B3916A] text-sm underline "
          >
            복사하기
          </button>
        </div>
      </div>

      {/* 호텔 정보 */}
      <div className="  rounded-lg p-6 border border-gray-200">
        <p className="text-lg font-semibold text-gray-700">호텔 정보 확인하기</p>
        <p className="text-gray-500 text-sm mt-1">예약하신 호텔의 정보를 확인해 주세요.</p>
        <hr className="border-t border-gray-300 my-6" />
        <div className="mt-4 space-y-2">
          <p className="font-semibold">{fetchBookingData?.hotels.name}</p>
          <p className="text-gray-600">{fetchBookingData?.rooms.room_name}</p>
          <p className="text-gray-500">{fetchBookingData?.hotels.address}</p>
        </div>

        {/* 체크인 & 체크아웃 정보 */}
        <div className="flex mt-4 mr-[24px]">
          <div className="ml-[30px]">
            <p className="font-semibold">체크인</p>
            <p className="text-gray-600">
              {fetchBookingData?.check_in_date ?? '날짜 없음'}
              <p>{fetchBookingData?.hotels.check_in}</p>
            </p>
          </div>
          <div className="w-[1px] ml-36 bg-gray-300 h-10"></div>

          <div className="ml-[24px]">
            <p className="font-semibold ">체크아웃</p>
            <p className="text-gray-600">
              {fetchBookingData?.check_in_date ?? '날짜 없음'}
              <p>{fetchBookingData?.hotels.check_out}</p>
            </p>
          </div>
        </div>
      </div>

      {/* 투숙객 정보 */}
      <div className="  rounded-lg p-6 border border-gray-200">
        <p className="text-lg font-semibold text-gray-700">투숙객 정보</p>
        <p className="text-gray-500 text-sm mt-1">투숙하실 고객의 정보를 확인해 주세요.</p>
        <hr className="border-t border-gray-300 my-6" />

        <div className="mt-4 space-y-2">
          <p className="font-semibold">{safeUserData?.user_name} 님</p>
          {/* 고객님 영문이름 추가 */}
          <p className="text-gray-600">
            {fetchBookingData?.user_last_name}
            &nbsp;
            {fetchBookingData?.user_first_name}
          </p>
          <p className="text-gray-500">{safeUserData?.email}</p>
          <p className="text-gray-500">{phone_number}</p>
        </div>
      </div>

      {/* 홈으로 돌아가기 버튼 */}
      <div className="w-full flex flex-row justify-end">
        <button
          className="bg-[#B3916A] text-white rounded-md py-3 px-6 w-full md:w-[174px] hover:bg-opacity-80"
          onClick={handleHome}
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmPage;
