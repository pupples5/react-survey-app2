/*
##### React-native chart Example
link : https://www.npmjs.com/package/react-native-chart-kit

npm i react-native-chart-kit

yarn add react-native-chart-kit
yarn add react-native-svg

1. Line chart
2. Bezier Line chart
3. Pie chart
4. Bar chart
5. Progress
6. Contribution Graph


*/

import {
  Linechart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
  LineChart,
} from "react-native-chart-kit";
import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(screenWidth);
    return (
      <View>
        <LineChart
          data={data_line}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
        ></LineChart>

        <LineChart
          data={data_line}
          width={screenWidth}
          height={256}
          verticalLabelRotation={30}
          chartConfig={chartConfig}
          bezier
        />

        <ProgressChart
          data={data_progress}
          width={screenWidth}
          height={220}
          strokeWidth={16}
          radius={32}
          chartConfig={chartConfig}
          hideLegend={false}
        />

        <BarChart
          //style={graphStyle}
          data={data_bar}
          width={screenWidth}
          height={220}
          yAxisLabel="$"
          chartConfig={chartConfig}
          verticalLabelRotation={30}
        />

        <StackedBarChart
          //
          data={data_stackbar}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
        />
      </View>
    );
  }
}
const screenWidth = Dimensions.get("window").width;

const data_progress = {
  labels: ["Swim", "Bike", "Run"], // optional
  data: [0.4, 0.6, 0.8],
};

const data_bar = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
    },
  ],
};
const data_stackbar = {
  labels: ["Test1", "Test2"],
  legend: ["L1", "L2", "L3"],
  data: [
    [60, 60, 60],
    [30, 30, 60],
  ],
  barColors: ["#dfe4ea", "#ced6e0", "#a4b0be"],
};

const data_line = {
  labels: ["first", "second", "third", "fourth", "fifth"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(134,65,244, ${opacity})`,
      strokeWidth: 2,
    },
  ],
  //legend: ["Rainy", "Sunny", "Snowy"],
};
const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};
