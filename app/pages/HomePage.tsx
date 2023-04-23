import { ActivityIndicator, View } from "react-native";
import { MenuBar } from '../components/MenuBar';
import { styles } from '../../styles';
import { useCallback, useEffect, useState } from "react";
import { database } from "../services/DbServices";
import { SafeAreaView } from "react-native-safe-area-context";
import { TransactionsContainer } from "../components/TransactionsContainer";
import { useFocusEffect } from "@react-navigation/native";

export function HomePage( {navigation} ) {

    const [databaseReady, setDatabaseReady] = useState(false);

    const fetchData = async () => {
        console.log("fetchData");
        // await database.CreateDatabase();
        // database.CloseDb();
        const hasVersion = await database.HasVersionTable();
        if(!hasVersion) {
            await database.CreateDatabase();
            navigation.navigate('RecurringConfigurationPage');
        } else {
            // TODO: upgrade version
            const hasRecurringTransactions = await database.HasRecurringTransactions();
            if(!hasRecurringTransactions) {
                setDatabaseReady(false);
                navigation.navigate('RecurringConfigurationPage');
            } else {
                setDatabaseReady(true);
            }
        }
        // navigation.navigate('RecurringConfigurationPage');
    }

    // useEffect(() => {
    //     fetchData();
    // }, [navigation]);

    useFocusEffect(
        useCallback(() => {
            fetchData();
            return () => {};
        }, [])
    );
    
    return (
        <SafeAreaView style={[styles.content]}>
            { databaseReady ? 
                <View style={{ flex: 1 }}>
                    <TransactionsContainer></TransactionsContainer>
                    <MenuBar navigation={navigation}></MenuBar>
                </View>
                :
                <View style={{ flex: 1, justifyContent: "center"}}>
                    <ActivityIndicator size="large" />
                </View>
            }
            
            
        </SafeAreaView>
    );
}