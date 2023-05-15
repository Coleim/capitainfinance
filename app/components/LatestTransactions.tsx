import { FlatList, SafeAreaView, View, Text, Pressable } from "react-native";
import { styles } from '../../styles';
import { DailyTransactionItem } from "./DailyTransactionItem";
import { useSelector } from "react-redux";
import { Transaction } from "../models/transaction";
import Ionicons from '@expo/vector-icons/Ionicons';

export function LatestTransactions() {
  const dailyTransactions = useSelector( state => state.transactions.currentMonthDailyTransactions );

  function viewStats(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <View style={ styles.content }>
      <SafeAreaView style={ [styles.content, { marginTop: 5 }] }>
        <Pressable  style={ { flexDirection: "row", alignSelf: "flex-end", marginRight: 10 } } onPress={ () => viewStats() }>
          <Text style={ { color: "#fff", marginRight: 5, fontSize: 10, alignSelf: "baseline"} }>Voir statistiques</Text>
          <Ionicons name="md-stats-chart" size={15} color="#fff" style={{zIndex: 3, height: 15, marginBottom: 5, alignSelf: "baseline" }} />
        </Pressable >
        <FlatList 
            data={dailyTransactions.sort( (a: Transaction, b: Transaction) => a.date && b.date && new Date(a.date) < new Date(b.date) )}
            renderItem={({item}) => <DailyTransactionItem item={item}></DailyTransactionItem>}
        />
      </SafeAreaView>
    </View>
  );
}