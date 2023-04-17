import { useGetPaymentQuery } from "@store/api/paymentApi/paymentApiSlice";

interface UseIsPremiumHook {
  isPremium: boolean;
  isLoading: boolean;
  isError: boolean;
}

function useIsPremium(): UseIsPremiumHook {
  const { data: paymentData, isLoading, isError } = useGetPaymentQuery(undefined);
  console.log({paymentData})

  function calculateMinutesBetweenDates(): number {
    const diffInMs = new Date(new Date()).getTime() - new Date(paymentData?.duration).getTime();
    const diffInMinutes = diffInMs / 60000;
    return Math.floor(diffInMinutes);
  }
  
  const  minutesBetween  = calculateMinutesBetweenDates();
  const lastMinutesBetween = parseInt(paymentData?.package) * 43829;
  console.log({minutesBetween, lastMinutesBetween})

console.log(paymentData)
  const isPremium = paymentData?.isPremium && !isError && minutesBetween >= 0 && lastMinutesBetween > minutesBetween;

  return {
    isPremium,
    isLoading,
    isError,
  };
}

export default useIsPremium;