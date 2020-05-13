import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  findNodeHandle,
  Keyboard,
} from "react-native";

export default class OtherComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _submitAction: props._submitAction,
      _ChangeOtherComment: props._ChangeOtherComment,
      empty: [],
      isfocused: false,
    };
  }

  render() {
    //console.log("othercomment-render");
    return (
      <View>
        <View
          style={{
            paddingBottom: 20,
          }}
          ref={(ref) => {
            this.view = ref;
          }}
        >
          <Text style={styles.opinion}>기타의견</Text>
          <TextInput
            ref={(ref) => {
              this.text = ref;
            }}
            style={styles.inputArea}
            placeholder="기타의견을 작성해주세요."
            keyboardType="default"
            multiline
            blurOnSubmit={false}
            returnKeyType="none"
            onChangeText={(text) => {
              this.state._ChangeOtherComment(text);
            }}
            onBlur={Keyboard.dismiss}
            // onFocus={this._setExtraHeight}
            // onBlur={this._setExtraHeight}
          />
          {/* {this.state.isEndElement ? (
            <View style={{ backgroundColor: "red", height: 400 }} />
          ) : null} */}
          {/* <View style={{ backgroundColor: "blue", height: 200 }} /> */}
        </View>

        <Button onPress={this.state._submitAction} title="제출하기" />
        <View style={{ height: 300 }}></View>
        {/* {this.state.isfocused ? <View style={{ height: 300 }}></View> : <></>} */}
      </View>
    );
  }

  _setExtraHeight = () => {
    if (!this.state.isfocused) {
      console.log("gg");
      this.setState({ isfocused: true });
    } else {
      console.log("ll");
      this.setState({ isfocused: false });
    }
  };
}

const styles = StyleSheet.create({
  opinion: {
    fontWeight: "bold",
    marginTop: 10,
  },
  inputArea: {
    marginTop: 10,
    height: 100,
    borderColor: "gray",
    borderWidth: 1,
    textAlignVertical: "top",
  },
});
