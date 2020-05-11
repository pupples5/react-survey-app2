import React, { Component, createRef } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  Button,
  View,
  Alert,
  ActivityIndicator,
  findNodeHandle,
  YellowBox,
  Keyboard,
  TextInput,
  Dimensions,
  Platform,
  UIManager,
  KeyboardAvoidingView,
  Platform,
  ToastAndroid,
} from "react-native";
import Get from "../module/Get";
import {
  KeyboardAwareScrollView,
  KeyboardAwareFlatList,
} from "react-native-keyboard-aware-scroll-view";
import QuestionRadio from "../component/QuestionRadio";
import OtherComment from "../component/OtherComment";
import QuestionSubjective from "../component/QuestionSubjective";
const QUESTION_LIST_URL = `${
  require("../../assets/setting/config.json").url
}survey/question/`;

export default class SurveyScreen4 extends Component {
  TESTURL = "";
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      refreshing: false,
      QuestionDatas: "",
      AnswerDatas: [],
      otherComment: "",
      degree_id: this.props.navigation.state.params.degree_id,
      department_id: this.props.navigation.state.params.dept_id,
      service_id: this.props.navigation.state.params.service_id,
      QuestionScrollRef: [],
      QuestionisAnswered: [],
      QuestionName: [],
    };
    this.flatListRef = "";
    this.TESTURL = QUESTION_LIST_URL + this.state.degree_id;
  }

  _setitemRef = (ref, questionId) => {
    var mergeJSON = require("merge-json");
    this.state.QuestionScrollRef = mergeJSON.merge(
      this.state.QuestionScrollRef,
      { [`${questionId}`]: ref }
    );

    // console.log("호출", this.state.QuestionScrollRef);
  };
  _setAnswerCheck = (isReq, questionId, questionName) => {
    var mergeJSON = require("merge-json");
    this.state.QuestionisAnswered = mergeJSON.merge(
      this.state.QuestionisAnswered,
      { [`${questionId}`]: isReq }
    );
    // console.log("8", questionName);
    this.state.QuestionName = mergeJSON.merge(this.state.QuestionName, {
      [`${questionId}`]: questionName,
    });
  };
  _setAnswerDatas = (questionId, text) => {
    var mergeJSON = require("merge-json");
    var ans = {
      [`ans-${questionId}`]: text,
    };
    this.state.AnswerDatas = mergeJSON.merge(this.state.AnswerDatas, ans);
  };
  _dataFromChild = (datas) => {
    //콜백메서드 등록
    this.setState({ QuestionDatas: datas, isLoading: false });
  };
  _ChangeOtherComment = (text) => {
    this.state.otherComment = text;
  };
  onRefresh = () => {
    this._getSurveyQuestionList();
    console.log("onRefresh2");
  };
  _setValue = (questionId, value) => {
    var mergeJSON = require("merge-json");
    var ans = {
      [`ans-${questionId}`]: value,
    };
    this.state.AnswerDatas = mergeJSON.merge(this.state.AnswerDatas, ans);
  };

  _findDimensions = (layout) => {
    const { x, y, width, height } = layout;
    console.log(x, y, width, height);
  };

  _renderQuestion = ({ item }) => {
    const { id, degree_id, type, required, question, children } = item;
    console.log("_renderQuestion,", this.state.sihoon);
    if (type === "radio") {
      return (
        <View
          ref="Marker"
          onLayout={(event) => {
            this._findDimensions(event.nativeEvent.layout);
          }}
        >
          <QuestionRadio
            ref={(ref) => (this.questionRadio = ref)}
            id={id}
            degree_id={degree_id}
            type={type}
            required={required}
            question={question}
            children={children}
            onSelect={this._setValue}
            reqCheck={this._setAnswerCheck}
            _setitemRef={this._setitemRef}
            sihoon={this.state.sihoon}
          ></QuestionRadio>
        </View>
      );
    } else if (type === "text") {
      return (
        <View>
          <QuestionSubjective
            id={id}
            degree_id={degree_id}
            type={type}
            required={required}
            question={question}
            _setAnswerDatas={this._setAnswerDatas}
            reqCheck={this._setAnswerCheck}
            _setitemRef={this._setitemRef}
          ></QuestionSubjective>
        </View>
      );
    } else {
    }
  };
  _submitAction = async () => {
    const firstkey = Object.keys(this.state.QuestionisAnswered)[0];
    for (let item in this.state.QuestionisAnswered) {
      const index = item - firstkey;
      if (this.state.QuestionisAnswered[item] === false) {
        Alert.alert(
          "필수 항목을 입력해주세요\n",
          "- " + this.state.QuestionName[item]
        ); //이유는 모르겠지만 alert 때문에 랜더링이 2번되서 호출 2번함;
        //alert("필수 항목을 입력해주세요"); //이유는 모르겠지만 alert 때문에 랜더링이 2번되서 호출 2번함;

        /*
        this.flatListRef.scrollToOffset({
          offset: 300,
          animated: true,
        });
        */
        //this.flatListRef.scrollTo(0, 0);
        // this.setState({ sihoon: true });
        this.flatListRef.scrollToIndex({
          animated: true,
          index: index,
        });
        return;
      }
    }
    const url = new URL("http://61.73.147.176/api/v1/survey");
    let headers = {
      "Content-Type": "application/json",
      // "Content-Type": "application/x-www-form-urlencoded",
    };
    var mergeJSON = require("merge-json");
    var ans = {
      [`memo`]: this.state.otherComment,
    };
    this.state.AnswerDatas = mergeJSON.merge(this.state.AnswerDatas, ans);
    let body = {
      degree_id: this.state.degree_id,
      department_id: this.state.department_id,
      service_id: this.state.service_id,
    };
    body = mergeJSON.merge(body, this.state.AnswerDatas);
    // console.log(body);
    fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    })
      .then(function (response) {
        if (!response.ok) {
          throw Error(response);
        }
        return response;
      })
      .then(function (response) {
        //
      })
      .catch(function (error) {
        console.log(error);
      });
    if (Platform.OS === "web") {
      alert("설문조사가 완료되었습니다.");
    } else {
      Alert.alert("설문조사가 완료되었습니다.");
    }
    this.props.navigation.navigate("Survey_step1");
  };

  _focusTextInput = () => {
    console.log("_focusTextInput");
  };

  _blurTextInput = () => {
    console.log("_blurTextInput");
    this.scrollRef.scrollToEnd();
  };

  _scrollToInput(reactNode) {
    // Add a 'scroll' ref to your ScrollView
    console.log(this.scroll.current);
    //this.scroll.current;
  }
  componentDidMount() {
    console.log(",,,,,,,,,,", this.state.QuestionScrollRef.length);
  }
  render() {
    return this.state.isLoading ? (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="small" color="gray" />
        <Get url={this.TESTURL} dataFromChild={this._dataFromChild} />
      </View>
    ) : (
      <View style={styles.container}>
        <Text style={styles.title}>설문조사</Text>
        <View style={styles.survey_container}>
          <Text style={styles.text}>Step4. 설문 답변을 입력해주세요.</Text>
          <KeyboardAvoidingView
            // behavior="height"
            // keyboardVerticalOffset={300}
            keyboardShouldPersistTaps={"always"}
            behavior={Platform.OS === "ios" ? "padding" : null}
            keyboardVerticalOffset={Platform.select({ ios: 120, android: 500 })}
            // keyboardShouldPersistTaps={"always"}
            // keyboardDismissMode={"none"}
            enableOnAndroid={true}
            // style={{
            //   flex: 1,
            //   flexDirection: "column",
            //   justifyContent: "center",
            // }}
            // behavior="padding"
            // enabled
            // keyboardVerticalOffset={100}

            // contentContainerStyle={{
            //   height: 150,
            //   // flex: 1,
            //   // justifyContent: "flex-end",
            // }}
          >
            <FlatList
              keyboardShouldPersistTaps={"always"}
              data={this.state.QuestionDatas}
              ref={(ref) => {
                this.flatListRef = ref;
              }}
              keyExtractor={(item, index) => index.toString()}
              initialNumToRender={20}
              onEndReachedThreshold={1}
              // refreshing={this.state.refreshing}
              // onRefresh={this.onRefresh}
              // style={{
              //   overflowX: "hidden",
              // }}
              renderItem={this._renderQuestion}
              ListFooterComponent={
                <OtherComment
                  _submitAction={this._submitAction}
                  _ChangeOtherComment={this._ChangeOtherComment}
                />
              }
            />
          </KeyboardAvoidingView>
        </View>
      </View>
    );
  }
  _scrollToInput = (reactNode) => {
    console.log("*", reactNode);
    this.scroll.props.scrollToFocusedInput(reactNode);
  };
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#FCFCFC",
  },
  survey_container: {
    flex: 1,
    height: 100,
    padding: "5%",
  },
  title: {
    fontSize: 20,
    paddingTop: "5%",
    paddingLeft: "5%",
    fontWeight: "bold",
  },
  text: {
    paddingBottom: 10,
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
