import {apiSlice} from '../apiSlice';

const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createPayment: builder.mutation({
      query: (body) => ({
        url: `payment/createPayment`,
        method: 'POST',
        body,
      }),
    }),
    addPayment: builder.mutation({
      query: (body) => ({
        url: `payment/addUserToPaymentList`,
        method: 'POST',
        body,
      }),
    }),
    getPayment: builder.query({
      query: () => ({
        url: `payment/getPayment`,
        method: 'GET',
      }),
    })
  }),
  overrideExisting: true,
});

export const {
    useCreatePaymentMutation,
    useAddPaymentMutation,
    useGetPaymentQuery
} = paymentApiSlice;
