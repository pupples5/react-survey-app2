import { Switch, StyleSheet, Text, View } from "react-native";
import React, { Component } from "react";

export default class PushAlarm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _checkSubscribe: this.props._checkSubscribe,
      isEnabled: false,
    };
  }

  _toggleChange = () => {
    if (this.state.isEnabled) {
      this.setState({ isEnabled: false });
      //수신 동의에 따른 처리 작성파트 FCM 사용시 사용자 토큰 정보 받아서 DB 저장을 위해 POST 필요
    } else {
      this.setState({ isEnabled: true });
      //수신 거부에 따른 처리 작성파트 토큰 삭제 DELETE 필요
    }
  };
  render() {
    return (
      <View>
        <Text>스위치 테스트</Text>
        <Switch
          onValueChange={this._toggleChange}
          trackColor={this.state.isEnabled ? "#767577" : "#81b0ff"}
          thumbColor={this.state.isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          value={this.state.isEnabled}
        ></Switch>
      </View>
    );
  }
}

/*

foreground background 개발을 위한 state 정리
import React, { useEffect, useState } from "react";
import { AppState, StyleSheet, Text, View } from "react-native";

const AppStateExample = () => {
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = nextAppState => {
    if (appState.match(/inactive|background/) && nextAppState === "active") {
      console.log("App has come to the foreground!");
    }
    setAppState(nextAppState);
  };

  return (
    <View style={styles.container}>
      <Text>Current state is: {appState}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default AppStateExample;


*/
