import AuthHeader from "@ui/AuthHeader/AuthHeader";
import KeyboardAwareView from "@ui/KeyboardAwareView/KeyboardAwareView";
import React from "react";
import SafetyCard from "./SafetyCard";

const safetyData = [
  {
    title: "Protect Your Personal Information: ",
    description:
      "Be careful not to reveal too much personal information on your profile or to someone you have just started communicating with. This includes your full name, phone number, home address, and other sensitive details. Use our in-app messaging system to communicate and get to know your potential partner before sharing any personal information.",
  },
  {
    title: "Stay Alert for Scams: ",
    description:
      "Unfortunately, scammers may try to use matrimony apps to trick users into giving them money or personal information. Be wary of anyone who asks for money, asks you to click on links, or tries to take the conversation off the app. If something seems suspicious, report it to our customer support team immediately.",
  },
  {
    title: "Meet in a Public Place: ",
    description:
      "If you decide to meet up with someone you have been communicating with on the app, always meet in a public place and let a friend or family member know where you are going. Avoid meeting at your home or their home until you have built a strong level of trust.",
  },
  {
    title: "Trust Your Instincts: ",
    description:
      "4.If something doesn't feel right, trust your instincts and don't ignore red flags. If a potential partner makes you uncomfortable or is pressuring you to do something you are not comfortable with, end the conversation and report them to our customer support team.",
  },
  {
    title: "Use Our Safety Features: ",
    description:
      "5.We offer a variety of safety features such as blocking, reporting, and photo verification to help ensure that you have a safe and enjoyable experience on our app. Familiarize yourself with these features and use them if you ever feel unsafe or uncomfortable.",
  },
  {
    title: "Do Your Own Research",
    description:
      "Before meeting up with someone you met on the app, do your own research by checking their social media profiles or doing a quick online search. This can give you a better sense of their background and help you feel more comfortable about meeting up.",
  },
];

export default function SafetyTips() {
  return (
    <KeyboardAwareView>
      <AuthHeader title="Safety & Tips" />
      {safetyData?.map((item, index) => (
        <SafetyCard
          key={index}
          serial={index + 1}
          title={item.title}
          message={item.description}
        />
      ))}
    </KeyboardAwareView>
  );
}
