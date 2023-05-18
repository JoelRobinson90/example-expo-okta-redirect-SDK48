require('dotenv').config();

const projectId = process.env.PROJECT_ID;
const owner = process.env.OWNER;
const scheme = process.env.SCHEME;

const extra = {
  url: process.env.URL,
  clientId: process.env.CLIENT_ID,
  redirect: process.env.REDIRECT,
  pkfcSecureString: process.env.PKFC_SECURE_STRING,
  eas: {
    projectId,
  },
}

module.exports = () => ({
  name: "example-expo-okta-redirect-SDK48",
  slug: "example-expo-okta-redirect-sdk48",
  owner,
  scheme,
  version: "1.0.0",
  platforms: ["ios", "android"],
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
  },
  assetBundlePatterns: [
    "**/*"
  ],
  ios: {
    supportsTablet: true
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff"
    }
  },
  web: {
    "favicon": "./assets/favicon.png"
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: scheme,
    buildNumber: "6",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#FFFFFF",
    },
    package: scheme,
  },
  extra,
  updates: {
    url: `https://u.expo.dev/${projectId}`,
    fallbackToCacheTimeout: 0,
    enabled: true,
    checkAutomatically: "ON_LOAD",
  },
  runtimeVersion: {
    policy: "sdkVersion",
  },
});