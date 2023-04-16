import { Text, VStack } from "native-base";
import React from "react";

export default function SafetyCard({
  serial,
  title,
  message,
}: {
  serial: number;
  title: string;
  message: string;
}) {
  return (
    <VStack space="2">
      <Text fontSize="lg" fontWeight={600}>
        {serial}. {title}
      </Text>
      <Text textAlign="justify">{message}</Text>
    </VStack>
  );
}
