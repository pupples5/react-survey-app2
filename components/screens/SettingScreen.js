import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import PushAlarm from "../component/PushAlarm";
import Chart from "../module/chart";
import Weather from "../component/Weather";
class SettingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubscribe: false,
      test: 1,
    };
  }

  _checkSubscribe = (ischeck) => {
    console.log(ischeck);
    console.log("1:", this.state.test);
    this.setState({
      isSubscribe: ischeck,
      test: this.state.test + 1,
    });
    console.log("2:", this.state.test);
    this.setState((pre) => ({
      isSubscribe: ischeck,
      test: pre.test + 1,
    }));

    console.log("3:", this.state.test);
  };
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <Text>Setting</Text>
          <PushAlarm _checkSubscribe={this._checkSubscribe}></PushAlarm>
          <Button onPress={this._checkSubscribe}></Button>
          {console.log("r:", this.state.test)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SettingScreen;

/*

  <Custom value={value}>{this.props.children}</Custom> 이런 문법들이 존재하는데 여기서 this.props.children은 태그에 담겨있는 값들을 Custom컴포넌트가 아니라 그 자식의 컴포넌트에게
  전달하도록 하는 지정위치임(저 위치로 값이 들어가도록 default 설정이 되어 있음)
  예를 들면
  <Custom>
    <Child/>
  </Custom>
  이런식으로 컴포넌트 구성이 되어 있다면 Child 컴포넌트에 Custom의 값들이 전달되도록 되어 있음.
  Context API 사용할때 Provider Consumer 얘들에 적용되는 값들을 전달하는 용도로 쓰이는거 봤음.
*/
