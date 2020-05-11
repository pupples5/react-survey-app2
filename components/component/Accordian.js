import React, { Component } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";

export default class Accordian extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      expanded: false,
    };
  }
  //부모인 SurveyScreen2에게 부서 id를 prop으로 넘겨줌
  _changeToParent(dept_id) {
    this.props.changeFromChild(dept_id);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.row}
          activeOpacity={0.8}
          onPress={() => this.toggleExpand()}
        >
          <Text style={styles.title}>{this.props.title}</Text>
          <Icon
            name={
              this.state.expanded ? "keyboard-arrow-up" : "keyboard-arrow-down"
            }
            size={30}
            style={styles.icon_style}
          />
        </TouchableOpacity>
        {this.props.data.children.map(
          (item, key) =>
            this.state.expanded && (
              <TouchableOpacity
                activeOpacity={0.8}
                key={key}
                onPress={this._changeToParent.bind(this, item.id)}
              >
                <View style={styles.child} key={key}>
                  <Text style={styles.child_name}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )
        )}
      </View>
    );
  }

  toggleExpand = () => {
    this.setState({ expanded: !this.state.expanded });
  };
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#5e5d5d",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 56,
    paddingLeft: 10,
    paddingRight: 18,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  child: {
    backgroundColor: "#e8e8e8",
    padding: 10,
    height: 40,
    borderBottomWidth: 0.3,
    borderBottomColor: "#fcfcfc",
  },
  icon_style: {
    color: "#5e5d5d",
  },
  child_name: {
    fontSize: 13,
    color: "#6d6b6b",
  },
});
