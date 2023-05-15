import { Pressable, Text, View} from "react-native";
import { AmountSummary } from '../components/AmountSummary';
import { BurndownChart } from '../components/BurndownChart';
import { LatestTransactions } from '../components/LatestTransactions';
import { MenuBar } from "./MenuBar";
import Ionicons from '@expo/vector-icons/Ionicons';

export function TransactionsContainer( {navigation} ) {

    return (
        <View style={{ flex: 1, justifyContent: "space-between"}}>
            <View>
                {/* <View style={ { flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <Pressable  style={ { flexDirection: "column", justifyContent: "center", alignItems: "center", marginRight: "auto" }} onPress={ () => openRecurringConfigurationPage() }>
                        <Text style={ { color: "#fff", marginRight: 5, fontSize: 10, alignSelf: "baseline"} }>Transactions récurrentes</Text>
                        <Ionicons name="md-sync-circle-outline" size={20} color="#fff" style={{zIndex: 3, height: 15, marginBottom: 5 }} />
                    </Pressable >

                    <View></View>
                    
                    <Pressable  style={ { flexDirection: "column", justifyContent: "center", alignItems: "center", marginLeft: "auto" }} onPress={ () => openRecurringConfigurationPage() }>
                        <Text style={ { color: "#fff", marginRight: 5, fontSize: 10, alignSelf: "baseline"} }>Transactions</Text>
                        <Text style={ { color: "#fff", marginRight: 5, fontSize: 10, alignSelf: "baseline"} }>récurrentes</Text>
                        <Ionicons name="md-sync-circle-outline" size={20} color="#fff" style={{zIndex: 3, height: 15, marginBottom: 5 }} />
                    </Pressable >

                </View> */}
                <AmountSummary navigation={navigation}/>
                <BurndownChart />
            </View>
            <LatestTransactions />
            <MenuBar navigation={navigation} recurring={false}></MenuBar>
        </View>
    );
}

