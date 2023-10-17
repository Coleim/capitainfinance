import { View, Text, Dimensions } from "react-native";
import { styles } from '../../styles';
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { MenuBar } from "../components/MenuBar";
import { useNavigation } from "@react-navigation/native";
import { date } from "../services/DateAsString";
import { BarChart } from "react-native-chart-kit";
import { useEffect, useState } from "react";

export const StatisticsPage = () => {
   
  const navigation = useNavigation();
  const today = new Date();
  let lastMonth = new Date();
  lastMonth.setDate(1);
  lastMonth.setMonth(lastMonth.getMonth()-4);
  // const savings = useSelector( state => Object.values(state.savings).filter( saving => new Date(saving.savingDate).getFullYear() === today.getFullYear() ) );
  const savings = useSelector( state => state.savings );
  const allTransactionPerMonth = useSelector( state => state.transactions.allTransactionPerMonth );

  const [totalSaving, setTotalSaving] = useState(0);
  const [savingData, setSavingData] = useState([]);
  const [categoriesLabel, setCategoriesLabel] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  
  function getSavings() {
    let data = [];
    let chartLabelsIdx = 0;
    let savingIdx = 0;
    
    let filteredSavings = Object.values(savings).filter( saving => new Date(saving.savingDate).getFullYear() === today.getFullYear() )
    while(chartLabelsIdx < 12) {
      const saving = filteredSavings[savingIdx]
      if(saving && chartLabelsIdx === Number(date.GetMonthFromKey(saving.key))) {
        data.push(saving.amount.toFixed())
        ++savingIdx
      } else {
        data.push(0)
      }
      ++chartLabelsIdx;
    }
    return data
  }

  function getCurrentMonthTransaction() {
    const currentMonthKey = date.GetMonthKey(lastMonth);
    console.log(currentMonthKey)
    const currMonthTransations = allTransactionPerMonth[currentMonthKey];
    currMonthTransations.dailyTransactions;
    currMonthTransations.recurringTransactions;
    console.log(currMonthTransations.dailyTransactions)
    console.log(currMonthTransations.recurringTransactions)
    let transMap = new Map();
    currMonthTransations.dailyTransactions.forEach( transaction => {
      if(transMap.has(transaction.category)) {
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
    const transMap = getCurrentMonthTransaction();
    let labels = []
    let data = []
    var mapAsc = new Map([...transMap.entries()].sort((a,b) => {
      if(a>b) return -1;
      if(a<b) return 1;
      return 0;
    }));
    mapAsc.forEach( (value, key) => {
      labels.push(key);
      data.push(value*-1);
    })
    setCategoriesLabel(labels)
    setCategoriesData(data)
    setTotalSaving(savingsData.reduce((p, curr) => Number(curr) + p , 0))
    setSavingData(savingsData);
  }, [savings]);

  function renderAllTransactions() {
    let content = [];
    let data = [];
    
    for ( let k of Object.keys(allTransactionPerMonth) ) {
      console.log("KKK: " , k)

      content.push(<Text key={k+"SEP01"} style={{ color: "#fff"}} >---------------------------------------</Text> )
      content.push(<Text key={k} style={{ color: "#fff"}} >{ date.GetKeyDisplay(k) } </Text> )
      const mT = allTransactionPerMonth[k];
      content.push(<Text key={k+"SEP001"} style={{ color: "#fff"}} > ---- DAILY TRANSACTIONS ---- </Text> )
      let dTTotal = 0;
      mT.dailyTransactions.forEach( t => {
        dTTotal += t.amount;
      })
      content.push(<Text key={k+"TOTAL"} style={{ color: "#fff"}} >{ dTTotal } </Text> )

      content.push(<Text key={k+"SEP002"} style={{ color: "#fff"}} > ---- RECURRING TRANSACTIONS ---- </Text> )
      let rTTotal = 0;
      mT.recurringTransactions?.forEach( t => {
        rTTotal += t.amount;
      })
      content.push(<Text key={k+"TOTAL2"} style={{ color: "#fff"}} >{ rTTotal } </Text> )
    }
    
    return content
  }

  const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(100, 100, 255, 1)`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, 1)`,
    paddingLeft: 0,
    paddingRight: 0,
    barPercentage: 0.5,
  };

  const graphStyle = {
    marginVertical: 10,
    borderRadius: 5,
    ...chartConfig
  };

  const chartData = {
    labels: ["Jan.", "Fév.", "Mar.", "Avr.", "Mai", "Juin", "Juil.", "Août", "Sep.", "Oct.", "Nov.", "Déc."],
    datasets: [
      {
        data: savingData
      }
    ]
  };

  const chartDataPerCategories = {
    labels: categoriesLabel,
    datasets: [
      {
        data: categoriesData
      }
    ]
  };



  return (
      <SafeAreaView style={[styles.content]}>
        <View style={{ flex: 1, justifyContent: "flex-start"}}>
          <Text style={[styles.white, { fontWeight: "bold", fontSize: 25, textAlign: "center" }]}>{date.GetYearAsString(today)}</Text>
          <Text style={[styles.white, { fontWeight: "bold", fontSize: 12, textAlign: "center" }]}>Economies: {totalSaving.toFixed()}</Text>
          <View style={ { alignSelf: "center"}} >
            
            <BarChart
              width={Math.min(Dimensions.get("window").width - 20, 560)}
              height={220}
              chartConfig={chartConfig}
              style={graphStyle}
              withInnerLines={false}
              showValuesOnTopOfBars={true}
              fromZero={true}
              showBarTops={false}
              yAxisInterval={0}
              yAxisLabel=""
              yAxisSuffix=""
              data={chartData}
            />
          </View>
          <View>
            <Text style={[styles.white, { fontWeight: "bold", fontSize: 25, textAlign: "center" }]}> {'<-'} {date.GetMonthAsString(lastMonth)} {'->'}</Text>
          </View>
          <View style={ { alignSelf: "center"}} >
            <BarChart
              width={250}
              height={Math.min(Dimensions.get("window").width - 20, 560)}
              chartConfig={chartConfig}
              verticalLabelRotation={270}
              style={{
                marginTop: -20,
                transform: [{ rotate: "90deg" }],
                paddingLeft: 0,
                paddingRight: 10,
                borderRadius: 5                
              }}
              xLabelsOffset={40}
              withInnerLines={false}
              showValuesOnTopOfBars={true}
              fromZero={true}
              showBarTops={false}
              yAxisLabel=""
              yAxisSuffix=""
              data={chartDataPerCategories}
            />
          </View>
        </View>
          
        <MenuBar navigation={navigation} hasBack={true} showActions={false} showRecurring={false}></MenuBar>
      </SafeAreaView>
  );
}
