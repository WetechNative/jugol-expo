import { Box, HStack, Image } from "native-base";
import React from "react";
import LOVE from "@images/love.png";
import { IMatchScreenComponents } from "./MatchScreenComponents.types";
import { RightLove } from "@assets/svg/icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import colors from "@colors";

export default function RightImageComponent({
  picture,
}: IMatchScreenComponents) {
  return (
    <HStack
      position={"absolute"}
      top={"100px"}
      left={"25px"}
      bg={"white"}
      shadow={9}
      style={{ transform: [{ rotate: "-10deg" }] }}
      borderRadius={"15px"}
    >
      <Image
        source={{ uri: picture }}
        alt="match2"
        h={"240px"}
        w={"160px"}
        borderRadius={"15px"}
        resizeMode={"cover"}
      />
      <Box
        position={"absolute"}
        bottom={"-30px"}
        left={"-25px"}
        h={"60px"}
        w={"60px"}
        borderRadius={"30px"}
        bg="white"
        shadow={9}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <AntDesign
          name="heart"
          color="#AF0DBD"
          size={28}
          style={{ transform: [{ rotate: "-5deg" }], elevation: 4 }}
        />
      </Box>
    </HStack>
  );
}
