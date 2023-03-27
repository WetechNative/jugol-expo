import { Platform } from "react-native";

import {
  CameraOptions,
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from "react-native-image-picker";
import * as ImagePicker from "expo-image-picker";
import { IIMagePickerProps } from "./useImagePicker.types";

type TImagePicker = () => Promise<ImagePickerResponse>;

export default function useImagePicker({
  userLibraryOptions = {},
  userCameraOptions = {},
}: IIMagePickerProps) {
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  const selectImage: TImagePicker = async () => {
    let response: ImagePickerResponse = {
      didCancel: true,
      errorCode: "others",
      errorMessage: "Permission denied",
    };
    const options: ImageLibraryOptions = {
      mediaType: "photo",
      includeBase64: false,
      presentationStyle: "fullScreen",
      ...userLibraryOptions,
    };

    const callback = (res: ImagePickerResponse) => {
      response = res;
    };
    await launchImageLibrary(options, callback);
    console.log(response);
    return response;
  };

  const captureImage: TImagePicker = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const modifiedResult = {
        assets: [
          {
            type: result.assets[0].type,
            uri: result.assets[0].uri,
            fileName: result.assets[0].uri.split("/").pop(),
          },
        ],
      };
      console.log(result);
      console.log(modifiedResult);
      return modifiedResult;
    }
    // let isGranted = false;
    // let response: ImagePickerResponse = {
    //   didCancel: true,
    //   errorCode: 'others',
    //   errorMessage: 'Permission denied',
    // };

    // // if (isGranted) {
    // // }
    // const options: CameraOptions = {
    //   includeBase64: false,
    //   presentationStyle: 'fullScreen',
    //   ...userCameraOptions,
    //   mediaType: 'photo',
    // };

    // const callback = (res: ImagePickerResponse) => {
    //   response = res;
    // };
    // await launchCamera(options, callback);

    // return response;
  };

  return { selectImage, captureImage };
}
