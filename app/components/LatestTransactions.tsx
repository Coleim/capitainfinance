import { FlatList, SafeAreaView, Text, View } from "react-native";
import { styles } from '../../styles';
import { DailyTransactionItem } from "./DailyTransactionItem";

export function LatestTransactions(props) {
  const dailyTransactions = props.dailyTransactions;

  return (
    
    <View style={ styles.content }>
      <SafeAreaView style={ [styles.content, { marginTop: 5 }] }>
          <FlatList 
              data={dailyTransactions}
              renderItem={({item}) => <DailyTransactionItem item={item}></DailyTransactionItem>}
          />
      </SafeAreaView>
    </View>


    // <View style={[styles.menuBar, { marginBottom: "auto" }]}>
    //     <Text> LatestTransactions </Text>
    // </View>
  );
}