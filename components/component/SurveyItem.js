import React, { createRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Badge, ThemeProvider } from "react-native-elements";

const theme = {
  colors: {
    primary: "#1aa81a", //ing
    success: "#48a0f3", //before
    warning: "#919191", //end
  },
};

class SurveyItem extends React.Component {
  /*
  TODO: 받아온 데이터의 요소들을 prop을 통해 사용할 것인지, state에 저장할 것인지 추후 결정 필요
  */

  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      start_date: props.start_date,
      end_date: props.end_date,
      survey_title: props.survey_title,
      period: props.period,
    };
  }

  _checkBadgeStatus() {
    if (this.state.period == "ING") {
      return "primary";
    } else if (this.state.period == "BEFORE") {
      return "success";
    } else {
      return "warning";
    }
  }
  // 해당 설문조사의 상태(진행중,준비중,완료)를 구분
  _checkSurveyPeriod() {
    if (this.state.period == "ING") {
      return <Text style={styles.survey_status_badge_ing}>진행중</Text>;
    } else if (this.state.period == "BEFORE") {
      return <Text style={styles.survey_status_badge_before}>준비중</Text>;
    } else {
      return <Text style={styles.survey_status_badge_end}>완료</Text>;
    }
  }

  render() {
    const start_date_split = this.state.end_date
      .substring(5, 16)
      .replace("-", "/");
    const end_date_split = this.state.end_date
      .substring(5, 16)
      .replace("-", "/");

    return (
      <View style={styles.container_area}>
        <View style={styles.survey_no_area}>
          <Text style={{ fontSize: 12 }}>{this.state.id || 0}</Text>
        </View>

        <View style={styles.survey_text_area}>
          <View style={styles.survey_text_title_area}>
            <Text style={styles.survey_text_title_text}>
              {this.state.survey_title || 0}
            </Text>
          </View>

          <View style={styles.survey_text_title_sub_area}>
            <Text style={styles.survey_text_title_sub_text}>
              ({start_date_split || 0} ~ {end_date_split || 0})
            </Text>
          </View>
        </View>

        <View style={styles.survey_status_area}>
          <ThemeProvider theme={theme}>
            <Badge
              // ref={this.bagdeRef}
              status={this._checkBadgeStatus()}
              badgeStyle={styles.survey_status_badge}
              // status="warning"
              value={this._checkSurveyPeriod()}
            />
          </ThemeProvider>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container_area: {
    flexDirection: "row", // row
    backgroundColor: "#fcfcfc",
    borderBottomColor: "#d3d3d3",
    borderBottomWidth: 1,
    padding: 5,
  },
  survey_no_area: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  survey_text_area: {
    flex: 0.7,
  },
  survey_text_title_area: {
    height: 40,
    justifyContent: "center",
  },
  survey_text_title_text: {
    fontSize: 15,
  },
  survey_text_title_sub_area: {},
  survey_text_title_sub_text: {
    fontSize: 10,
    color: "#686767",
  },
  survey_status_area: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  survey_status_badge: {
    marginLeft: 20,
    width: 48,
    height: 23,
  },
  survey_status_badge_ing: {
    fontSize: 13,
    fontWeight: "bold",
    // fontFamily: "korea-fonts",
    padding: 5,
    color: "white",
    borderRadius: 8,
  },
  survey_status_badge_before: {
    fontSize: 13,
    fontWeight: "bold",
    // fontFamily: "korea-fonts",
    padding: 5,
    color: "white",
    borderRadius: 8,
  },
  survey_status_badge_end: {
    fontSize: 13,
    fontWeight: "bold",
    // fontFamily: "korea-fonts",
    padding: 5,
    color: "white",
    borderRadius: 8,
  },
});

export default SurveyItem;
