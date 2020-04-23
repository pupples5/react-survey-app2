import React from "react";

import { View } from "react-native";
import MainStack from "./components/navigation/MainStack";
import LoadingScreen from "./components/screens/LoadingScreen";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
    //loading splash view
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 100);
  }
  render() {
    return <>{this.state.isLoading ? <LoadingScreen /> : <MainStack />}</>;
  }
}
