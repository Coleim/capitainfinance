import { View } from "react-native";
import { styles } from '../../styles';
import { useCallback, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TransactionsContainer } from "../components/TransactionsContainer";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction } from "../actions/transactions";
import { resetStore, setToday } from "../actions/global";

export const HomePage = ({ navigation }) => {
   
    const dispatch = useDispatch();
    const recurringTransactions = useSelector( state => state.transactions.recurringTransactions );
    
    useEffect(() => {
        if (recurringTransactions.length === 0) {
          navigation.navigate('RecurringConfigurationPage');
        }
    }, [recurringTransactions]);

    useEffect(() => {
        dispatch(setToday(new Date()));
        // const today = new Date();
        // dispatch(resetStore(new Date()));
        // const pastDate = new Date(today.getFullYear(), today.getMonth()-1, 25)
        // dispatch(addTransaction('Salaire Clement', 3100, 'SALAIRE', undefined, true));
        // dispatch(addTransaction('Test RECENT', -10, 'TEST'));
        // dispatch(addTransaction('Test PAST', -10, 'TEST', pastDate));
    }, []);

    return (
        <SafeAreaView style={[styles.content]}>
            <View style={{ flex: 1 }}>
                <TransactionsContainer navigation={navigation}></TransactionsContainer>
            </View>
        </SafeAreaView>
    );
}
