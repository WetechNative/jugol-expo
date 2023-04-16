import { Text, VStack } from "native-base";
import React from "react";

export default function FAQCard({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <VStack space="2">
      <Text fontSize="md" fontWeight={600}>
        {question}
      </Text>
      <Text textAlign="justify">{answer}</Text>
    </VStack>
  );
}
