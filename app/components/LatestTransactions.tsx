import { FlatList, SafeAreaView, View } from "react-native";
import { styles } from '../../styles';
import { DailyTransactionItem } from "./DailyTransactionItem";
import { useSelector } from "react-redux";
import { Transaction } from "../models/transaction";
import { useEffect, useState } from "react";

export function LatestTransactions() {
  const dailyTransactions = useSelector( state => state.transactions.currentMonthDailyTransactions );
  return (
    <View style={ styles.content }>
      <SafeAreaView style={ [styles.content, { marginTop: 5 }] }>
          <FlatList 
              data={dailyTransactions.sort( (a: Transaction, b: Transaction) => a.date && b.date && new Date(a.date) < new Date(b.date) )}
              renderItem={({item}) => <DailyTransactionItem item={item}></DailyTransactionItem>}
          />
      </SafeAreaView>
    </View>
  );
}