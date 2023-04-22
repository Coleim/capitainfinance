import { ActivityIndicator, View } from "react-native";
import { MenuBar } from '../components/MenuBar';
import { styles } from '../../styles';
import { useEffect, useState } from "react";
import { database } from "../services/DbServices";
import { SafeAreaView } from "react-native-safe-area-context";
import { TransactionsContainer } from "../components/TransactionsContainer";

export function HomePage( {navigation} ) {

    const [databaseReady, setDatabaseReady] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
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
                    navigation.navigate('RecurringConfigurationPage');
                } else {
                    setDatabaseReady(true);
                }
            }
            // navigation.navigate('RecurringConfigurationPage');
        }
        fetchData();
    }, []);
    
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