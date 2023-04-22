import { Text } from 'react-native';
import { styles } from '../../styles';
import { useEffect } from "react";
import { database } from "../services/DbServices";
import { SafeAreaView } from "react-native-safe-area-context";
import { ItemEdition } from "../components/ItemEdition";


export function EditTransactionItemPage( { route } ) {

    const item: database.Transaction = route.params.item ?? {
        transaction_id: undefined,
        owner_id: undefined,
        label: "",
        amount: 0,
        category: "",
        date: null,
        endDate: null,
        isReccuring: false
    };
    const isExpense: boolean = route.params.isExpense;
    
    return (
        <SafeAreaView style={[styles.content]}>
            <ItemEdition item={item} isExpense={isExpense} />
        </SafeAreaView>
    );
}