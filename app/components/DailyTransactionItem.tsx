import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { styles } from "../../styles";
import { database } from "../services/DbServices";
import { date } from "../services/DateAsString";
import { useNavigation } from '@react-navigation/native';

export function DailyTransactionItem(props) {
    const item: database.DailyTransaction = props.item;
    const navigation = useNavigation();
    function editItem(): void {
        // navigation.navigate('EditRecurringTransactionItemPage', { item });
    }

    return (
      <View>
        <Pressable onPress={() => editItem() } style={ itemStyle.container }>
            <View style={ { flexDirection: "row", alignItems: "center"}}>
                <View style={ { flexDirection: "column"} }>
                    <Text style={ { color: "#525174", fontSize: 15 } } >{item.label}</Text>
                    <Text style={ { fontSize: 10 } } >{ date.AsString(item.date) } </Text>
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