import { ActivityIndicator, Button, Text, View } from "react-native";
import { MenuBar } from '../components/MenuBar';
import { styles } from '../../styles';
import { useCallback, useEffect, useState } from "react";
// import { database } from "../services/DbServices";
import { SafeAreaView } from "react-native-safe-area-context";
import { TransactionsContainer } from "../components/TransactionsContainer";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Transaction } from "../models/transaction";
import { addRecurringTransaction, addTransaction, initTransactions, resetStore, setToday, updateCount, updateTransaction } from "../actions/transactions";
import { insertSaving } from "../actions/savings";
import * as Crypto from 'expo-crypto';

export const HomePage = ({ navigation }) => {
   
    const dispatch = useDispatch();

    // const [databaseReady, setDatabaseReady] = useState(false);
    const recurringTransactions = useSelector( state => state.transactions.recurringTransactions.list );
    
    useEffect(() => {
        if (recurringTransactions.length === 0) {
          navigation.navigate('RecurringConfigurationPage');
        }
    }, [recurringTransactions]);


    const fetchData = async () => {
        // setDatabaseReady(true);

        // const hasVersion = await database.HasVersionTable();
        // if(!hasVersion) {
        //     await database.CreateDatabase();
        //     navigation.navigate('RecurringConfigurationPage');
        // } else {
        //     // TODO: upgrade version
        //     const hasRecurringTransactions = await database.HasRecurringTransactions();
        //     if(!hasRecurringTransactions) {
        //         setDatabaseReady(false);
        //         navigation.navigate('RecurringConfigurationPage');
        //     } else {
        //         setDatabaseReady(true);
        //     }
        // }
        // navigation.navigate('RecurringConfigurationPage');
    }

    // const today = new Date();

    useEffect(() => {
        const today = new Date();
        dispatch(resetStore(new Date()));
        dispatch(setToday(new Date()));

        const pastDate = new Date(today.getFullYear(), today.getMonth()-1, 25)

        // dispatch(setToday(new Date(today.getFullYear(), today.getMonth(), 25)));

        dispatch(addTransaction('Salaire Clement', 3100, 'SALAIRE', undefined, true));
        dispatch(addTransaction('Test 2', 10, 'TEST'));
        dispatch(addTransaction('Test 4', 10, 'TEST', pastDate));

        // dispatch(addTransaction('Salaire Sybille', 1700, 'SALAIRE', true));
        // dispatch(addTransaction('Croatie', -295, 'SALAIRE', true));

       
        // dispatch(addRecurringTransaction({transaction_id: Crypto.randomUUID(), owner_id: '123', label: 'Salaire Sybille', amount: 1700, category: 'SALAIRE', isReccuring: true }));
        // dispatch(addRecurringTransaction({transaction_id: Crypto.randomUUID(), owner_id: '123', label: 'Croatie', amount: -295, category: 'CREDIT', isReccuring: true }));
        // dispatch(addTransaction({
        //     transaction_id: 0,
        //     owner_id: "",
        //     label: "",
        //     amount: 30,
        //     isReccuring: false
        // }))
        // dispatch(addTransaction({
        //     transaction_id: 0,
        //     owner_id: "",
        //     label: "",
        //     amount: 10,
        //     date: new Date(today.getFullYear(), today.getMonth(), 10),
        //     isReccuring: false
        // }))
    }, []);


    useFocusEffect(
        useCallback(() => {
            // fetchData();
            return () => {};
        }, [])
    );

    return (
        <SafeAreaView style={[styles.content]}>
            <View style={{ flex: 1 }}>
                <TransactionsContainer navigation={navigation}></TransactionsContainer>
            </View>
        </SafeAreaView>
    );
}
