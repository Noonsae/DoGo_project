import { loadTossPayments } from '@tosspayments/payment-sdk';
import { useParams } from 'next/navigation';

const TossPaymentsButton = () => {
  const clientKey = process.env.NEXT_PUBLIC_TOSS_PAYMENTS_TEST_CLIENT_API_KEY; // 환경 변수 사용
  const { id } = useParams(); // URL에서 id를 가져옴

  const handlePayment = async () => {
    if (!clientKey) {
      console.error('Toss Payments Client Key가 설정되지 않았습니다.');
      return;
    }

    const tossPayments = await loadTossPayments(clientKey);

    try {
      await tossPayments.requestPayment('카드', {
        amount: 100, // 결제 예시 금액
        orderId: `ORDER_${Date.now()}`, // 고유 주문 ID
        orderName: '테스트 결제', // 주문명 예시
        customerName: '홍길동', // 고객명 예시
        successUrl: `${window.location.origin}/booking/${id}`, // 결제 성공 시 이동할 URL
        failUrl: `${window.location.origin}/fail` // 결제 실패 시 이동할 URL
      });
    } catch (error) {
      console.error('결제 요청 중 오류:', error);
    }
  };

  return (
    <button onClick={handlePayment} className="bg-[#B3916A] text-white px-6 py-3 rounded-md">
      결제하기
    </button>
  );
};

export default TossPaymentsButton;
