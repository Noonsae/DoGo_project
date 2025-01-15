import React, { useCallback } from 'react';

const useFormatCurrency = (): ((amount: number | string) => string) => {
  const formatKoreanCurrency = useCallback((amount: number | string): string => {
    const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

    if (isNaN(numericAmount)) {
      console.error(`Invalid amount: ${amount}`);
      return amount.toString(); // 반환값을 문자열로 변환
    }

    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW'
    }).format(numericAmount);
  }, []);

  return formatKoreanCurrency;
};

export default useFormatCurrency;
