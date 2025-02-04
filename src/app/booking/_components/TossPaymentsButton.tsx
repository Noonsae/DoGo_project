import { loadTossPayments } from '@tosspayments/payment-sdk';
import { useParams } from 'next/navigation';

const TossPaymentsButton = ({ disabled, roomPrice }: { disabled?: boolean; roomPrice: number }) => {

  const clientKey = process.env.NEXT_PUBLIC_TOSS_PAYMENTS_TEST_CLIENT_API_KEY; // 환경 변수 사용

  const { id } = useParams(); // URL에서 id를 가져옴

  const handlePayment = async () => {
    if (!clientKey) {
      console.error('Toss Payments Client Key가 설정되지 않았습니다.');
      return;
    }

    const tossPayments = await loadTossPayments(clientKey);

    // TODO_01 : 고유 주문 번호 booking 테이블에서 가져오기
    // TODO_02 : 상품명은 호텔 이름 + 객실 이름
    // TODO_03 : 고객명은 user.name

    try {
      await tossPayments.requestPayment('카드', {
        amount: roomPrice, // 결제 예시 금액
        orderId: `ORDER_${Date.now()}`, // 고유 주문 ID
        orderName: '테스트 결제', // 주문명 예시
        customerName: '홍길동', // 고객명 예시
        successUrl: `${window.location.origin}/booking/${id}`, // 결제 성공 시 이동할 URL
        failUrl: `${window.location.origin}/booking/fail` // 결제 실패 시 이동할 URL
      });

      console.log(id);
    } catch (error) {
      console.error('결제 요청 중 오류:', error);
    }
  };

  // 결제가 성공했을 경우 예약페이지에 입력된 데이터를 db에 저장하는 로직이 필요함.

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
