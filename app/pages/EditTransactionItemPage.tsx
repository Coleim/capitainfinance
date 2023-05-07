import { styles } from '../../styles';
import { SafeAreaView } from "react-native-safe-area-context";
import { ItemEdition } from "../components/ItemEdition";
import { Transaction } from '../models/transaction';


export function EditTransactionItemPage( { route } ) {

    const recurring = route.params.recurring;
    const item: Transaction = route.params.item ?? {
        label: "",
        amount: 0,
        category: "",
        isReccuring: recurring
    };
    const isExpense: boolean = route.params.isExpense;
    return (
        <SafeAreaView style={[styles.content]}>
            <ItemEdition item={item} isExpense={isExpense} />
        </SafeAreaView>
    );
}