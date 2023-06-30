import { FlatList, SafeAreaView, View, Text, Pressable } from "react-native";
import { styles } from '../../styles';
import { DailyTransactionItem } from "./DailyTransactionItem";
import { useSelector } from "react-redux";
import { Transaction } from "../models/transaction";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";

export function LatestTransactions() {
  const navigation = useNavigation();
  
  const dailyTransactions = useSelector( state => state.transactions.currentMonthDailyTransactions);

  function viewStats(): void {
    navigation.navigate('StatisticsPage');
  }

  function sortTransactions(a: Transaction, b: Transaction): number {
    if(!a.date || !b.date) {
      return 0;
    }
    if(new Date(a.date) < new Date(b.date) ) {
      return 1;
    }
    if(new Date(a.date) > new Date(b.date) ) {
      return -1;
    }
    return 0;    
  }
  

  return (
    <View style={ styles.content }>
      <SafeAreaView style={ [styles.content, { marginTop: 5 }] }>
        <Pressable  style={ { flexDirection: "row", alignSelf: "flex-end", marginRight: 10 } } onPress={ () => viewStats() }>
          <Text style={ { color: "#fff", marginRight: 5, fontSize: 10, alignSelf: "baseline"} }>Voir statistiques</Text>
          <Ionicons name="md-stats-chart" size={15} color="#fff" style={{zIndex: 3, height: 15, marginBottom: 5, alignSelf: "baseline" }} />
        </Pressable >
        <FlatList 
            data={dailyTransactions.sort(sortTransactions) }
            renderItem={({item}) => <DailyTransactionItem item={item}></DailyTransactionItem>}
        />
      </SafeAreaView>
    </View>
  );
}