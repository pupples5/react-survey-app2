import React from "react";

import { View } from "react-native";
import MainStack from "./components/navigation/MainStack";
import LoadingScreen from "./components/screens/LoadingScreen";
import { useFonts } from "@use-expo/font";

export default (props) => {
  let [fontsLoaded] = useFonts({
    "korea-fonts": require("./assets/나눔명조EB.ttf"),
  });
  if (!fontsLoaded) {
    return <LoadingScreen />;
  } else {
    return <MainStack />;
  }
};
