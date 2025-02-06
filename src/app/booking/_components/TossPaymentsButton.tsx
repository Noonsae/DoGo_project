import { useParams } from 'next/navigation';

import { PostBookingDataType } from '@/types/supabase/booking-type';

import { loadTossPayments } from '@tosspayments/payment-sdk';
import usePostBookingData from '@/hooks/booking/usePostBookingData';
import useHotelNameAndRoomName from '@/hooks/booking/useHotelNameAndRoomName';

const TossPaymentsButton = ({ disabled, bookingData }: { disabled?: boolean; bookingData: PostBookingDataType }) => {
  const clientKey = process.env.NEXT_PUBLIC_TOSS_PAYMENTS_TEST_CLIENT_API_KEY; // 환경 변수 사용

  const { data: product } = useHotelNameAndRoomName(bookingData.hotel_id, bookingData.room_id);

  const mutation = usePostBookingData();

  const { id } = useParams();

  const handlePayment = async () => {
    if (!clientKey) {
      console.error('Toss Payments Client Key가 설정되지 않았습니다.');
      return;
    }

    const booking_data = await mutation.mutateAsync(bookingData);

    if (!booking_data) {
      return alert('로그인이 필요한 서비스입니다.');
    }

    const booking_id = booking_data[0].id;

    const tossPayments = await loadTossPayments(clientKey);

    // TODO_01 : 고유 주문 번호 booking 테이블에서 가져오기
    // TODO_02 : 상품명은 호텔 이름 + 객실 이름
    // TODO_03 : 고객명은 user.name

    try {
      await tossPayments.requestPayment('카드', {
        amount: bookingData.total_amount, // 결제 예시 금액
        orderId: `ORDER_${Date.now()}`, // 고유 주문 ID
        orderName: `${product?.hotelName} - ${product?.roomName}`, // 주문명 예시
        customerName: `${bookingData.user_last_name} ${bookingData.user_first_name}`, // 고객명 예시
        successUrl: `${window.location.origin}/booking/${booking_id}`, // 결제 성공 시 이동할 URL
        failUrl: `${window.location.origin}/booking/fail` // 결제 실패 시 이동할 URL
      });
    } catch (error) {
      console.error('결제 요청 중 오류:', error);
    }
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handlePayment}
      className={`px-6 py-3 rounded-lg font-semibold ${
        disabled
          ? 'bg-[#EFEFEF] text-[#BFBFBF] cursor-not-allowed'
          : 'bg-[#B3916A] text-white hover:bg-[#8F7455] active:bg-[#6B573F]'
      }`}
    >
      결제하기
    </button>
  );
};

export default TossPaymentsButton;
