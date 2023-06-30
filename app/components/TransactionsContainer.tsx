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
                <AmountSummary navigation={navigation}/>
                <BurndownChart />
            </View>
            <LatestTransactions />
            <MenuBar navigation={navigation} recurring={false}></MenuBar>
        </View>
    );
}

