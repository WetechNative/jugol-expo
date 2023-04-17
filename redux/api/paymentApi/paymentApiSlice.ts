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
      invalidatesTags: ['getPayment'],
    }),
    addSMSPackage: builder.mutation({
      query: (body) => ({
        url: `payment/addSMSPackage`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['getSMSPackage'],
    }),
    getPayment: builder.query({
      query: () => ({
        url: `payment/getPayment`,
        method: 'GET',
      }),
      providesTags: ['getPayment']
    }),
    getSMSPackage: builder.query({
      query: () => ({
        url: `payment/getSMSPackage`,
        method: 'GET',
      }),
      providesTags: ['getSMSPackage'],
    })
  }),
  overrideExisting: true,
});

export const {
    useCreatePaymentMutation,
    useAddPaymentMutation,
    useGetPaymentQuery,
    useAddSMSPackageMutation,
    useGetSMSPackageQuery
} = paymentApiSlice;
