import { ConfigContext, ExpoConfig } from "@expo/config";

export default ({ config }: ConfigContext): ExpoConfig => {
    const appPlugins = config.plugins || [];

    return {
        ...config,
        name: "Jugol",
        slug: "Jugol",
        scheme: "jugol",
        androidStatusBar: {
            hidden: true,
        },

        android: {
            ...config.android,
            softwareKeyboardLayoutMode: "pan",
            package: "com.jugol.bd",
            googleServicesFile: "./google-services.json",
            permissions: [
                "ACCESS_BACKGROUND_LOCATION",
                "ACCESS_FINE_LOCATION",
                "ACCESS_COARSE_LOCATION",
                "CAMERA",
                "FOREGROUND_SERVICE",
                "READ_EXTERNAL_STORAGE",
                "WRITE_EXTERNAL_STORAGE",
                "READ_MEDIA_AUDIO",
                "READ_MEDIA_IMAGES",
                "READ_MEDIA_VIDEO",
            ],
            versionCode: 1,
            config: {},
        },

        ios: {
            ...config.ios,
            googleServicesFile: "./GoogleService-Info.plist",
            config: {},
            bundleIdentifier: "com.jugol.bd",
            buildNumber: "1.0.3",
            bitcode: false,
            infoPlist: {
                NSLocationAlwaysAndWhenInUseUsageDescription:
                    "This app requires location access to provide you with the best experience.",
                NSLocationWhenInUseUsageDescription:
                    "This app requires location access to provide you with the best experience.",
                NSCameraUsageDescription:
                    "This app requires camera access to provide you with the best experience.",
                NSPhotoLibraryUsageDescription:
                    "This app requires photo library access to provide you with the best experience.",
                NSLocationAlwaysUsageDescription:
                    "This app requires location access to provide you with the best experience.",
                NSLocationTemporaryUsageDescriptionDictionary: {
                    NSLocationTemporaryUsageDescriptionDictionaryKey:
                        "This app requires location access to provide you with the best experience.",
                },
                NSLocationTemporaryUsageDescriptionDictionaryKey: {
                    NSLocationTemporaryUsageDescriptionDictionaryKey:
                        "This app requires location access to provide you with the best experience.",
                },
                NSMotionUsageDescription:
                    "This app requires motion access to provide you with the best experience.",
                NSUserTrackingUsageDescription:
                    "This app requires location access to provide you with the best experience.",
                UIBackgroundModes: [
                    "location",
                    "fetch",
                    "remote-notification",
                    "processing",
                ],
                BGTaskSchedulerPermittedIdentifiers: [
                    "com.jugol.bd.background-fetch",
                    "com.jugol.bd.background-location",
                    "com.jugol.bd",
                ],
            },
        },
        plugins: [...appPlugins],
        extra: {
            eas: {
                projectId: "7bbbf83c-509b-4ba2-9f0e-9e7f8fa562b9",
            },
        },
    };
};
