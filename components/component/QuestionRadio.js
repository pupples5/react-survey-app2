import React, { Component } from "react";
import { RadioGroup, RadioButton } from "react-native-flexi-radio-button";
import { StyleSheet, Text, View } from "react-native";
import OtherComment from "./OtherComment";

export default class QuestionRadio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      type: props.type,
      question: props.question,
      required: props.required,
      children: props.children,
      onSelect: props.onSelect,
      endNumber: props.endNumber,
      _ChangeOtherComment: props._ChangeOtherComment,
      _submitAction: props._submitAction,
    };
  }

  render() {
    const radioButtons = [];
    this.state.children.map((item, key) => {
      radioButtons.push(
        <RadioButton style={styles.radio_button} value={item.id} key={item.id}>
          <View style={styles.radio_button_text_container}>
            <Text style={styles.radio_button_text}>{item.description}</Text>
          </View>
        </RadioButton>
      );
    });

    if (this.state.endNumber === this.state.id) {
      return (
        <View>
          <View style={styles.title_container}>
            <Text style={styles.title_text}>{this.state.question}</Text>
            {this.state.required === 1 ? (
              <Text style={styles.title_required}>*</Text>
            ) : (
              <Text style={styles.title_text}>*</Text>
            )}
          </View>
          <RadioGroup
            color="#9575b2"
            highlightColor="#ccc8b9"
            onSelect={(value) => {
              //console.log(radioButtons[value].props.value);
              this.state.onSelect(
                this.state.id,
                radioButtons[value].props.value
              );
            }}
            style={styles.radio_group}
          >
            {radioButtons}
          </RadioGroup>
          <OtherComment
            _ChangeOtherComment={this.state._ChangeOtherComment}
            _submitAction={this.state._submitAction}
          />
        </View>
      );
    } else {
      return (
        <View>
          <View style={styles.title_container}>
            <Text style={styles.title_text}>{this.state.question}</Text>
            <Text style={styles.title_required}>*</Text>
          </View>
          <RadioGroup
            color="#9575b2"
            highlightColor="#ccc8b9"
            onSelect={(value) => {
              //console.log(radioButtons[value].props.value);
              this.state.onSelect(
                this.state.id,
                radioButtons[value].props.value
              );
            }}
            style={styles.radio_group}
          >
            {radioButtons}
          </RadioGroup>
        </View>
      );
    }
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
  radio_group: {
    marginTop: 5,
    marginBottom: 5,
  },
  radio_button: {
    height: 50,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  radio_button_text: {
    fontSize: 13.5,
    width: "95%",
  },
  radio_button_text_container: {
    // flex: 1,
    // // width: "100%",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
  },
});