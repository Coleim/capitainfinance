import { Pressable, StyleSheet, Text, View } from "react-native";
import { date } from "../services/DateAsString";
import { useNavigation } from '@react-navigation/native';
import { Transaction } from "../models/transaction";

export function DailyTransactionItem(props) {
    const item: Transaction = props.item;

    const navigation = useNavigation();
    function editItem(): void {
        const isExpense = item.amount <= 0;
        navigation.navigate('EditTransactionItemPage', { item, isExpense, recurring: false });
    }

    return (
      <View>
        <Pressable onPress={() => editItem() } style={ itemStyle.container } >
            <View style={ { flexDirection: "row", alignItems: "center"}}>
                <View style={ { flexDirection: "column"} }>
                    <Text style={ { color: "#525174", fontSize: 15 } } >{item.label}</Text>
                    <Text style={ { fontSize: 10 } } >{ date.AsString(new Date(item.date)) } </Text>
                    {/* <Text style={ { fontSize: 10 } } > month: {item.month} - year: {item.fullYear} </Text> */}
                </View>
                <Text style={ [{ marginLeft: "auto", fontWeight: "bold" }, item.amount > 0 ? {color: "#06d6a0"}: {color: "#ef476f"}] } >{item.amount.toFixed(2)} €</Text>
            </View>
        </Pressable>
      </View>
    );
}

const itemStyle = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderColor: "#525174",
        borderWidth: 1,
        padding: 8,
    }
});