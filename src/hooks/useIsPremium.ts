import { useGetPaymentQuery } from "@store/api/paymentApi/paymentApiSlice";

interface UseIsPremiumHook {
  isPremium: boolean;
  isLoading: boolean;
  isError: boolean;
}

function useIsPremium(): UseIsPremiumHook {
  const { data: paymentData, isLoading, isError } = useGetPaymentQuery(undefined);

  function calculateMinutesBetweenDates(): number {
    const diffInMs = new Date(new Date()).getTime() - new Date(paymentData?.duration,).getTime();
    const diffInMinutes = diffInMs / 60000;
    return Math.floor(diffInMinutes);
  }
  
  const  minutesBetween  = calculateMinutesBetweenDates();

console.log(paymentData)
  const isPremium = paymentData?.isPremium && !isError && minutesBetween > 0;

  return {
    isPremium,
    isLoading,
    isError,
  };
}

export default useIsPremium;