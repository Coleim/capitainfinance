import { StyleSheet, Text, View } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { database } from "../services/DbServices";
import { useFocusEffect } from "@react-navigation/native";
import { date } from "../services/DateAsString";

export function AmountSummary(props) {

  const remainingAmount = props.remainingAmount;
  const amountPerDay = props.amountPerDay;

  const expectedRemainingAmountPerDay = props.expectedRemainingAmountPerDay;
  const realRemainingAmountPerDay = props.realRemainingAmountPerDay;
  
  const today = new Date();
  let numberOfDaysUntilEndOfMonth = (new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate() - today.getDate()) + 1;
  
  const remainingAmountAsPerToday = realRemainingAmountPerDay.at(today.getDate()-1);
  const amountPerDayUntilEndOfMonth = Number((remainingAmountAsPerToday / numberOfDaysUntilEndOfMonth).toFixed(2));


  return (
    <View style={styles.amountSummary}>
      <Text style={styles.white}> Reste à vivre total pour {date.GetMonthAsString(today)} {remainingAmount} €</Text>
      <Text style={styles.white}> Soit {amountPerDay.toFixed(2)} € par jour </Text>

      <Text style={styles.white}> Restant pour {date.GetMonthAsString(today)} aujourd'hui </Text>
      <Text style={styles.white}> { remainingAmountAsPerToday?.toFixed(2) } €</Text>
      <Text style={styles.white}> Soit { amountPerDayUntilEndOfMonth } € par jour </Text>
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