import { FlatList, SafeAreaView, View } from "react-native";
import { styles } from "../../styles";
import { RecurringItem } from "./RecurringItem";

export function RecurringTransactions(props) {
  const transactions = props.transactions;
  const isExpense: boolean = props.isExpense;
  
  return (
    <View style={ styles.content }>
          <SafeAreaView style={ [styles.content, { marginTop: 5 }] }>
              <FlatList
                  // data={transactions.sort( (a: Transaction, b: Transaction) => a.date && b.date && new Date(a.date) < new Date(b.date) )}
                  data={transactions}
                  renderItem={({item}) => <RecurringItem item={item} isExpense={isExpense} ></RecurringItem>}
              />
          </SafeAreaView>
    </View>
  );
}