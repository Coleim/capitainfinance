import { View, Text, Pressable } from "react-native";
import { styles } from '../../styles';
import { useEffect, useState } from "react";
import { RecurringTransactions } from "../components/RecurringTransactions";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { MenuBar } from "../components/MenuBar";
import Ionicons from '@expo/vector-icons/Ionicons';
  
export function RecurringConfigurationPage( {navigation} ) {

    const [selectedTab, setSelectedTab] = useState(1);
    const recurringTransactions = useSelector( state => state.transactions.recurringTransactions );
    const availableMonthlyAmount = useSelector( state => state.transactions.availableMonthlyAmount );
    const availableDailyAmount = useSelector( state => state.transactions.availableDailyAmount );
    const [expensesItems, setExpensesItems] = useState([]);
    const [incomesItems, setIncomesItems] = useState([]);


    useEffect(() => {
        const expenses = recurringTransactions.filter(item => item.amount < 0);
        const incomes = recurringTransactions.filter(item => item.amount > 0);
        setExpensesItems(expenses);
        setIncomesItems(incomes);
    }, [recurringTransactions]);

    useEffect(() =>
        navigation.addListener('beforeRemove', (e) => {
            if (recurringTransactions.length > 0) {
                return;
            }
            // Prevent default behavior of leaving the screen
            e.preventDefault();
        }
    ), [navigation, recurringTransactions]);

    function goHome(): void {
        navigation.navigate('HomePage');
    }

    return (
        <SafeAreaView style={[styles.content]}>

            <View style={[{ flexDirection: "row", justifyContent: "center",}]}>
                <View style={{flex: 1, marginRight: "auto"}}>
                    <Ionicons name="md-arrow-back" size={32} color="#fff" onPress={ () => goHome() } />
                </View>
                <View style={[{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 10, marginLeft: "auto"}]}>
                    <Text style={[styles.white, { fontWeight: "bold", fontSize: 13}]}>Reste à vivre</Text>
                    <Text style={[styles.white, { fontWeight: "bold", fontSize: 20}]}>{availableMonthlyAmount?.toFixed(2)} €</Text>
                    <Text style={[styles.white, { fontSize: 15}]}>{availableDailyAmount?.toFixed(2)} € / jour</Text>

                </View>
                <View style={{ flex: 1, marginLeft: "auto"}} />
            </View>
            

            {/* <View style={[{ justifyContent: "center", alignItems: "center", marginTop: 10}]}>
            </View> */}

            <View style={[{ flexDirection: "row", justifyContent: "center", marginTop: 10}]}>
                <Pressable style={[styles.roundTabButton, selectedTab == 1 ? styles.roundTabButtonSelected : null ]} onPress={ () => setSelectedTab(1) }>
                    <Text style={ styles.roundTabButtonText }>Revenus réguliers</Text>
                </Pressable >
                <Pressable style={[styles.roundTabButton, , selectedTab == 2 ? styles.roundTabButtonSelected : null]} onPress={ () => setSelectedTab(2) }>
                    <Text style={ styles.roundTabButtonText }>Dépenses régulières</Text>
                </Pressable>
            </View>

            { (selectedTab == 1 && incomesItems.length != 0) &&
                <View style={[styles.content, { marginTop: 10 }]}>
                    <RecurringTransactions transactions={incomesItems} isExpense={false} ></RecurringTransactions>
                </View>
            }
            { (selectedTab != 1 && expensesItems.length != 0) &&
                <View style={[styles.content, { marginTop: 10 }]}>
                    <RecurringTransactions transactions={expensesItems} isExpense={true} ></RecurringTransactions>
                </View>
            }

            { (incomesItems.length == 0 && selectedTab == 1) &&
                <View style={[styles.content, { marginTop: 10 }]}>
                    <Text style={ { color: "#fff", fontSize: 25, textAlign: "center", marginLeft: "auto", marginRight: "auto", marginTop: "auto", marginBottom: "auto"} }> Entrez vos revenus régulier mensuel {"\n"} {"\n"} (Salaire, Allocations, ...) {"\n"}{"\n"} ↓</Text>
                </View>
            }
            { (selectedTab != 1 && expensesItems.length == 0) &&
                <View style={[styles.content, { marginTop: 10 }]}>
                    <Text style={ { width: "80%", color: "#fff", fontSize: 25, textAlign: "center", marginLeft: "auto", marginRight: "auto", marginTop: "auto", marginBottom: "auto"} }> Entrez vos dépenses régulières mensuelle {"\n"} {"\n"}(Loyer, Electricité, Internet, ...) {"\n"}{"\n"} ↓</Text>
                </View>
            }

            {/* <View style={[{ flexDirection: "row", justifyContent: "center", marginTop: 10}]}>
                <Pressable style={[styles.roundTabButton, selectedTab == 1 ? styles.roundTabButtonSelected : null ]} onPress={ () => setSelectedTab(1) }>
                    <Text style={ styles.roundTabButtonText }>Revenus réguliers</Text>
                </Pressable >
                <Pressable style={[styles.roundTabButton, , selectedTab == 2 ? styles.roundTabButtonSelected : null]} onPress={ () => setSelectedTab(2) }>
                    <Text style={ styles.roundTabButtonText }>Dépenses régulières</Text>
                </Pressable>
            </View> */}

            <MenuBar navigation={navigation} recurring={true}></MenuBar>

        </SafeAreaView>
    );
}