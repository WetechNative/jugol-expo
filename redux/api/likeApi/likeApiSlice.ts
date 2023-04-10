import { setAllUserDetails } from '@store/features/user/userSlice';
import { apiSlice } from '../apiSlice';
import { userApiSlice } from '../userApi/userApiSlice';
import  io  from 'socket.io-client';
import { BASE_URL } from '@config';

const likeApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        addLike: builder.mutation({
            query: body => ({
                url: 'like/addLike',
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['getAllLikes'],
        }),
        getAllLikes: builder.query({
            query: () => ({
                url: 'like/getAllLikes',
                method: 'GET',
            }),
            providesTags: ['getAllLikes'],
        }),
        deleteLike: builder.mutation({
            query: body => ({
                url: 'like/deleteLike',
                method: 'DELETE',
                body: body
            }),
            invalidatesTags: ['getAllUser', 'getAllLikes'],
        }),
    }),
    overrideExisting: true,
});

export const {
    useAddLikeMutation,
    useGetAllLikesQuery,
    useDeleteLikeMutation,
} = likeApiSlice;
