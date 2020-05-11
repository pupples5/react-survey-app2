import React, { Component } from "react";
import { RadioGroup, RadioButton } from "react-native-flexi-radio-button";
import { StyleSheet, Text, View, TextInput } from "react-native";

export default class QuestionSubjective extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      type: props.type,
      question: props.question,
      text: "",
      required: props.required,
      _setAnswerDatas: props._setAnswerDatas,
      reqCheck: props.reqCheck,
    };
  }

  render() {
    const radioButtons = [];

    // console.log(radioButtons);
    // this.state.onSelect(this.state.id, radioButtons[0].props.value);
    return (
      <View
        onLayout={(event) => {
          const layout = event.nativeEvent.layout;
          if (this.state.required === 1) {
            //false넣기 + layout 오브젝트 넣기?
            this.state.reqCheck(false, this.state.id, this.state.question);
          } else {
            //true넣기 + layout 오브젝트 넣기?
            this.state.reqCheck(true, this.state.id, this.state.question);
          }
        }}
        style={{
          paddingBottom: 20,
        }}
      >
        <View style={styles.title_container}>
          <Text style={styles.title_text}>{this.state.question}</Text>
          {this.state.required === 1 ? (
            <Text style={styles.title_required}>*</Text>
          ) : (
            <></>
          )}
        </View>
        <TextInput
          style={styles.inputArea}
          placeholder="의견을 작성해주세요."
          keyboardType="default"
          multiline
          onBlur={() => {
            if (this.state.text !== "") {
              this.state._setAnswerDatas(this.state.id, this.state.text);
              this.state.reqCheck(true, this.state.id, this.state.question);
            }
          }}
          blurOnSubmit={false}
          returnKeyType="next"
          onChangeText={(text) => {
            this.state.text = text;
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title_container: {
    marginTop: 10,
    borderBottomWidth: 1.5,
    borderTopWidth: 1.5,
    borderBottomColor: "gray",
    borderTopColor: "gray",
    flexDirection: "row",
  },
  title_text: {
    margin: 5,
    fontWeight: "bold",
    fontSize: 15,
  },
  title_required: {
    margin: 5,
    fontWeight: "bold",
    fontSize: 15,
    color: "red",
  },
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
