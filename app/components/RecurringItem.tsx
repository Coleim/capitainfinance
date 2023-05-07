import { Pressable, StyleSheet, Text, View } from "react-native";
import { date } from "../services/DateAsString";
import { useNavigation } from '@react-navigation/native';
import { Transaction } from "../models/transaction";

export function RecurringItem(props) {
    const item: Transaction = props.item;
    const isExpense: boolean = props.isExpense;

    const navigation = useNavigation();
    function editItem(): void {
        navigation.navigate('EditTransactionItemPage', { item, isExpense, recurring: true });
    }

    return (
      <View>
        <Pressable onPress={() => editItem() } style={ itemStyle.container }>
            <View style={ { flexDirection: "row", alignItems: "center"}}>
                <View style={ { flexDirection: "column"} }>
                    <Text style={ { color: "#525174", fontSize: 15 } } >{item.label}</Text>
                    {item.date && <Text style={ { fontSize: 10 } } >du { date.AsString(item.date) } au { date.AsString(item.endDate) } </Text>}
                </View>
                <Text style={ [{ marginLeft: "auto", fontWeight: "bold" }, item.amount > 0 ? {color: "#06d6a0"}: {color: "#ef476f"}] } >{item.amount} €</Text>
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