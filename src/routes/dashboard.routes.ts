import { IReactNavigationRoutes } from "../types/route.types";
import BottomTabNavigator from "./BottomTabNavigator";
import CallingScreen from "../screens/message-screens/CallingScreen/CallingScreen";
import NotificationPermissionScreen from "@screens/home-screens/NotificationPermissionScreen/NotificationPermissionScreen";
import LikePhotoScreen from "@screens/like-screens/LikePhotoScreen/LikePhotoScreen";
import RingingScrren from "@screens/message-screens/RingingScreen/RingingScreen";
import ViewProfileScreen from "@screens/account-screens/ViewProfileScreen/ViewProfileScreen";
import ProfilePAddressDetailsScreen from "@screens/auth-screens/ProfilePAddressDetailsScreen/ProfilePAddressDetailsScreen";
import ProfilePersonalDetailsScreen from "@screens/auth-screens/ProfilePersonalDetailsScreen/ProfilePersonalDetailsScreen";
import SelectGenderScreen from "@screens/auth-screens/SelectGenderScreen/SelectGenderScreen";
import SelectUserInterestScreen from "@screens/auth-screens/UserInterestScreen/SelectUserInterestScreen";

const dashBoardScreens: IReactNavigationRoutes = {
  bottomTab: {
    path: "bottomTab",
    component: BottomTabNavigator,
  },
  notificationPermission: {
    path: "notificationPermission",
    component: NotificationPermissionScreen,
  },
  ringingScreen: {
    path: "ringingScreen",
    component: RingingScrren,
  },
  galleryScreen: {
    path: "galleryScreen",
    component: LikePhotoScreen,
    options: {
      headerShown: true,
    },
  },
  viewProfile: {
    path: "viewProfile",
    component: ViewProfileScreen,
    options: {
      headerShown: true,
    },
  },
  profileAddressDetails: {
    path: "profileAddressDetails",
    component: ProfilePAddressDetailsScreen,
  },
  profilePerSonalDetails: {
    path: "profilePersonalDetails",
    component: ProfilePersonalDetailsScreen,
  },
  selectGenderScreen: {
    path: "selectGender",
    component: SelectGenderScreen,
  },
  selectUserInterestScreen: {
    path: "userInterest",
    component: SelectUserInterestScreen,
  },
};

export default dashBoardScreens;
