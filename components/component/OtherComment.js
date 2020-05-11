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
      isEndElement: true,
    };
  }

  render() {
    console.log("othercomment-render");
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
            returnKeyType="next"
            onChangeText={(text) => {
              this.state._ChangeOtherComment(text);
            }}
            onFocus={(event) => {
              this.props._scrollToInput(findNodeHandle(event.target));
            }}
            onBlur={() => {
              this.setState({ isEndElement: true });
              Keyboard.dismiss;
            }}
          />
          {/* {this.state.isEndElement ? (
            <View style={{ backgroundColor: "red", height: 400 }} />
          ) : null} */}
          {/* <View style={{ backgroundColor: "blue", height: 200 }} /> */}
        </View>
        <Button onPress={this.state._submitAction} title="제출하기" />
      </View>
    );
  }
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
