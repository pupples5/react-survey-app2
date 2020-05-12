import React from "react";
import { View } from "react-native";
import MainStack from "./components/navigation/MainStack";
import LoadingScreen from "./components/screens/LoadingScreen";
import { useFonts } from "@use-expo/font";

// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isLoading: true,
//     };
//     //loading splash view
//     setTimeout(() => {
//       this.setState({ isLoading: false });
//     }, 2500);
//   }
//   render() {
//     const { isLoading } = this.state;
//     return isLoading ? <LoadingScreen /> : <MainStack />;
//   }
// }

export default (props) => {
  let [fontsLoaded] = useFonts({
    OpenSans: require("./assets/fonts/OpenSans-LightItalic.ttf"),
  });
  if (!fontsLoaded) {
    return <LoadingScreen />;
  } else {
    return <MainStack />;
  }
};
