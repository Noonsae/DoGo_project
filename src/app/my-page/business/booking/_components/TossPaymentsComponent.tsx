import React from 'react';
import { loadTossPayments } from '@tosspayments/payment-sdk';

const TossPaymentsComponent = () => {
  const handlePayment = async () => {
    const tossPayments = await loadTossPayments('test_ck_xxxxxxx'); // Replace with your test Client Key

    tossPayments
      .requestPayment('카드', {
        amount: 50000, // 결제 금액
        orderId: `ORDER_${Date.now()}`, // 고유 주문 ID
        orderName: '테스트 결제', // 주문명
        customerName: '홍길동', // 고객명
        successUrl: 'http://localhost:3000/success', // 결제 성공 시 이동할 URL
        failUrl: 'http://localhost:3000/fail' // 결제 실패 시 이동할 URL
      })
      .catch((error) => {
        console.error(error); // 결제 요청 중 오류 처리
      });
  };

  return (
    <div>
      <h1>테스트 결제</h1>
      <button onClick={handlePayment} className="px-4 py-2 bg-blue-500 text-white rounded">
        결제하기
      </button>
    </div>
  );
};

export default TossPaymentsComponent;