import { View, Text, Pressable } from "react-native";
import { styles } from '../../styles';
import { useEffect, useState } from "react";
// import { database } from "../services/DbServices";
import { RecurringTransactions } from "../components/RecurringTransactions";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

  
export function RecurringConfigurationPage( {navigation} ) {

    const [selectedTab, setSelectedTab] = useState(1);
    const recurringTransactions = useSelector( state => state.transactions.recurringTransactions.list );
    const [expensesItems, setExpensesItems] = useState([]);
    const [incomesItems, setIncomesItems] = useState([]);


    useEffect(() => {
        const expenses = recurringTransactions.filter(item => item.amount < 0);
        const incomes = recurringTransactions.filter(item => item.amount > 0);
        setExpensesItems(expenses);
        setIncomesItems(incomes);
    }, [recurringTransactions]);  

    function addNewTransaction(): void {
        let isExpense = selectedTab == 2;
        navigation.navigate('EditTransactionItemPage', { item: null, isExpense, recurring: true } );
    }

    function back(): void {
        navigation.navigate('HomePage');
    }

    return (
        <SafeAreaView style={[styles.content]}>
            <View style={[{ flexDirection: "row", justifyContent: "center", marginTop: 20}]}>
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
            
            <View style={ styles.vCenterContent }>
                <Pressable style={styles.roundTabButton} onPress={ () => addNewTransaction() }>
                    { selectedTab == 1 ? 
                        <Text style={ styles.actionText }> Ajouter un revenu régulier </Text> : 
                        <Text style={ styles.actionText }> Ajouter une dépense régulière </Text>
                    }
                </Pressable>
            </View>

            <View style={ styles.vCenterContent }>
                { (expensesItems.length != 0 || incomesItems.length != 0) &&
                    <Pressable style={[styles.roundTabButton, {backgroundColor: "#fff" }]} onPress={ () => back() }>
                        <Text style={ styles.actionText }> Retour </Text>
                    </Pressable>
                }
            </View>
        </SafeAreaView>
    );
}