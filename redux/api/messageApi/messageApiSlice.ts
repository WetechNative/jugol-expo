import { BASE_URL } from "@config";
import io from "socket.io-client";
import { IConversationProps } from "../../../src/screens/message-screens/MessagesScreen/MessageScreen.types";
import { RootState } from "../../index";
import { apiSlice } from "../apiSlice";
import {
  IConversationResponse,
  IGetConversations,
  IGetMessages,
  IMessageData,
  IMessageDraft,
  IMessageResponse,
} from "./messageApiSlice.types";
import { IMessage } from "react-native-gifted-chat";

export const messageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: () => {
        return {
          url: "messages/getConversations",
          method: "GET",
        };
      },
      async onCacheEntryAdded(
        args,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData, getState }
      ) {
        try {
          const socket = io(BASE_URL);
          const state: RootState = getState();

          const userId = state?.auth?.uid;

          socket.on("sendMessage", async (message: IMessageResponse) => {
            try {
              const reciver = message?.reciver?._id;
              const sender = message?.sender?._id;
              const senderFirebaseId = message?.sender?.user;
              const reciverFirebaseId = message?.reciver?.user;
              const lastMessage = message?.message;
              const messageCreatedAt = message?.createdAt;
              const files = message?.files;
              const reciverIsActive = message?.reciver?.isActive;
              const senderIsActive = message?.sender?.isActive;

              updateCachedData((draft: IConversationResponse) => {
                if (draft?.data) {
                  const isSenderAlreadyInTheConversation = draft?.data?.find(
                    (data) =>
                      data?.userID === sender && data?.currentUser === reciver
                  );
                  const isReciverAlreadyInTheConversation = draft?.data?.find(
                    (data) =>
                      data?.userID === reciver && data?.currentUser === sender
                  );

                  if (isReciverAlreadyInTheConversation) {
                    isReciverAlreadyInTheConversation.lastMessage = lastMessage;
                    isReciverAlreadyInTheConversation.createdAt =
                      messageCreatedAt;
                    isReciverAlreadyInTheConversation.files = files;
                    isReciverAlreadyInTheConversation.isActive =
                      reciverIsActive;
                  }
                  if (isSenderAlreadyInTheConversation) {
                    isSenderAlreadyInTheConversation.lastMessage = lastMessage;
                    isSenderAlreadyInTheConversation.createdAt =
                      messageCreatedAt;
                    isSenderAlreadyInTheConversation.files = files;
                    isSenderAlreadyInTheConversation.isActive = senderIsActive;
                  }

                  if (
                    !isReciverAlreadyInTheConversation &&
                    !isSenderAlreadyInTheConversation
                  ) {
                    if (
                      message?.sender?.user === userId ||
                      message?.reciver?.user === userId
                    ) {
                      const nextUser =
                        message?.sender?.user === userId
                          ? message?.reciver
                          : message?.sender;
                      const currentUser =
                        message?.sender?.user !== userId
                          ? message?.reciver
                          : message?.sender;
                      const newConversation: IConversationProps = {
                        profilePic: nextUser.profilePic,
                        createdAt: messageCreatedAt,
                        lastMessage,
                        userID: nextUser?._id,
                        currentUser: currentUser?._id,
                        name: nextUser?.firstName + " " + nextUser?.lastName,
                        firebaseID: nextUser?.user,
                        unread: 0,
                        updatedAt: message?.updatedAt,
                        files: message?.files,
                        isActive: nextUser?.isActive,
                      };
                      draft?.data?.push(newConversation);
                    }
                  }
                } else {
                  console.warn("draft is undefined");
                }
              });
            } catch (error) {
              console.error(error);
            }
          });

          socket.on("addBlockedUser", async (blockedData) => {
            try {
              const user1DatabaseId = blockedData.blocker;
              const user2DatabaseId = blockedData.blocked;

              updateCachedData((draft: IConversationResponse) => {
                if (draft?.data) {
                  const condition1 = draft.data.filter(
                    (data) =>
                      data.currentUser === user1DatabaseId &&
                      data.userID === user2DatabaseId
                  );
                  const condition2 = draft.data.filter(
                    (data) =>
                      data.currentUser === user2DatabaseId &&
                      data.userID === user1DatabaseId
                  );

                  if (condition2.length > 0) {
                    condition2[0].blockedBySomeone = true;
                    condition2[0].blockedByYou = false;
                    condition2[0].isBlocked = true;
                  }

                  if (condition1.length > 0) {
                    condition1[0].blockedBySomeone = false;
                    condition1[0].blockedByYou = true;
                    condition1[0].isBlocked = true;
                  }
                }
              });
            } catch (error) {
              console.log(error);
            }
          });

          socket.on("removeBlockedUser", async (blockedData) => {
            try {
              const user1DatabaseId = blockedData.unblocker;
              const user2DatabaseId = blockedData.unblocked;
              updateCachedData((draft: IConversationResponse) => {
                if (draft?.data) {
                  const condition1 = draft.data.filter(
                    (data) =>
                      data.currentUser === user1DatabaseId &&
                      data.userID === user2DatabaseId
                  );
                  const condition2 = draft.data.filter(
                    (data) =>
                      data.currentUser === user2DatabaseId &&
                      data.userID === user1DatabaseId
                  );

                  if (condition2.length > 0) {
                    condition2[0].blockedBySomeone = false;
                    condition2[0].blockedByYou = false;
                    condition2[0].isBlocked = false;
                  }

                  if (condition1.length > 0) {
                    condition1[0].blockedBySomeone = false;
                    condition1[0].blockedByYou = false;
                    condition1[0].isBlocked = false;
                  }
                }
              });
            } catch (error) {
              console.log(error);
            }
          });

          socket.on("deleteConversation", async (data) => {
            try {
              const user1 = data?.user1;
              const user2 = data?.user2;
              console.log(data);
              updateCachedData((draft: IConversationResponse) => {
                if (draft?.data) {
                  const isSenderAlreadyInTheConversation = draft?.data?.find(
                    (data) =>
                      data?.userID === user1 && data?.currentUser === user2
                  );
                  const isReciverAlreadyInTheConversation = draft?.data?.find(
                    (data) =>
                      data?.userID === user2 && data?.currentUser === user1
                  );

                  if (isReciverAlreadyInTheConversation) {
                    const newConv = draft?.data?.filter(
                      (convData) =>
                        convData?.currentUser !==
                          isReciverAlreadyInTheConversation?.currentUser ||
                        convData?.userID !==
                          isReciverAlreadyInTheConversation?.userID
                    );
                    const newConversation = {
                      data: newConv,
                      totalConversations: draft?.totalConversations,
                      totalPages: draft?.totalPages,
                      pageNumber: draft?.pageNumber,
                      pageSize: draft?.pageSize,
                    };
                    return newConversation;
                  }

                  if (isSenderAlreadyInTheConversation) {
                    const newConv = draft?.data?.filter(
                      (convData) =>
                        convData?.userID !==
                          isSenderAlreadyInTheConversation?.userID ||
                        convData?.currentUser !==
                          isSenderAlreadyInTheConversation?.currentUser
                    );
                    const newConversation = {
                      data: newConv,
                      totalConversations: draft?.totalConversations,
                      totalPages: draft?.totalPages,
                      pageNumber: draft?.pageNumber,
                      pageSize: draft?.pageSize,
                    };
                    return newConversation;
                  }
                }
              });
            } catch (error) {
              console.log(error);
            }
          });

          socket.on("activeUsers", async (data) => {
            try {
              const parseData = JSON.parse(data);

              const nextUserUID = parseData.user;

              updateCachedData((draft: IConversationResponse) => {
                if (draft?.data) {
                  const condition1 = draft.data.filter(
                    (data) =>
                      data.firebaseID === nextUserUID ||
                      data.currentUserFirebaseId === nextUserUID
                  );

                  if (condition1.length > 0) {
                    condition1[0].isActive = parseData.isActive;
                  }
                }
              });
            } catch (error) {
              console.log(error);
            }
          });

          socket.on("inactiveUsers", async (data) => {
            try {
              const parseData = JSON.parse(data);

              const nextUserUID = parseData.user;

              updateCachedData((draft: IConversationResponse) => {
                if (draft?.data) {
                  const condition1 = draft.data.filter(
                    (data) => data.firebaseID === nextUserUID
                  );

                  if (condition1.length > 0) {
                    condition1[0].isActive = parseData.isActive;
                  }
                }
              });
            } catch (error) {
              console.log(error);
            }
          });

          await cacheEntryRemoved;
          socket.close();
        } catch (error) {
          console.error(error);
          // if cacheEntryRemoved resolved before cacheDataLoaded,
          // cacheDataLoaded throws
        }
      },
    }),
    getInfiniteConversations: builder.query({
      query: (data: IGetConversations) => {
        let queryParams =
          data?.pageNumber && data?.pageSize
            ? `?pageSize=${data?.pageSize}&pageNumber=${data?.pageNumber}`
            : "";
        const url = `messages/getConversations${queryParams}`;
        return {
          url,
          method: "GET",
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          if (result?.data?.data?.length > 0) {
            dispatch(
              messageApiSlice.util.updateQueryData(
                "getConversations",
                undefined,
                (draft: IConversationResponse) => {
                  const draftData = draft?.data?.map((d) => d);
                  const resultData = result?.data?.data?.map((d) => d);
                  const newData = {
                    ...draft,
                    pageNumber: result?.data?.pageNumber,
                    data: [...draftData, ...resultData],
                  };
                  return newData;
                }
              )
            );
          }
        } catch (e) {
          console.error(e);
        }
      },
    }),
    getMessage: builder.query({
      query: (id) => {
        return {
          url: `messages/getMessage/${id}`,
          method: "GET",
        };
      },
      async onCacheEntryAdded(
        args,
        {
          cacheDataLoaded,
          cacheEntryRemoved,
          updateCachedData,
          getState,
          dispatch,
        }
      ) {
        try {
          const socket = io(BASE_URL);
          const state: RootState = getState();

          const userId = state?.auth?.uid;
          console.log({userId});

          socket.on("sendMessage", (message) => {
            console.log({message})
            const messageItem = {
              _id: message._id,
              text: message.message,
              user: {
                _id: message?.sender?._id,
                name:
                  message?.sender?.firstName + " " + message?.sender?.lastName,
                avatar: message?.sender?.profilePic,
              },
              createdAt: new Date(message.createdAt),
              image: JSON.stringify(message?.files),
            };
            try {
              if (
                message?.sender?.user === userId ||
                message?.reciver?.user === userId
              ) {
                updateCachedData((draft) => {
                  draft?.chatList?.push(messageItem);
                });
              }
            } catch (error) {
              console.error(error);
            }
          });

          socket.on('deleteMessage', (message) => {
            try {
              if (
                message?.senderUID === userId ||
                message?.reciverUID === userId
              ) {
                updateCachedData((draft) => {
                  const newChatList = draft?.chatList?.map((item) => {
                    if(item?._id === message?.messageId){
                      return {
                        ...item,
                        text: message?.text,
                        image: JSON.stringify([]),
                      }
                    }
                    return item;
                  })
                  return {
                    ...draft,
                    chatList: newChatList
                  }
                });
              }
            } catch (error) {
              console.error(error);
            }
          })
          // });
          await cacheEntryRemoved;
          socket.close();
        } catch (error) {
          console.error(error);
          // if cacheEntryRemoved resolved before cacheDataLoaded,
          // cacheDataLoaded throws
        }
      },
      transformResponse: (response) => {
        const chatList: IMessage[] = response?.data?.messages?.map(
          (message) => ({
            _id: message._id,
            text: message.message,
            user: {
              _id: message?.sender?._id,
              name:
                message?.sender?.firstName + " " + message?.sender?.lastName,
              avatar: message?.sender?.profilePic,
            },
            createdAt: new Date(message.createdAt),
            image: JSON.stringify(message?.files),
          })
        );
        const messageList = {
          pageNumber: response?.data?.pageNumber,
          pageSize: response?.data?.pageSize,
          totalPages: response?.data?.totalPages,
          reciverDetails: response?.data?.reciverDetails,
          senderDetails: response?.data?.senderDetails,
          chatList,
          totalMessages: response?.data?.totalMessages,
        };

        return messageList;
      },
    }),
    getInfiniteMessage: builder.query({
      query: (data: IGetMessages) => {
        let queryParams =
          data?.pageNumber && data?.pageSize
            ? `?pageSize=${data?.pageSize}&pageNumber=${data?.pageNumber}`
            : "";
        return {
          url: `messages/getMessage/${data.id}${queryParams}`,
          method: "GET",
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          const chatList: IMessage[] = result?.data?.data?.messages?.map(
            (message) => ({
              _id: message._id,
              text: message.message,
              user: {
                _id: message?.sender?._id,
                name:
                  message?.sender?.firstName + " " + message?.sender?.lastName,
                avatar: message?.sender?.profilePic,
              },
              createdAt: new Date(message.createdAt),
              image: JSON.stringify(message?.files),
            })
          );
          const messageList = {
            pageNumber: result?.data?.data?.pageNumber,
            pageSize: result?.data?.data?.pageSize,
            totalPages: result?.data?.data?.totalPages,
            reciverDetails: result?.data?.data?.reciverDetails,
            senderDetails: result?.data?.data?.senderDetails,
            chatList,
            totalMessages: result?.data?.data?.totalMessages,
          };
          if (messageList?.chatList?.length > 0) {
            dispatch(
              messageApiSlice.util.updateQueryData(
                "getMessage",
                args.id.toString(),
                (draft) => {
                  const draftData = draft?.chatList?.map((d) => d);
                  const resultData = messageList?.chatList?.map((d) => d);
                  const newData = {
                    ...draft,
                    pageNumber: messageList?.pageNumber,
                    chatList: [...draftData, ...resultData],
                  };
                  return newData;
                }
              )
            );
          }
        } catch (e) {
          console.error(e);
        }
      },
    }),

    sendMessage: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/messages/sendMessage",
        body: data?.message,
      }),
      invalidatesTags: ['getSMSPackage'],
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const id = data?.messageData?._id;
        console.log(id);
        const patchResult = dispatch(
          messageApiSlice.util.updateQueryData("getMessage", id?.toString(), (draft) => {
            const newData = {
              ...draft,
              chatList: [...draft?.chatList, data?.messageData]
            }
            console.log({newData});
            console.log({draft})
            Object.assign(newData);
            // return newData;
          })
        );

        try {
          await queryFulfilled;
          console.log("received message")
        } catch {
          console.log("Received unexpected");
          patchResult.undo();

          /**
           * Alternatively, on failure you can invalidate the corresponding cache tags
           * to trigger a re-fetch:
           * dispatch(api.util.invalidateTags(['Post']))
           */
        }
      },
    }),

    callUser: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/messages/callUser",
        body: data,
      }),
    }),

    deleteConversation: builder.mutation({
      query: (reciverID) => ({
        method: "DELETE",
        url: `/messages/deleteConversation/${reciverID}`,
      }),
    }),

    deleteMessage: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/messages/deleteMessage/${id}`,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetConversationsQuery,
  useGetMessageQuery,
  useSendMessageMutation,
  useCallUserMutation,
  useGetInfiniteConversationsQuery,
  useGetInfiniteMessageQuery,
  useDeleteConversationMutation,
  useDeleteMessageMutation,
} = messageApiSlice;
