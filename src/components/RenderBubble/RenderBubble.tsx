import { selectUID } from "@store/features/auth/authSlice";
import { fontSizes } from "@typography";
import moment from "moment";
import { Box, HStack, Pressable, Text, VStack, useToast } from "native-base";
import React, { useState } from "react";
import { Bubble, TMessage } from "react-native-gifted-chat";
import GridImageViewer from "@ui/GridImageViewer/GridImageViewer";
import { Alert, TouchableOpacity } from "react-native";
import { useDeleteMessageMutation } from "@store/api/messageApi/messageApiSlice";
import CustomLoadingModal from "@ui/CustomLoadingModal/CustomLoadingModal";
import colors from "@colors";
import { Foundation } from "@expo/vector-icons";

export default function RenderBubble(props: Bubble<TMessage>["props"]) {
  const files = JSON.parse(props?.currentMessage?.image);
  const filteredImages = files.filter((file) => file?.resourceType === "image");
  const imagesURI = filteredImages?.map((image) => image?.fileUrl);
  const [loading, setLoading] = useState(false);
  const [deleteMessage, result] = useDeleteMessageMutation();
  const toast = useToast();
  const messageDeleted =
    props.currentMessage?.text === "This message was deleted";

  return (
    <Pressable
      _pressed={{
        opacity: 0.7,
      }}
      disabled={messageDeleted}
      onLongPress={() => {
        Alert.alert(
          "Delete",
          "Are you sure you want to delete this message ?",
          [
            {
              text: "no",
            },
            {
              text: "yes",
              onPress: async () => {
                try {
                  setLoading(true);
                  await deleteMessage(props.currentMessage?._id);
                  setLoading(false);
                  toast.show({
                    placement: "top",
                    duration: 1000,
                    render: () => {
                      return (
                        <Box
                          bg="danger.200"
                          px="2"
                          py="2"
                          rounded="sm"
                          w="full"
                        >
                          <Text>Message deleted successfully!</Text>
                        </Box>
                      );
                    },
                  });
                } catch (error) {
                  setLoading(false);
                  toast.show({
                    placement: "top",
                    duration: 1000,
                    render: () => {
                      return (
                        <Box bg="danger.200" px="2" py="2" rounded="sm">
                          {error?.message || "Something went wrong"}
                        </Box>
                      );
                    },
                  });
                }
              },
            },
          ]
        );
      }}
      paddingRight={"40px"}
      mb={"12px"}
    >
      <VStack
        p={props.currentMessage?.text && imagesURI?.length <= 0 ? 2 : 0}
        borderBottomLeftRadius={
          props.currentMessage?.text && props?.position === "left" ? 7 : 0
        }
        borderBottomRightRadius={
          props.currentMessage?.text && props?.position === "right" ? 7 : 0
        }
        backgroundColor={
          imagesURI?.length === 0
            ? props?.position === "right"
              ? "coolGray.200"
              : "indigo.100"
            : "white"
        }
        flexDirection={messageDeleted ? "row" : "column"}
      >
        {messageDeleted && (
          <Foundation
            name="prohibited"
            style={{ marginRight: 10 }}
            size={20}
            color={colors.gray[200]}
          />
        )}
        {props?.currentMessage?.text ? (
          <Text
            color={messageDeleted ? colors.gray[200] : "black"}
            fontStyle={messageDeleted ? "italic" : "normal"}
          >
            {props?.currentMessage?.text}
          </Text>
        ) : null}

        <VStack
          alignItems={props.position === "right" ? "flex-end" : "flex-start"}
        >
          {imagesURI?.length > 0 ? (
            <GridImageViewer images={imagesURI} />
          ) : null}
        </VStack>
      </VStack>
      <Text
        color={"gray.200"}
        alignSelf={props.position === "right" ? "flex-end" : "flex-start"}
        fontSize={fontSizes.xs}
        mt={"4px"}
      >
        {moment(props.currentMessage.createdAt).format("LT")}
      </Text>
      <CustomLoadingModal modalVisible={loading} />
    </Pressable>
  );
}
