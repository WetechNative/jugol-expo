import { BASE_URL } from "@config";
import { useNavigation } from "@react-navigation/native";
import { messageRoutes } from "@routes/index";
import {
  messageApiSlice,
  useGetConversationsQuery,
} from "@store/api/messageApi/messageApiSlice";
import { selectIdToken, selectUID } from "@store/features/auth/authSlice";
import { fontSizes } from "@typography";
import MessageRenderItem from "@ui/MessageRenderItem/MessageRenderItem";
import SearchInput from "@ui/SearchInput/SearchInput";
import StoryCardRounded from "@ui/StoryCardRounded/StoryCardRounded";
import getSocket from "@utils/socketClient";
import {
  Button,
  Center,
  FlatList,
  HStack,
  Skeleton,
  Text,
  VStack,
} from "native-base";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import SettingButtonWithIcon from "../../../components/SettingButtonWithIcon/SettingButtonWithIcon";
import { IConversationProps } from "./MessageScreen.types";
import { RefreshControl, useWindowDimensions } from "react-native";
import colors from "@colors";
import useIsPremium from "@hooks/useIsPremium";
import { Premium } from "@assets/svg/icons";

const EmptyConversation = () => {
  return (
    <VStack flex={1} bg="white" justifyContent="center" alignItems="center">
      <Text color="danger.600" fontSize="lg" textAlign="center">
        Conversation list is empty!
      </Text>
    </VStack>
  );
};

export default function MessagesScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [searchText, handleSearchText] = useState<string>("");
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  const { isPremium } = useIsPremium();
  const { height, width } = useWindowDimensions();

  const {
    data: conversations,
    error: conversationsError,
    isLoading: conversationsIsLoading,
    isError: conversationsIsError,
    refetch,
  } = useGetConversationsQuery(undefined);

  const uid = useSelector(selectUID);

  const loadMoreConverSations = () => {
    const pageNumber = conversations?.pageNumber;
    const pageSize = conversations?.pageSize;
    const totalPages = conversations?.totalPages;

    if (pageNumber < totalPages) {
      dispatch(
        messageApiSlice?.endpoints?.getInfiniteConversations?.initiate({
          pageSize,
          pageNumber: pageNumber + 1,
        })
      );
    }
  };

  const sortedConversationsData: IConversationProps[] = conversations?.data
    ?.slice()
    ?.sort((prev, next) => new Date(next.createdAt) - new Date(prev.createdAt));

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <SettingButtonWithIcon
          routeName={messageRoutes.messageSettingScreen.path}
        />
      ),
    });
  }, []);

  if (conversationsIsLoading) {
    return (
      <VStack>
        <Center w="100%" h="full">
          <VStack
            w="90%"
            maxW="400"
            space={6}
            rounded="md"
            alignItems="center"
            _dark={{
              borderColor: "coolGray.500",
            }}
            _light={{
              borderColor: "coolGray.200",
            }}
          >
            <HStack space="2" mb="10px">
              <Skeleton size="20" rounded="full" />
              <Skeleton size="20" rounded="full" />
              <Skeleton size="20" rounded="full" />
              <Skeleton size="20" rounded="full" />
            </HStack>
            <Skeleton h="20" />
            <Skeleton h="20" />
            <Skeleton h="20" />
            <Skeleton h="20" />
            <Skeleton h="20" />
          </VStack>
        </Center>
      </VStack>
    );
  }

  return (
    <>
      <VStack flex={1} bg={"white"} pt={"20px"}>
        {sortedConversationsData?.length > 0 ? (
          <VStack flex={1}>
            <FlatList
              refreshControl={
                <RefreshControl
                  colors={[colors.primary[100]]}
                  progressBackgroundColor="white"
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
              ListHeaderComponent={() => (
                <VStack space="4">
                  <SearchInput
                    searchText={searchText}
                    handleSearchText={handleSearchText}
                  />
                  <StoryCardRounded
                    conversationList={sortedConversationsData}
                  />
                  <Text fontWeight={700} fontSize={fontSizes.md}>
                    Messages
                  </Text>
                </VStack>
              )}
              contentContainerStyle={{ paddingHorizontal: 20 }}
              nestedScrollEnabled
              showsVerticalScrollIndicator={false}
              alwaysBounceVertical
              data={sortedConversationsData}
              renderItem={({ item }: any) => <MessageRenderItem {...item} />}
              keyExtractor={(item) => item?.userID}
              onEndReached={loadMoreConverSations}
              onEndReachedThreshold={0.3}
            />
          </VStack>
        ) : (
          <EmptyConversation />
        )}
        {!isPremium ? (
          <VStack
            backgroundColor={"rgba(250, 250, 250, 0.5)"}
            h={height}
            position="absolute"
            // opacity={0.2}
            w="full"
            // top="0px"
            bottom="0px"
            alignItems="center"
            justifyContent="center"
            p="20px"
          >
            <Premium style={{ height: 100, width: 100 }} />
            <Text fontSize="lg">Be premium,</Text>
            <Text fontSize="lg">To chat with others!</Text>
            <Button
              variant="primary"
              w="80"
              mt="50"
              onPress={() => navigation.navigate("BePremium" as never)}
            >
              Be Premium
            </Button>
          </VStack>
        ) : null}
      </VStack>
    </>
  );
}
