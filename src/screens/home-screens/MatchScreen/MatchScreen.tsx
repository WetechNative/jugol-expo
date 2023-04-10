import React, { useEffect, useState } from "react";
import KeyboardAwareView from "@ui/KeyboardAwareView/KeyboardAwareView";
import { Button, HStack, Text, VStack } from "native-base";
import LeftImageComponent from "@ui/MatchScreenComponents/LeftImageComponent";
import RightImageComponent from "@ui/MatchScreenComponents/RightImageComponent";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useWindowDimensions } from "react-native";
import CustomLikedMessage from "@ui/CustomLikedMessage/CustomLikedMessage";
import { ILikedItem } from "@ui/LikedCardList/LikedCardList.types";
import { SheetManager } from "react-native-actions-sheet";

export default function MatchScreen() {
  const navigation = useNavigation();
  const { user1, user2 } = useRoute().params as any;
  const { height, width } = useWindowDimensions();
  const item: ILikedItem = {
    _id: user2?._id,
    birthDate: user2?.birthDate,
    firstName: user2?.firstName,
    lastName: user2?.lastName,
    profilePic: user2?.profilePic,
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
    });
  }, []);

  return (
    <KeyboardAwareView>
      <HStack h={height / 2} minH={"350px"} mt={"40px"}>
        <LeftImageComponent picture={user1?.profilePic} />
        <RightImageComponent picture={user2?.profilePic} />
      </HStack>
      <Text
        color="primary.100"
        fontSize="2xl"
        textAlign={"center"}
        mb={"-30px"}
      >
        It’s a match, {user1?.firstName}!
      </Text>
      <VStack>
        <Text color="dark.100" textAlign={"center"}>
          Start a conversation now with each other.
        </Text>
        <Button
          variant={"primary"}
          onPress={() => {
            SheetManager.show(item._id, {
              payload: item,
            });
          }}
          marginY={"20px"}
        >
          Start Chatting
        </Button>
        <Button variant={"outline"} onPress={() => navigation.goBack()}>
          Keep Swiping
        </Button>
      </VStack>
      <CustomLikedMessage sheetId={item._id} payload={item} />
    </KeyboardAwareView>
  );
}
