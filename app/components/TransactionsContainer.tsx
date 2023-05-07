import { View} from "react-native";
import { AmountSummary } from '../components/AmountSummary';
import { BurndownChart } from '../components/BurndownChart';
import { LatestTransactions } from '../components/LatestTransactions';
import { MenuBar } from "./MenuBar";

export function TransactionsContainer( {navigation} ) {

    return (
        <View style={{ flex: 1, justifyContent: "space-between"}}>
            <View>
                <AmountSummary />
                <BurndownChart />
            </View>
            <LatestTransactions />
            <MenuBar navigation={navigation}></MenuBar>
        </View>
    );
}

