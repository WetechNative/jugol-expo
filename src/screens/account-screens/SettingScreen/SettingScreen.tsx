import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { accountRoutes, homeRoutes } from "@routes/index";
import { useDeleteFCMTokenMutation } from "@store/api/authApi/authApiSlice";
import { logout } from "@store/features/auth/authSlice";
import CustomLoadingModal from "@ui/CustomLoadingModal/CustomLoadingModal";
import KeyboardAwareView from "@ui/KeyboardAwareView/KeyboardAwareView";
import SettingButton from "@ui/SettingButton/SettingButton";
import { Box, Button, useToast } from "native-base";
import React, { useState } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectFCMToken } from "../../../../redux/features/auth/authSlice";
import useIsPremium from "@hooks/useIsPremium";

const settings = [
  {
    title: "Edit Profile",
    subTitle: "Keep Your Profile Up-to-Date",
    type: "reset",
  },
  {
    title: "Become Premium",
    subTitle: "Upgrade Your Matrimony Experience",
    type: "premium",
  },
  {
    title: "Safety & Tips",
    subTitle: "Advice to Help You Stay Safe While Using Our App",
    type: "safety",
  },
  {
    title: "FAQ",
    subTitle: "Answers to Commonly Asked Questions About Our App and Services",
    type: "faq",
  },
  {
    title: "About Us",
    subTitle: "Discover Our Vision for Helping You Find Your Life Partner",
    type: "about",
  },
  {
    title: "Privacy Policy",
    subTitle: "Information on How We Collect, Use, and Secure Your Data",
    type: "policy",
  },
];

export default function SettingScreen() {
  const navigation = useNavigation();
  const toast = useToast();
  const dispatch = useDispatch();
  const [deleteFCMToken, results] = useDeleteFCMTokenMutation();
  const [loading, setLoading] = useState<boolean>(false);
  const fcmToken = useSelector(selectFCMToken);
  const removeData = async () => {
    try {
      await AsyncStorage.removeItem("login_token");
    } catch (e) {
      console.log(e);
    }
  };

  const { isPremium } = useIsPremium();
  console.log(isPremium);

  const handleSettings = (type: string) => {
    switch (type) {
      case "reset":
        navigation.navigate(accountRoutes.userEditableProfile.path as never);
        break;
      case "premium":
        if (isPremium) {
          Alert.alert("Premium", "You are already a premium user!");
        } else {
          navigation.navigate("BePremium" as never);
        }
        break;
      case "safety":
        navigation.navigate(accountRoutes.safetyTips.path as never);
        break;
      case "faq":
        navigation.navigate(accountRoutes.faq.path as never);
        break;
      case "about":
        navigation.navigate(accountRoutes.aboutUs.path as never);
        break;
      case "policy":
        navigation.navigate(accountRoutes.privacyPolicy.path as never);
        break;
    }
  };
  return (
    <KeyboardAwareView>
      {settings.map((setting) => {
        return (
          <SettingButton
            key={setting.title}
            title={setting.title}
            subTitle={setting.subTitle}
            onPress={() => handleSettings(setting.type)}
          />
        );
      })}
      <Button
        variant={"primary"}
        onPress={async () => {
          try {
            setLoading(true);
            if (fcmToken) {
              await deleteFCMToken(fcmToken);
            }
            await auth().signOut();
            dispatch(logout());
            removeData();
            setLoading(false);
          } catch (error: any) {
            setLoading(false);
            console.log(error);
            toast.show({
              placement: "top",
              duration: 1000,
              render: () => {
                return (
                  <Box bg="danger.200" px="2" py="2" rounded="sm">
                    {error?.message || "Something went wrong"}
                  </Box>
                );
              },
            });
          }
        }}
      >
        Log out
      </Button>
      <CustomLoadingModal modalVisible={loading} />
    </KeyboardAwareView>
  );
}
