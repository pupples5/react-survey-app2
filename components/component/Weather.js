import React, { Component } from "react";
import { View, Text } from "react-native";
import { AppLoading } from "expo";
import * as Location from "expo-location";
const API_KEY_DUST =
  "B0vbIBkSPkpTw3LPW5N04WumIkhmqwUEAHrl04sVHPbKEbtHh7xAaA%2BpuOgdnnQELW1p5f33f%2F9OLTfFmwYasw%3D%3D";

const API_KEY_WEATHER = "56d46ed5370593a0133551e8f0ee8900";
//openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=%EC%A2%85%EB%A1%9C%EA%B5%AC&dataTerm=month&pageNo=1&numOfRows=10&ServiceKey=Q7i8kskl65jQJuAAJfc3OZ5T5vDFgfQf8YYuQfp50spzizAQZGgVTZmnMMnvIP4W8vp81SgBQJaxo2YzvyIbHA%3D%3D&ver=1.3&_returnType=json
// https://2step-hyun.tistory.com/49 json 한글깨짐처리

//#통계청API활용을 위한 API KEY

const API_KEY_STATISTIC = "01dce5b1e38d4d5799aa";
const API_ID_STATISTIC = "71e702f5a8b141efb64e";
const API_AUTH_STATISTIC =
  "https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json";
const WGS84 = "4326";
const GRS80 = "5181";
const API_TRAD =
  "https://sgisapi.kostat.go.kr/OpenAPI3/transformation/transcoord.json";

export default class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      datas_dust: "",
      datas_weather: "",
      latitude: "",
      longitude: "",
    };
  }

  _getLocation = async () => {
    try {
      const permit = await Location.requestPermissionsAsync();

      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      this.state.longitude = longitude;
      this.state.latitude = latitude;
      this._getAuthStatistic();
    } catch (error) {
      console.log(error);
    }
  };

  _getTMPosition = (accessToken) => {
    console.log(accessToken);
    console.log(this.state.longitude + " " + this.state.latitude);
    let url = `${API_TRAD}?accessToken=${accessToken}&src=${WGS84}&dst=${GRS80}&posX=${this.state.longitude}&posY=${this.state.latitude}`;
    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.result.posX + " " + data.result.posY);
        this._getClosePosition(data.result.posX, data.result.posY);
      });
  };
  _getClosePosition = (posX, posY) => {
    console.log(posX, posY);
    let url = `http://openapi.airkorea.or.kr/openapi/services/rest/MsrstnInfoInqireSvc/getNearbyMsrstnList?tmX=${posX}&tmY=${posY}&ServiceKey=${API_KEY_DUST}`;
    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  //TM좌표 변환을 위한 통계청 데이터 수신 부분
  _getAuthStatistic = () => {
    let url = `${API_AUTH_STATISTIC}?consumer_key=${API_ID_STATISTIC}&consumer_secret=${API_KEY_STATISTIC}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.result.accessToken);
        this._getTMPosition(data.result.accessToken);
      });
  };

  _getWeatherData = async () => {
    this._getLocation();
    const url = new URL(
      "http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=%EC%A2%85%EB%A1%9C%EA%B5%AC&dataTerm=month&pageNo=1&numOfRows=10&ServiceKey=B0vbIBkSPkpTw3LPW5N04WumIkhmqwUEAHrl04sVHPbKEbtHh7xAaA+puOgdnnQELW1p5f33f/9OLTfFmwYasw==&ver=1.3&_returnType=json"
    );
    console.log("start");
    try {
      await fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          this.state.datas = responseJson;
        });
    } catch (error) {
      console.log(error);
    }
  };
  onFinish = () => {
    this.state.isLoading = true;
  };

  render() {
    //this._getWeatherData;

    return this.state.isLoading ? (
      <View>
        <Text>123</Text>
      </View>
    ) : (
      <AppLoading
        startAsync={this._getWeatherData}
        onFinish={this.onFinish}
        onError={console.error}
      />
    );
  }
}
