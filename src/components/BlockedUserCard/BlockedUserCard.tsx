import { useNavigation } from "@react-navigation/native";
import { useDeleteBlockMutation } from "@store/api/blockApi/blockApiSlice";
import CustomLoadingModal from "@ui/CustomLoadingModal/CustomLoadingModal";
import { HStack, Image, Pressable, Text, VStack } from "native-base";
import React, { useState } from "react";

export default function BlockedUserCard(item) {
  const [loading, setLoading] = useState(false);
  const [deleteBlock, deleteResult] = useDeleteBlockMutation();
  const navigation = useNavigation();
  const user = item;

  return (
    <>
      <HStack
        justifyContent={"space-between"}
        alignItems={"center"}
        mt={"20px"}
      >
        <Pressable
          flexDirection="row"
          onPress={() => navigation.navigate("LikeProfileScreen", user)}
          alignItems={"center"}
        >
          <Image
            source={{ uri: item.profilePic }}
            alt={item.firstName}
            h={"48px"}
            w={"48px"}
            rounded={"full"}
            mr={"14px"}
          />
          <VStack>
            <Text fontWeight={700}>
              {item.firstName} {item.lastName}
            </Text>
            <Text>{item.countryName}</Text>
          </VStack>
        </Pressable>
        <Pressable
          onPress={async () => {
            setLoading(true);
            await deleteBlock({ user2: item._id });
            setLoading(false);
          }}
          h={"32px"}
          w={"82px"}
          borderWidth={"1px"}
          borderColor={"danger.600"}
          alignItems={"center"}
          justifyContent={"center"}
          borderRadius={"5px"}
        >
          <Text color="danger.600">Unblock</Text>
        </Pressable>
      </HStack>
      <CustomLoadingModal modalVisible={loading} />
    </>
  );
}
