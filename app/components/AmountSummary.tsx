import { Easing, Pressable, StyleSheet, Text, View } from "react-native";
import { date } from "../services/DateAsString";
import { useSelector } from "react-redux";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { RefObject, createRef, useEffect } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';

export function AmountSummary({ navigation }) {

  const today = new Date();
  const numberOfDaysUntilEndOfMonth = (new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate() - today.getDate()) + 1;

  const availableMonthlyAmount = useSelector(state => state.transactions.availableMonthlyAmount);
  const realAvailableAmountPerDay = useSelector(state => state.transactions.realAvailableAmountPerDay);
  const remainingAmountAsPerToday = realAvailableAmountPerDay.at(today.getDate() - 1);
  const amountPerDayUntilEndOfMonth = Number((remainingAmountAsPerToday / numberOfDaysUntilEndOfMonth).toFixed(2));

  const currentMonthDailyTransactions = useSelector(state => state.transactions.currentMonthDailyTransactions);
  const totalSpent = currentMonthDailyTransactions.reduce((acc, transaction) => { return acc + transaction.amount; }, 0);
  const dailyAmountSpent = -1 * (totalSpent / today.getDate());

  const red = "#e91e63";
  const orange = "#e9a41e";
  const green = "#1ee9a4";
  
  let circularProgressRef: RefObject<AnimatedCircularProgress> = createRef();
  let fill = (remainingAmountAsPerToday / availableMonthlyAmount) * 100;

  useEffect(() => {
    console.log("Use effect")
      if(availableMonthlyAmount !== 0) {
        const newFill = (remainingAmountAsPerToday / availableMonthlyAmount) * 100;
        circularProgressRef?.current?.animate(newFill, 400, Easing.ease);
      }
  }, [remainingAmountAsPerToday, availableMonthlyAmount]);
  
  const tintColor = () => {
    if (fill >= 70) {
      return green;
    } else if (fill >= 30) {
      return orange;
    }
    return red;
  };


  const formatNumber = (num: number) => {
    if (num < 100000) return num.toFixed(2);
    return (num / 1000).toFixed() + "k";
  }


  function openRecurringConfigurationPage(): void {
    navigation.navigate('RecurringConfigurationPage');
    // throw new Error("Function not implemented.");
  }

  function openConfiguration(): void {
    // throw new Error("Function not implemented.");
  }

  return (
    <View style={styles.amountSummary}>
      <View style={{ flexDirection: "row", paddingBottom: 5, marginTop: 10 }} >
        <View style={ { flex: 1, marginLeft: 15 }} >
          <Pressable  style={ { flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center", marginRight: "auto" }} onPress={ () => openConfiguration() }>
            <Ionicons name="md-settings" size={15} color="#fff" style={{zIndex: 3, height: 15, marginBottom: 5 }} />
            <Text style={ { color: "#fff", marginRight: 5, fontSize: 10, alignSelf: "baseline"} }>Configuration</Text>
          </Pressable >
        </View>
        
        <View style={ { flex: 1 }} >
          <Text style={[styles.white, { fontWeight: "bold", fontSize: 20, textAlign: "center" }]}>{date.GetMonthAsString(today)}</Text>
        </View>

        <View style={ { flex: 1, marginRight: 15 }} >
          <Pressable style={ { marginLeft: "auto", flexDirection: "column", justifyContent: "center", alignItems: "center" }} onPress={ () => openRecurringConfigurationPage() }>
              <Ionicons name="md-sync-circle-outline" size={15} color="#fff" style={{zIndex: 3, height: 15, marginBottom: 5 }} />
              <Text style={ { color: "#fff", marginRight: 5, fontSize: 10, alignSelf: "baseline"} }>Transactions</Text>
              <Text style={ { color: "#fff", marginRight: 5, fontSize: 10, alignSelf: "baseline"} }>récurrentes</Text>
          </Pressable >

        </View>



      </View>


      <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignContent: "center", width: "100%" }}>
        <View>
          <AnimatedCircularProgress
            size={160}
            width={15}
            ref={circularProgressRef}
            fill={0}
            rotation={-100}
            arcSweepAngle={200}
            lineCap="round"
            tintColor={tintColor()}
            backgroundColor="#3d5875">
            {
              (fill) => (
                <>
                  <Text style={[styles.white, { fontWeight: "bold", fontSize: 18 }]} >{formatNumber(remainingAmountAsPerToday)} €</Text>
                  <Text style={[styles.white, { fontSize: 14 }]}>{formatNumber(amountPerDayUntilEndOfMonth)} € / jour </Text>
                  <Text style={[styles.white, { fontSize: 12 }]}>Dépensé</Text>
                  <Text style={[styles.white, { fontSize: 10, paddingBottom: 15 }]}>{dailyAmountSpent?.toFixed(2)} € / jour </Text>
                </>
              )
            }
          </AnimatedCircularProgress>
        </View>
      </View>
    </View>
  );
}



export const styles = StyleSheet.create({
  amountSummary: {
    // alignItems: "center",
    // justifyContent: "center",
    marginBottom: -40
  },
  white: {
    color: "#fff"
  }
});