import AuthHeader from "@ui/AuthHeader/AuthHeader";
import KeyboardAwareView from "@ui/KeyboardAwareView/KeyboardAwareView";
import { Text, VStack } from "native-base";
import React from "react";

export default function AboutUs() {
  return (
    <KeyboardAwareView>
      <AuthHeader title="About Us" />
      <VStack space="3">
        <Text textAlign="justify">
          At Jugol, we are dedicated to helping you find your life partner
          through our easy-to-use mobile app. Our mission is to provide a safe
          and secure platform for individuals who are looking for a serious
          relationship.
        </Text>
        <Text textAlign="justify">
          Our app is designed to make the matrimony search process simple and
          hassle-free. You can easily create a profile, browse through other
          users' profiles, and communicate with potential partners right from
          your smartphone. Our advanced search and filtering options help you
          find the most compatible matches based on your preferences and
          interests.
        </Text>
        <Text textAlign="justify">
          We take the safety and privacy of our users seriously. Our app is
          built with the latest security features and protocols to ensure that
          your personal information is protected at all times. We also have a
          dedicated customer support team that is available 24/7 to help you
          with any questions or concerns you may have.
        </Text>
        <Text textAlign="justify">
          At Jugol, we believe that finding the right partner is one of the most
          important decisions you will make in your life. That's why we are
          committed to helping you find your perfect match in a safe and secure
          environment. Join our community today and start your matrimony journey
          with us.
        </Text>
      </VStack>
    </KeyboardAwareView>
  );
}
