import React, { Component } from "react";
import { RadioGroup, RadioButton } from "react-native-flexi-radio-button";
import { StyleSheet, Text, View } from "react-native";

export default class QuestionRadio extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const radioButtons = [];

    // console.log(radioButtons);
    // this.state.onSelect(this.state.id, radioButtons[0].props.value);
    return (
      <View>
        <View style={styles.title_container}>
          <Text style={styles.title_text}>{this.state.question}</Text>
        </View>
        <RadioGroup
          color="#9575b2"
          highlightColor="#ccc8b9"
          onSelect={(value) => {
            //console.log(radioButtons[value].props.value);
            this.state.onSelect(this.state.id, radioButtons[value].props.value);
          }}
          style={styles.radio_group}
        >
          {radioButtons}
        </RadioGroup>
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
  },
  title_text: {
    margin: 5,
    fontWeight: "bold",
    fontSize: 15,
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