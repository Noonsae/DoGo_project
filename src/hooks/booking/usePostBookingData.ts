import { postBookingData } from '@/utils/api/post/postBookingData';
import { useMutation } from '@tanstack/react-query';


const usePostBookingData = () => {
  return useMutation({
    mutationFn: postBookingData,
    onSuccess: (data) => {
      console.log('Booking successfully created:', data);
    },
    onError: (error) => {
      console.error('Error creating booking:', error.message);
    }
  });
};

export default usePostBookingData;
