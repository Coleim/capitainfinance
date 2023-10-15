import { View, Text, Dimensions } from "react-native";
import { styles } from '../../styles';
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { MenuBar } from "../components/MenuBar";
import { useNavigation } from "@react-navigation/native";
import { date } from "../services/DateAsString";
import { BarChart } from "react-native-chart-kit";

export const StatisticsPage = () => {
   
  const navigation = useNavigation();
  const today = new Date();
  const savings = useSelector( state => Object.values(state.savings).filter( saving => new Date(saving.savingDate).getFullYear() === today.getFullYear() ) );
  const allTransactionPerMonth = useSelector( state => state.transactions.allTransactionPerMonth );
  

  function getSavingsData() {
    let data = [];
    let chartLabelsIdx = 0;
    let savingIdx = 0;
    while(chartLabelsIdx < 12) {
      const saving = savings[savingIdx]
      if(saving && chartLabelsIdx === Number(date.GetMonthFromKey(saving.key))) {
        data.push(saving.amount)
        ++savingIdx
      } else {
        data.push(0)
      }
      ++chartLabelsIdx;
    }
    return data
  }

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
        data: getSavingsData()
      }
    ]
  };

  return (
      <SafeAreaView style={[styles.content]}>
        <View style={{ flex: 1, justifyContent: "flex-start"}}>
        <Text style={[styles.white, { fontWeight: "bold", fontSize: 30, textAlign: "center" }]}>{date.GetYearAsString(today)}</Text>
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
        </View>
          
          <MenuBar navigation={navigation} hasBack={true} showActions={false}></MenuBar>
      </SafeAreaView>
  );
}
