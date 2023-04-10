/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Box, Button, HStack, Image, Text, VStack } from "native-base";
import MATCH_PICTUR1 from "@images/matchPicture1.png";
import PREMIUM_ICON from "@images/premium.png";
import KeyboardAwareView from "../../../components/KeyboardAwareView/KeyboardAwareView";
import { useNavigation } from "@react-navigation/native";
import { fontSizes } from "@typography";
import { useSelector } from "react-redux";
import { selectUserProfile } from "@store/features/user/userSlice";
import { Premium } from "@assets/svg/icons";
import { useGetUserDetailsQuery } from "@store/api/userApi/userApiSlice";

export default function BePremiumScreen() {
  const navigation = useNavigation();
  const {
    data: userDetails,
    isLoading: userDetailsLoading,
    error: userDetailsError,
    isError: userDetailsIsError,
    isSuccess: userDetailsIsSuccess,
  } = useGetUserDetailsQuery(undefined);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
    });
  }, []);
  return (
    <KeyboardAwareView>
      <VStack pt={"40px"} flex={1}>
        <VStack alignItems="center">
          <HStack
            bg={"white"}
            shadow={9}
            h={"240px"}
            w={"160px"}
            style={{ transform: [{ rotate: "10deg" }] }}
            borderRadius={"15px"}
          >
            <Image
              source={
                userDetails?.profilePic
                  ? { uri: userDetails?.profilePic }
                  : MATCH_PICTUR1
              }
              alt="match1"
              h={"240px"}
              w={"160px"}
              borderRadius={"15px"}
              resizeMode={"cover"}
            />
            <Box
              position={"absolute"}
              top={"-25px"}
              left={"-20pxpx"}
              h={"60px"}
              w={"60px"}
              borderRadius={"30px"}
              bg="white"
              shadow={9}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Premium style={{ height: 35, width: 35 }} />
            </Box>
          </HStack>
          <Text
            fontSize={fontSizes["2xl"]}
            fontWeight={600}
            py={"30px"}
            color="primary.100"
          >
            Be Premium User
          </Text>
        </VStack>
        <HStack alignItems={"center"} mb="2">
          <Premium style={{ height: 28, width: 28 }} />
          <Text fontSize={fontSizes.sm} ml="10px" color="dark.200">
            Send Message to anyone
          </Text>
        </HStack>
        <HStack alignItems={"center"} mb="2">
          <Premium style={{ height: 28, width: 28 }} />
          <Text fontSize={fontSizes.sm} ml="10px" color="dark.200">
            See Who Liked You
          </Text>
        </HStack>
        <HStack alignItems={"center"}>
          <Premium style={{ height: 28, width: 28 }} />
          <Text fontSize={fontSizes.sm} ml="10px" color="dark.200">
            Video Call
          </Text>
        </HStack>
        {/* <VStack w={'full'} my={'30px'}>
          <Button variant={'outline'}>Skip</Button>
        </VStack> */}
      </VStack>
      <Button
        variant={"primary"}
        my="20px"
        onPress={() => navigation.navigate("PremiumPackagesScreen" as never)}
      >
        Subscribe
      </Button>
    </KeyboardAwareView>
  );
}
