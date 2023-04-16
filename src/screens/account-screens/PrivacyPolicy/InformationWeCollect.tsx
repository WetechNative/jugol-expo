import { Text, VStack } from "native-base";
import React from "react";

export default function InformationWeCollect({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <VStack>
      <Text fontWeight={600} fontSize="md">
        {title}
      </Text>
      <Text fontWeight={400} textAlign="justify">
        {description}
      </Text>
    </VStack>
  );
}
