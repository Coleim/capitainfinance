import { Dimensions, Text, View } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { styles } from '../../styles';
import { database } from "../services/DbServices";
import { useFocusEffect } from "@react-navigation/native";


import {
  LineChart,
} from "react-native-chart-kit";


export function BurndownChart(props) {

  const expectedRemainingAmountPerDay = props.expectedRemainingAmountPerDay;
  const realRemainingAmountPerDay = props.realRemainingAmountPerDay;


  const [days, setDays] = useState([] as string[]);
  const [hidePointsAt, setHidePointsAt] = useState([] as number[]);
  

  const getRemainingAmount = async () => {

    let today = new Date();
    let numberOfDays = new Date(today.getFullYear(), today.getMonth()+1, 0).getDate();

    let dayOfMonth = [];
    for(let i = 0 ; i < numberOfDays; ++i) {
      dayOfMonth.push((i+1).toString());
    }

    setDays(dayOfMonth);

    let hidePointsAt = [1,2,3,5,6,7,8,10,11,12,13,15,16,17,18,20,21,22,23,25,26,27];
    if(numberOfDays >= 30) {
      hidePointsAt.push(28);
    }
    if(numberOfDays >= 31) {
      hidePointsAt.push(29);
    }
    setHidePointsAt(hidePointsAt)
  }

  useFocusEffect(
    useCallback(() => {
      getRemainingAmount();
      return () => { };
    }, [])
  );

  return (
    <View style={ { alignSelf: "center"}}>
      <LineChart
        data={{
          labels: days,
          datasets: [
            {
              data: expectedRemainingAmountPerDay,
              color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`
            }, 
            { data: realRemainingAmountPerDay }
          ]
        }}
        width={Dimensions.get("window").width - 20} // from react-native
        height={220}
        yAxisSuffix="€"
        hidePointsAtIndex={ hidePointsAt }
        yAxisInterval={5}
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 2,
          fillShadowGradientFrom: "#fff",
          fillShadowGradientTo: "#fff",
          color: (opacity = 1) => `rgba(100, 100, 255, 1)`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, 1)`,
          propsForBackgroundLines: {
            strokeOpacity: 0.3
          },
          useShadowColorFromDataset: true,
          propsForDots: {
            r: "0",
            strokeWidth: "0",
          }
        }}
        style={{
          marginVertical: 8,
          borderRadius: 8
        }}
      />
    </View>
  );
}

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};