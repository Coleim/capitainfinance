import { View, Text } from "react-native";
import { styles } from '../../styles';
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { MenuBar } from "../components/MenuBar";
import { useNavigation } from "@react-navigation/native";
import { date } from "../services/DateAsString";

export const StatisticsPage = () => {
   
  const navigation = useNavigation();
  const savings = useSelector( state => state.savings );
  const allTransactionPerMonth = useSelector( state => state.transactions.allTransactionPerMonth );
  console.log(">> allTransactionPerMonth " , allTransactionPerMonth)
  console.log(">> savings " , savings)

  function renderSavings() {
    let texts;
    for ( let k of Object.keys(savings) ) {
      texts = <Text style={{ color: "#fff"}} >{ date.GetKeyDisplay(k) } : { savings[k].amount }</Text> 
    }
    
    return texts
  }

  return (
      <SafeAreaView style={[styles.content]}>
          <View style={{ flex: 1}}>
            { renderSavings() }
          </View>
          <MenuBar navigation={navigation} recurring={false}></MenuBar>
      </SafeAreaView>
  );
}
