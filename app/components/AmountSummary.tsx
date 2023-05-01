import { StyleSheet, Text, View } from "react-native";
import { date } from "../services/DateAsString";
import { useSelector } from "react-redux";

export function AmountSummary() {

  const today = new Date();
  const numberOfDaysUntilEndOfMonth = (new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate() - today.getDate()) + 1;

  const availableMonthlyAmount = useSelector( state => state.transactions.availableMonthlyAmount );
  const availableDailyAmount = useSelector( state => state.transactions.availableDailyAmount );
  const realAvailableAmountPerDay = useSelector( state => state.transactions.realAvailableAmountPerDay );

  const remainingAmountAsPerToday = realAvailableAmountPerDay.at(today.getDate()-1);
  const amountPerDayUntilEndOfMonth = Number((remainingAmountAsPerToday / numberOfDaysUntilEndOfMonth).toFixed(2));

  const totalExpenses = useSelector( state => state.transactions.currentMonthDailyTransactions.totalExpenses );
  const totalIncomes = useSelector( state => state.transactions.currentMonthDailyTransactions.totalIncomes );
  const dailyAmountSpent = -1*( (totalExpenses+totalIncomes) / today.getDate());

  return (
    <View style={styles.amountSummary}>
      <Text style={styles.white}> Montant total disponible pour {date.GetMonthAsString(today)} {availableMonthlyAmount} €</Text>
      <Text style={styles.white}> Soit {availableDailyAmount?.toFixed(2)} € par jour </Text>

      <Text style={styles.white}> Montant restant disponible pour {date.GetMonthAsString(today)} </Text>
      <Text style={styles.white}> { remainingAmountAsPerToday?.toFixed(2) } €</Text>
      <Text style={styles.white}> Soit { amountPerDayUntilEndOfMonth } € par jour </Text>

      <Text style={styles.white}> Vous avez dépensé { dailyAmountSpent?.toFixed(2) } € par jour </Text>      
    </View>
  );
}



export const styles = StyleSheet.create({
  amountSummary: {
      height: 100,
      alignItems: "center",
      justifyContent: "center",
  },
  white: {
      color: "#fff"
  }
});