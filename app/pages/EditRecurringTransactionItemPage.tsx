import { Text } from 'react-native';
import { styles } from '../../styles';
import { useEffect } from "react";
import { database } from "../services/DbServices";
import { SafeAreaView } from "react-native-safe-area-context";
import { RecurringItemEdition } from "../components/RecurringItemEdition";


export function EditRecurringTransactionItemPage( { route } ) {

    console.log(route.params)

    const item: database.Transaction = route.params.item ?? {
        transaction_id: undefined,
        owner_id: undefined,
        label: "",
        amount: 0,
        category: "",
        date: null,
        endDate: null,
        isReccuring: true
    };
    const isExpense: boolean = route.params.isExpense;
    
    return (
        <SafeAreaView style={[styles.content]}>
            <RecurringItemEdition item={item} isExpense={isExpense} />
        </SafeAreaView>
    );
}