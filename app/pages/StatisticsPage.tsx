import { View, Text, Dimensions } from "react-native";
import { styles } from '../../styles';
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { MenuBar } from "../components/MenuBar";
import { useNavigation } from "@react-navigation/native";
import { date } from "../services/DateAsString";
import { useEffect, useState } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';

import { VictoryAxis, VictoryBar, VictoryChart, VictoryGroup, VictoryLabel, VictoryStack, VictoryTheme } from "victory-native";

const NegativeAwareTickLabel = props => {
  const {
    datum, // Bar's specific data object
    y, // Calculated y data value IN SVG SPACE (from top-right corner)
    dy, // Distance from data's y value to label's y value
    scale, // Function that converts from data-space to svg-space
    ...rest // Other props passed to label from Bar
  } = props;

  return (
    <VictoryLabel
      datum={datum} // Shove `datum` back into label. We destructured it from `props` so we'd have it available for a future step
      y={scale.y(0)} // Set y to the svg-space location of the axis
      dy={20 * (datum.y === 0 ? 1 : Math.sign(datum.y))} // Change direction of offset based on the datum value
      {...rest} // Shove the rest of the props into the label
    />
  );
};


export const StatisticsPage = () => {

  const navigation = useNavigation();
  const today = new Date();
  // const savings = useSelector( state => Object.values(state.savings).filter( saving => new Date(saving.savingDate).getFullYear() === today.getFullYear() ) );
  const savings = useSelector(state => state.savings);
  const allTransactionPerMonth = useSelector(state => state.transactions.allTransactionPerMonth);

  const [totalSaving, setTotalSaving] = useState(0);
  const [savingData, setSavingData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  let lastMonth = new Date();
  lastMonth.setDate(1);
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  const [currentDetailsMonth, setCurrentDetailsMonth] = useState(lastMonth);

  function getSavings() {
    let data = [];
    let chartLabelsIdx = 1;
    let savingIdx = 0;

    let filteredSavings = Object.values(savings).filter(saving => new Date(saving.savingDate).getFullYear() === today.getFullYear())
    while (chartLabelsIdx <= 12) {
      const saving = filteredSavings[savingIdx]
      if (saving && chartLabelsIdx === Number(date.GetMonthFromKey(saving.key))) {
        data.push(Number(saving.amount.toFixed()))
        ++savingIdx
      } else {
        data.push(0)
      }
      ++chartLabelsIdx;
    }
    return data
  }

  function getCurrentMonthTransaction() {
    const currentMonthKey = date.GetMonthKey(currentDetailsMonth);
    const currMonthTransations = allTransactionPerMonth[currentMonthKey];
    let transMap = new Map();
    currMonthTransations?.dailyTransactions.forEach(transaction => {
      if (transMap.has(transaction.category)) {
        let newAmount = Number(transMap.get(transaction.category)) + Number(transaction.amount);
        transMap.set(transaction.category, newAmount)
      } else {
        transMap.set(transaction.category, Number(transaction.amount))
      }
    })
    return transMap;
  }

  useEffect(() => {
    const savingsData = getSavings();
    const labels = ["Jan.", "Fév.", "Mar.", "Avr.", "Mai", "Juin", "Juil.", "Août", "Sep.", "Oct.", "Nov.", "Déc."]
    const output = labels.reduce((acc, curr, i) => {
      acc[i] = { ...acc[i], x: curr, y: savingsData[i] }
      return acc
    }, [])
    setTotalSaving(savingsData.reduce((p, curr) => Number(curr) + p, 0))
    setSavingData(output);
  }, [savings]);

  useEffect(() => {
    const transMap = getCurrentMonthTransaction();  
    var mapAsc = new Map([...transMap.entries()].sort((a, b) => {
      if (Number(a[1]) > Number(b[1])) return -1;
      if (Number(a[1]) < Number(b[1])) return 1;
      return 0;
    }));
    let data = []
    mapAsc.forEach((value, key) => {
      data.push({
        x: key,
        y: Number((value * -1).toFixed()) });
    })
    // setCategoriesLabel(labels)
    setCategoriesData(data)
  }, [currentDetailsMonth]);

  function nextMonth(): void {
    setCurrentDetailsMonth(prev => {
      let m = new Date(prev)
      m.setMonth(prev.getMonth() + 1);
      return m;
    })
  }

  function previousMonth(): void {
    setCurrentDetailsMonth(prev => {
      let m = new Date(prev)
      m.setMonth(prev.getMonth() - 1);
      return m;
    })
  }




  return (
    <SafeAreaView style={[styles.content]}>
      <View style={{ flex: 1, justifyContent: "flex-start" }}>
        <Text style={[styles.white, { fontWeight: "bold", fontSize: 25, textAlign: "center" }]}>{date.GetYearAsString(today)}</Text>
        <Text style={[styles.white, { fontWeight: "bold", fontSize: 12, textAlign: "center" }]}>Economies: {totalSaving.toFixed()}</Text>
        <View style={{ alignSelf: "center" }} >

          <VictoryChart domainPadding={0}
            width={Math.min(Dimensions.get("window").width, 560)}
            height={220}
            padding={{ top: 40, bottom: 60, left: 20, right: 20 }}
            >
            <VictoryGroup data={savingData}>
              <VictoryBar                 
                labels={({ datum }) => datum.y !== 0 ? datum.y : ''}
                style={{
                  labels: { fill: "white" }
                }}
              />
              <VictoryBar
                labels={({ datum }) => datum.x }
                style={{
                  data: { fill: "#29C7AC" }, labels: { fill: "white" }
                }}
                labelComponent={<NegativeAwareTickLabel />}
              />
            </VictoryGroup>

            <VictoryAxis
              style={{
                tickLabels: { fill: "none" },
                axis: {
                  stroke: 'white'
                },
              }}
            />
          </VictoryChart>
        </View>
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>

          <Ionicons name="md-arrow-back" size={35} color="#fff" style={{ zIndex: 3, height: 35, marginRight: 20 }} onPress={() => previousMonth()} />
          <Text style={[styles.white, { fontWeight: "bold", fontSize: 25, textAlign: "center" }]}>{date.GetMonthAsString(currentDetailsMonth)}</Text>
          {currentDetailsMonth.getMonth() !== lastMonth.getMonth() &&
            <Ionicons name="md-arrow-forward" size={35} color="#fff" style={{ zIndex: 3, height: 35, marginLeft: 20 }} onPress={() => nextMonth()} />
          }
        </View>
        <View style={{ alignSelf: "center" }} >
          {  categoriesData.length !== 0
          && 
            <VictoryChart horizontal
            width={Math.min(Dimensions.get("window").width, 560)}
            height={300}
            padding={50}>
            <VictoryStack
              style={{ data: { width: 15 }, labels: { fontSize: 15, fill: "white" } }}
            >
              <VictoryBar
                style={{ data: { fill: "#29C7AC" }, }}
                data={categoriesData}

                labels={({ datum }) => datum.y }
              />
            </VictoryStack>

            <VictoryAxis
              style={{
                axis: { stroke: "transparent" },
                ticks: { stroke: "transparent" },
                tickLabels: { fontSize: 14, fill: "white" }
              }}
              tickLabelComponent={
                <VictoryLabel
                  x={0}
                  textAnchor="start"
                />
              }
            />
          </VictoryChart>
          }
        </View>
      </View>

      <MenuBar navigation={navigation} hasBack={true} showActions={false} showRecurring={false}></MenuBar>
    </SafeAreaView>
  );
}
