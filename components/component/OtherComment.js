import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Keyboard,
} from "react-native";
import keyboardArea from "../component/keyboardArea";

export default class OtherComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _submitAction: props._submitAction,
      _ChangeOtherComment: props._ChangeOtherComment,
      empty: [],
      isfocused: "",
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
        >
          <Text style={styles.opinion}>기타의견</Text>
          <TextInput
            autoFocus={true}
            style={styles.inputArea}
            placeholder="기타의견을 작성해주세요."
            keyboardType="default"
            multiline
            blurOnSubmit={false}
            returnKeyType="none"
            onChangeText={(text) => {
              this.state._ChangeOtherComment(text);
            }}
            onFocus={() => {
              this.setState({
                isfocused: true,
              });

              console.log(this.state.isfocused);
            }}
            // onBlur={() => {
            //   this.setState({
            //     isfocused: false,
            //   });
            // }}
          />
        </View>

        <Button onPress={this.state._submitAction} title="제출하기" />
        {this.state.isfocused ? <View style={{ height: 300 }}></View> : <></>}
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
