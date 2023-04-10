import { Box, HStack, Image } from "native-base";
import React from "react";
import { IMatchScreenComponents } from "./MatchScreenComponents.types";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function LeftImageComponent({
  picture,
}: IMatchScreenComponents) {
  return (
    <HStack
      position={"absolute"}
      right={"25px"}
      bg={"white"}
      shadow={9}
      style={{ transform: [{ rotate: "10deg" }] }}
      borderRadius={"15px"}
    >
      <Image
        source={{ uri: picture }}
        alt="match1"
        h={"240px"}
        w={"160px"}
        borderRadius={"15px"}
        resizeMode={"cover"}
      />
      <Box
        position={"absolute"}
        top={"-35px"}
        left={"-20pxpx"}
        h={"60px"}
        w={"60px"}
        rounded="full"
        bg="#ffffff"
        shadow={9}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <AntDesign
          name="heart"
          color="#AF0DBD"
          size={28}
          style={{ transform: [{ rotate: "5deg" }], elevation: 4 }}
        />
      </Box>
    </HStack>
  );
}
