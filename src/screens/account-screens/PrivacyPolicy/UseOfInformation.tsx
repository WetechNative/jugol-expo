import { HStack, Text, VStack } from "native-base";
import React from "react";

export default function UseOfInformation({
  description,
}: {
  description: string;
}) {
  return (
    <HStack alignItems="center" space={3} my="4px">
      <VStack bg="black" rounded="full" h="8px" w="8px" />
      <Text textAlign="justify">{description}</Text>
    </HStack>
  );
}
