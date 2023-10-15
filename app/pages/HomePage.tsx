import { Button, StyleSheet, View, Modal, Text } from "react-native";
import { styles } from '../../styles';
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TransactionsContainer } from "../components/TransactionsContainer";
import { useDispatch, useSelector } from "react-redux";
import { setToday } from "../actions/global";
import { date } from "../services/DateAsString";
import { insertSaving } from "../actions/savings";
import { addTransaction } from "../actions/transactions";

export const HomePage = ({ navigation }) => {
   
    const dispatch = useDispatch();
    const recurringTransactions = useSelector( state => state.transactions.recurringTransactions );
    const allTransactionPerMonth = useSelector( state => state.transactions.allTransactionPerMonth );
    const savings = useSelector( state => state.savings );
    const [savingsModalVisible, setSavingsModalVisible] = useState(false);
    const [currentSaving, setCurrentSaving] = useState(0);
    const [lastMonth, setLastMonth] = useState(new Date());

    const computeSaving = (recTrans: [], dailyTrans: []) => {
        const totalRecurring = recTrans.reduce((acc, transaction) => { return acc + transaction.amount; }, 0);
        const totalDaily = dailyTrans.reduce((acc, transaction) => { return acc + transaction.amount; }, 0);
        return totalRecurring + totalDaily;
    }
    
    useEffect(() => {
        if (recurringTransactions.length === 0) {
          navigation.navigate('RecurringConfigurationPage');
        }
    }, [recurringTransactions]);

    useEffect(() => {
        // const today = new Date();
        // const futureDate = new Date(today.getFullYear(), today.getMonth(), 15)
        dispatch(setToday(new Date()));
        // dispatch(setToday(futureDate));
        let lastMonth = new Date();
        lastMonth.setDate(1);
        lastMonth.setMonth(lastMonth.getMonth()-1);
        const lastMonthKey = date.GetMonthKey(lastMonth);
        setLastMonth(lastMonth);
        if(!savings[lastMonthKey] && allTransactionPerMonth[lastMonthKey] && 
            allTransactionPerMonth[lastMonthKey].recurringTransactions && allTransactionPerMonth[lastMonthKey].dailyTransactions) {
                const recTrans = allTransactionPerMonth[lastMonthKey].recurringTransactions;
                const dailyTrans = allTransactionPerMonth[lastMonthKey].dailyTransactions;
            const saving = computeSaving(recTrans, dailyTrans);
            setCurrentSaving(saving);
            setSavingsModalVisible(true);
        }


        
        // dispatch(setToday(futureDate));
        // dispatch(resetStore(new Date()));
        // const today = new Date();
        // const pastDate = new Date(today.getFullYear(), today.getMonth(), 8)
        // dispatch(addTransaction('Salaire Clement', 3100, 'SALAIRE', undefined, true));
        // dispatch(addTransaction('Casino', -23.25, 'TEST', new Date(today.getFullYear(), today.getMonth(), 5)));
        // dispatch(addTransaction('Livres', -65.02, 'TEST', new Date(today.getFullYear(), today.getMonth(), 10)));
        // dispatch(addTransaction('Révision Voiture', -150, 'TEST', new Date(today.getFullYear(), today.getMonth(), 10)));
        // dispatch(addTransaction('Essence', -51.5, 'TEST', new Date(today.getFullYear(), today.getMonth(), 11)));
        // dispatch(addTransaction('Casino', -51.5, 'TEST', new Date(today.getFullYear(), today.getMonth(), 12)));
        // dispatch(addTransaction('Amazon', -51.5, 'TEST', new Date(today.getFullYear(), today.getMonth(), 13)));
        // dispatch(addTransaction('Test PAST', -51.5, 'TEST', new Date(today.getFullYear(), today.getMonth(), 14)));
    }, []);

    function onUserCloseSavingModal() {
        setSavingsModalVisible(false);
        dispatch(insertSaving(lastMonth, currentSaving));
    }

    return (
        <SafeAreaView style={[styles.content]}>
            <View style={{ flex: 1}}>
              <TransactionsContainer navigation={navigation}></TransactionsContainer>
              <Modal
                  animationType="slide"
                  transparent={true}
                  visible={savingsModalVisible}
                  onRequestClose={() => { setSavingsModalVisible(!savingsModalVisible); }}>
                  <View style={modalStyles.centeredView}>
                      <View style={modalStyles.modalView}>
                      { currentSaving >= 0 ? 
                          <>
                          <Text style={modalStyles.modalHeader}>Félcitation !</Text>
                          <Text style={modalStyles.modalText}> En {date.GetMonthAsString(lastMonth)}, vous avez pu mettre de coté {currentSaving.toFixed(2)} € </Text></>
                          :
                          <><Text style={modalStyles.modalHeader}>Attention !</Text>
                          <Text style={modalStyles.modalText}>Pour le mois de {date.GetMonthAsString(lastMonth)}, vous êtes en déficit de {currentSaving.toFixed(2)} € </Text></>
                      }
                        <View style={ {flexDirection: "row", justifyContent: "center"}}>
                            <Button onPress={ onUserCloseSavingModal } title="Fermer" color="#2ec4b6" />
                        </View>
                      </View>
                  </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
}

const modalStyles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    modalHeader: {
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20
    },
  });