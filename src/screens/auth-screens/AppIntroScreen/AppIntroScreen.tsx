import LOGO from '@images/logo.png';
import {useNavigation} from '@react-navigation/native';
import {authRoutes} from '@routes/index';
import CustomImageCarousal from '@ui/CustomImageCarousal/CustomImageCarousal';
import {MotiView} from 'moti';
import {Image, ScrollView, VStack} from 'native-base';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useCheckUserMutation} from '@store/api/authApi/authApiSlice';
import {
  selectCheckUserInformation,
  selectIdToken,
} from '@store/features/auth/authSlice';
import {userAuthMethodType} from '@store/features/user/userSlice';
import AppLoading from '../../others/AppLoading';
import auth from '@react-native-firebase/auth';

const sliderData = [
  {
    heading: 'Algorithm',
    body: 'Users going through a vetting process to ensure you never match with bots.',
    picture: 'https://wallpaperaccess.com/full/1893536.jpg',
  },
  {
    heading: 'Matches',
    body: 'We match you with people that have a large array of similar interests.',
    picture:
      'https://simg.nicepng.com/png/small/290-2906871_alive-story-girl-pretty-cartoon-girl.png',
  },
  {
    heading: 'Premium',
    body: 'Sign up today and enjoy the first month of premium benefits on us.',
    picture:
      'https://e0.pxfuel.com/wallpapers/152/444/desktop-wallpaper-pretty-girl-cartoon-beautiful-girl-cartoon-thumbnail.jpg',
  },
];

export default function AppIntroScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const idToken = useSelector(selectIdToken);
  const checkUserInformation = useSelector(selectCheckUserInformation);
  const [checkUser, results] = useCheckUserMutation();

  const handleSignInClick = () => {
    dispatch(userAuthMethodType({authMethodType: 'signin'}));
    navigation.navigate(authRoutes.selectAuthMethod.path as never);
  };

  const handleSignupClick = () => {
    dispatch(userAuthMethodType({authMethodType: 'signup'}));
    navigation.navigate(authRoutes.selectAuthMethod.path as never);
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
    });
  }, []);

  const handleNavigation = async () => {
    if (idToken && checkUserInformation) {
      try {
        const user = auth().currentUser;
        const results = await checkUser(user?.uid).unwrap();
        const {
          hasUpdatedGender,
          hasUpdatedAddress,
          hasUpdatedProfile,
          hasUpdatedInterest,
          isNewUser,
        } = results.data;
        if (!hasUpdatedGender) {
          navigation.navigate(authRoutes.selectGenderScreen.path as never);
        } else if (!hasUpdatedProfile) {
          navigation.navigate(authRoutes.profilePerSonalDetails.path as never);
        } else if (!hasUpdatedAddress) {
          navigation.navigate(authRoutes.profileAddressDetails.path as never);
        } else if (!hasUpdatedInterest) {
          navigation.navigate(
            authRoutes.selectUserInterestScreen.path as never,
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    handleNavigation();
  }, [idToken, checkUserInformation]);

  if (results.isLoading) {
    return <AppLoading />;
  }

  return (
    <ScrollView flex={1} bg="white">
      <CustomImageCarousal
        handleSignInClick={handleSignInClick}
        handleSignupClick={handleSignupClick}
        data={sliderData}
        autoPlay={true}
        pagination={true}
      />
    </ScrollView>
  );
}
