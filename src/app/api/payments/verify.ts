import type { NextApiRequest, NextApiResponse } from 'next';

const verifyPayment = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { paymentKey, orderId, amount } = req.body;

    const secretKey = process.env.TOSS_PAYMENTS_TEST_SECRECT_API_KEY; // 서버 사이드 환경 변수 사용

    if (!secretKey) {
      return res.status(500).json({ message: 'Secret Key가 설정되지 않았습니다.' });
    }

    try {
      const response = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(`${secretKey}:`).toString('base64')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ paymentKey, orderId, amount })
      });

      if (!response.ok) {
        const errorData = await response.json();
        return res.status(response.status).json({ message: errorData.message });
      }

      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: '서버 오류 발생', error });
    }
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).end('Method Not Allowed');
};

export default verifyPayment;
