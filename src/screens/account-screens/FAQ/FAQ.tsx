import AuthHeader from "@ui/AuthHeader/AuthHeader";
import KeyboardAwareView from "@ui/KeyboardAwareView/KeyboardAwareView";
import React from "react";
import FAQCard from "./FAQCard";

export default function FAQ() {
  return (
    <KeyboardAwareView>
      <AuthHeader title="FAQ" />
      <FAQCard
        question="What is this app?"
        answer="This app is a mobile platform designed to help people find compatible partners for marriage. Our app allows you to create a profile, search for potential matches based on your preferences, and communicate with them to get to know them better."
      />
      <FAQCard
        question="Is the app free to use?"
        answer="We offer both free and paid options on our app. The free version allows you to create a profile, browse through other profiles, and send interest to potential matches. The paid version offers additional features such as sending personalized messages, viewing contact details, and more."
      />
      <FAQCard
        question="How do I create a profile?"
        answer="To create a profile, simply download the app and sign up using your email or social media account. You can then fill out your profile details including your basic information, preferences, and interests. You can also upload photos and videos to showcase your personality."
      />
      <FAQCard
        question="How does the app match me with potential partners?"
        answer="Our app uses advanced algorithms to match you with potential partners based on your preferences and interests. We take into account factors such as location, age, education, religion, and more to ensure that you are matched with someone who is compatible with you."
      />
      <FAQCard
        question="How can I contact a potential match?"
        answer="Once you have found a potential match, you can send them an interest or a personalized message. If they respond positively, you can then communicate with them using our in-app messaging system."
      />
      <FAQCard
        question="Is my information safe on this app?"
        answer="Yes, we take the privacy and security of our users very seriously. We use encryption and other security measures to protect your information from unauthorized access. We also have strict guidelines in place to prevent any misuse of user data."
      />
      <FAQCard
        question="What if I have more questions or need help using the app?"
        answer="If you have any questions or need help using the app, you can contact our customer support team through the app or our website. We are available 24/7 to assist you with any issues you may have."
      />
    </KeyboardAwareView>
  );
}
