import React, { useCallback } from 'react';

const useFormatCurrency = () => {
  const formatKoreanCurrency = useCallback((amount: number | string) => {
    const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

    if (isNaN(numericAmount)) {
      console.error(`Invalid amount: ${amount}`);
      return amount;
    }
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW'
    }).format(numericAmount);
  }, []);
  return formatKoreanCurrency;
};

export default useFormatCurrency;
