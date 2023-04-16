import React from "react";
import { Container, VStack, HStack, Text } from "native-base";
import KeyboardAwareView from "@ui/KeyboardAwareView/KeyboardAwareView";
import AuthHeader from "@ui/AuthHeader/AuthHeader";
import InformationWeCollect from "./InformationWeCollect";
import UseOfInformation from "./UseOfInformation";

const PrivacyPolicy = () => {
  return (
    <KeyboardAwareView>
      <AuthHeader title="Privacy Policy" />
      <VStack p={2} space={2}>
        <VStack>
          <Text fontWeight="bold" fontSize="lg" mb="10px">
            Information We Collect
          </Text>
          <InformationWeCollect
            title="Personal Information: "
            description="We collect personal information that you voluntarily provide to us
            when you register for an account, update your profile, or use our
            services. This information may include your name, email address,
            phone number, date of birth, gender, occupation, income, and other
            information relevant to your use of our services."
          />
          <InformationWeCollect
            title="Location Information: "
            description="We may collect location information from users when they use our app to find potential partners in their area. This information is collected only with the user's consent."
          />
          <InformationWeCollect
            title="Usage Information: "
            description="We may collect information about how users use our app, including the features they use, the pages they visit, and the actions they take."
          />
          <InformationWeCollect
            title="Device Information: "
            description="We may collect information about the device used to access our app, including the device type, operating system, and browser type."
          />
        </VStack>
        <VStack>
          <Text fontWeight="bold" fontSize="lg" my="10px">
            Use of Information
          </Text>
          <Text>
            We use the information we collect from users for the following
            purposes:
          </Text>
          <UseOfInformation description="To create and manage user accounts." />
          <UseOfInformation description="To match users with potential partners based on their preferences." />
          <UseOfInformation description="To provide users with personalized recommendations and content." />
          <UseOfInformation description="To improve our app and develop new features." />
          <UseOfInformation description="To communicate with users about our app and any updates or changes." />
          <UseOfInformation description="To enforce our Terms of Service and other policies." />
        </VStack>
        <VStack>
          <Text fontWeight="bold" fontSize="lg" my="10px">
            Disclosure of Your Information
          </Text>
          <InformationWeCollect
            title="Service Providers: "
            description="We may share user information with third-party service providers who help us operate our app and provide services to our users."
          />
          <InformationWeCollect
            title="Partners: "
            description="We may share user information with partners who provide complementary services to our users."
          />
          <InformationWeCollect
            title="Legal Requirements: "
            description="We may disclose user information when required by law or in response to a subpoena or other legal process."
          />
        </VStack>
        <VStack>
          <Text fontWeight="bold" fontSize="lg" my="10px">
            Security of Information
          </Text>
          <Text textAlign="justify">
            We take reasonable measures to protect your personal information
            from unauthorized access, use, or disclosure. We use
            industry-standard security technologies and procedures to safeguard
            your information.
          </Text>
        </VStack>
        <VStack>
          <Text fontWeight="bold" fontSize="lg" my="10px">
            Changes to Privacy Policy
          </Text>
          <Text textAlign="justify">
            We may update this Privacy Policy from time to time. Users will be
            notified of any changes to this policy via the app or email.
          </Text>
        </VStack>
        <VStack>
          <Text fontWeight="bold" fontSize="lg" my="10px">
            Contact Us
          </Text>
          <Text textAlign="justify">
            If you have any questions or concerns about this Privacy Policy,
            please contact us at -
          </Text>
          <Text fontWeight="500" fontStyle="italic" selectable>
            jugol.app@gmail.com
          </Text>
        </VStack>
      </VStack>
    </KeyboardAwareView>
  );
};

export default PrivacyPolicy;
