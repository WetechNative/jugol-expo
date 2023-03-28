import { useNavigation, useRoute } from "@react-navigation/native";
import { dashBoardRoutes } from "@routes/index";
import requestCameraAndAudioPermission from "@screens/others/components/Permission";
import { selectUID } from "@store/features/auth/authSlice";
import getSocket from "@utils/socketClient";
import { Avatar, HStack, Pressable, Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Linking } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useSelector } from "react-redux";
import notifee, { AndroidImportance } from "@notifee/react-native";
import { callTimerNotification } from "@utils/callTimerNotification";

export default function RingingScrren() {
  const { saveCallInfo, callDetails } = useRoute().params;
  const navigation = useNavigation();
  const uid = useSelector(selectUID);
  const [callStatus, setCallStatus] = useState("Calling...");

  useEffect(() => {
    const socket = getSocket();
    socket.on("connect", () => {
      socket.on("callAnswerd", async (data) => {
        const senderFromParams = saveCallInfo?.sender?.user;
        const reciverFromParams = saveCallInfo?.reciver?.user;
        const reciverFromSocket = data.reciverFirebaseId;
        console.log({
          uid,
          senderFromParams,
          reciverFromParams,
          reciverFromSocket,
        });

        const isCurrentUserCall =
          uid === senderFromParams && reciverFromParams === reciverFromSocket;
        console.log({ isCurrentUserCall });

        if (isCurrentUserCall) {
          Linking.openURL(`jugol://call/${data?.callChannelId}`);
          callTimerNotification(data?.callChannelId);
        }
      });

      socket.on("rejectCall", (data) => {
        const senderFromParams = saveCallInfo?.sender?.user;
        const senderFromSocket = data.senderFirebaseId;

        const isCurrentUserCall = senderFromSocket === senderFromParams;
        if (isCurrentUserCall) {
          setCallStatus("The user is busy now!");
        }
      });
    });
  }, []);

  return (
    <VStack flex={1}>
      <VStack alignItems="center" justifyContent="center" space="6" flex={2}>
        <Avatar
          size="2xl"
          source={{ uri: saveCallInfo?.reciver?.profilePic }}
        />
        <Text fontSize="2xl" fontWeight={500}>
          {saveCallInfo?.reciver?.firstName} {saveCallInfo?.reciver?.lastName}
        </Text>
        <Text fontSize="lg">{callStatus}</Text>
      </VStack>
      <HStack justifyContent="center" alignItems="center" flex={1}>
        <Pressable
          onPress={() => navigation.goBack()}
          h="52px"
          w="52px"
          rounded={"full"}
          bg="red.500"
          alignItems="center"
          justifyContent="center"
        >
          <MaterialIcons name="call-end" size={24} color="white" />
        </Pressable>
      </HStack>
    </VStack>
  );
}
