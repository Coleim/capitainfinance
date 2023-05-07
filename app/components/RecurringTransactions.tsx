import { FlatList, SafeAreaView, View } from "react-native";
import { styles } from "../../styles";
import { RecurringItem } from "./RecurringItem";
import { Transaction } from "../models/transaction";

export function RecurringTransactions(props) {
  const transactions: Transaction[] = props.transactions;
  const isExpense: boolean = props.isExpense;
  
  return (
    <View style={ styles.content }>
          <SafeAreaView style={ [styles.content, { marginTop: 5 }] }>
              <FlatList
                  data={transactions}
                  renderItem={({item}) => <RecurringItem item={item} isExpense={isExpense} ></RecurringItem>}
              />
          </SafeAreaView>
    </View>
  );
}