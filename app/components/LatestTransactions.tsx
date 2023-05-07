import { FlatList, SafeAreaView, View } from "react-native";
import { styles } from '../../styles';
import { DailyTransactionItem } from "./DailyTransactionItem";
import { useSelector } from "react-redux";

export function LatestTransactions() {
  const dailyTransactions = useSelector( state => state.transactions.currentMonthDailyTransactions );
  return (
    
    <View style={ styles.content }>
      <SafeAreaView style={ [styles.content, { marginTop: 5 }] }>
          <FlatList 
              data={dailyTransactions}
              renderItem={({item}) => <DailyTransactionItem item={item}></DailyTransactionItem>}
          />
      </SafeAreaView>
    </View>
  );
}