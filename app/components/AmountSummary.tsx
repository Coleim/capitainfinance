import { StyleSheet, Text, View } from "react-native";
import { date } from "../services/DateAsString";
import { useSelector } from "react-redux";
import { AnimatedCircularProgress } from 'react-native-circular-progress';


export function AmountSummary() {

  const today = new Date();
  const numberOfDaysUntilEndOfMonth = (new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate() - today.getDate()) + 1;

  const availableMonthlyAmount = useSelector( state => state.transactions.availableMonthlyAmount );
  const availableDailyAmount = useSelector( state => state.transactions.availableDailyAmount );
  const realAvailableAmountPerDay = useSelector( state => state.transactions.realAvailableAmountPerDay );

  const remainingAmountAsPerToday = realAvailableAmountPerDay.at(today.getDate()-1);
  const amountPerDayUntilEndOfMonth = Number((remainingAmountAsPerToday / numberOfDaysUntilEndOfMonth).toFixed(2));

  const currentMonthDailyTransactions = useSelector( state => state.transactions.currentMonthDailyTransactions );
  const totalSpent = currentMonthDailyTransactions.reduce((acc, transaction) => { return acc + transaction.amount; }, 0);
  const dailyAmountSpent = -1*( totalSpent / today.getDate());

  const red = "#e91e63";
  const orange = "#e9a41e";
  const green = "#1ee9a4";

  const fill = (remainingAmountAsPerToday / availableMonthlyAmount)*100;
  const tintColor = () => {
    if(fill >= 70) {
      return green;
    } else if( fill >= 30) {
      return orange;
    }
    return red;
   };

   const formatNumber = ( num: number ) => {
    if(num < 100000) return num.toString();
    return (num/1000).toFixed() + "k";
   }


  return (
    <View style={styles.amountSummary}>
      <View style={ { alignItems: "center", justifyContent: "center", alignContent: "center", paddingBottom: 5}} >
        {/* <Text style={[styles.white, { textAlign: "center" }]}>Montant disponible en</Text> */}
        <Text style={[styles.white, { fontWeight: "bold", fontSize: 20, textAlign: "center" }]}>{date.GetMonthAsString(today)}</Text>
      </View>

      <View style={ { flexDirection: "row", justifyContent: "space-evenly", alignContent: "center", width: "100%"}}>
        <View>
          <AnimatedCircularProgress
            size={160}
            width={15}
            fill={fill}
            rotation={-100}
            arcSweepAngle={200}
            lineCap="round"
            tintColor={tintColor()}
            backgroundColor="#3d5875">
              {
              (fill) => (
                <>
                  <Text style={[styles.white, { fontWeight: "bold", fontSize: 18 }]} >{ formatNumber(remainingAmountAsPerToday) } €</Text>
                  {/* <Text style={[styles.white, { fontWeight: "bold", fontSize: 18 }]} >{remainingAmountAsPerToday?.toFixed(2)} €</Text> */}
                  
                  <Text style={[styles.white, { fontSize: 14 }]}>{ formatNumber(amountPerDayUntilEndOfMonth) } € / jour </Text>
                  <Text style={[styles.white, { fontSize: 12 }]}>Dépensé</Text>
                  <Text style={[styles.white, { fontSize: 10, paddingBottom: 15 }]}>{ dailyAmountSpent?.toFixed(2) } € / jour </Text>
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
      alignItems: "center",
      justifyContent: "center",
      marginBottom: -40
  },
  white: {
      color: "#fff"
  }
});