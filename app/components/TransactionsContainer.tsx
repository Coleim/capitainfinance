import { StyleSheet, View, Text} from "react-native";
import { useCallback, useState } from "react";
import { database } from "../services/DbServices";
import { useFocusEffect } from "@react-navigation/native";
import { AmountSummary } from '../components/AmountSummary';
import { BurndownChart } from '../components/BurndownChart';
import { LatestTransactions } from '../components/LatestTransactions';
import { MenuBar } from "./MenuBar";
import { Transaction } from "../models/transaction";
import { useSelector } from "react-redux";

export function TransactionsContainer( {navigation} ) {

    const recurringTransactions = useSelector( state => state.recurringTransactions);
    const remainingRecurringMonthlyAmount = useSelector( state => state.remainingRecurringMonthlyAmount);
    

    // const [remainingAmount, setRemainingAmount] = useState(0);
    // const [amountPerDay, setAmountPerDay] = useState(0);
    // const [monthlyAmountSpent, setMonthlyAmountSpent] = useState(0);
    // const [expectedRemainingAmountPerDay, setExpectedRemainingAmountPerDay] = useState([]);
    // const [realRemainingAmountPerDay, setRealRemainingAmountPerDay] = useState([]);
    // const [dailyTransactions, setDailyTransactions] = useState([]);

    // const getRemainingAmount = async () => {        
    //     const monthlyAmountSpent = await database.GetMonthlyAmountSpent();
    //     setMonthlyAmountSpent(monthlyAmountSpent);
    //     const dailyTransactions = await database.GetDailyTransactions();
    //     setDailyTransactions(dailyTransactions);
    //     const remainingAmount = Number(await database.GetRemainingMonthlyAmount());
    //     setRemainingAmount(remainingAmount);
    //     const dailyAmount = await database.GetDailyAmount();

    //     let today = new Date();
    //     let numberOfDays = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    //     const amountPerDay = Number((remainingAmount / numberOfDays).toFixed(2));
    //     setAmountPerDay(amountPerDay);

    //     let remainingAmountPerDay = [];
    //     let realRemainingAmountPerDay = [];
    //     for (let i = 0; i < numberOfDays; ++i) {
    //         remainingAmountPerDay.push(remainingAmount - (i * amountPerDay));
    //     }

    //     let dailyTransactionsIndex = 0;
    //     let stackedRemainingAmountPerDay = remainingAmount;
    //     for (let i = 0; i < today.getDate(); ++i) {
    //         const trans = dailyAmount[dailyTransactionsIndex];
    //         if (trans?.date.getDate() == i + 1) {
    //             ++dailyTransactionsIndex;
    //             stackedRemainingAmountPerDay = stackedRemainingAmountPerDay + Number(trans.amount);
    //             realRemainingAmountPerDay.push(stackedRemainingAmountPerDay);
    //         } else {
    //             realRemainingAmountPerDay.push(stackedRemainingAmountPerDay);
    //         }
    //     }
    //     setExpectedRemainingAmountPerDay(remainingAmountPerDay);
    //     setRealRemainingAmountPerDay(realRemainingAmountPerDay);
    // }

    useFocusEffect(
        useCallback(() => {
            // getRemainingAmount();
            return () => { };
        }, [])
    );

    return (
        <View style={{ flex: 1, justifyContent: "center"}}>
            <AmountSummary />
            <BurndownChart />
            <MenuBar navigation={navigation}></MenuBar>
             {/* <AmountSummary 
                remainingAmount={remainingAmount} 
                amountPerDay={amountPerDay}
                monthlyAmountSpent={monthlyAmountSpent}
                expectedRemainingAmountPerDay={expectedRemainingAmountPerDay}
                realRemainingAmountPerDay={realRemainingAmountPerDay} /> */}
            {/*<BurndownChart
                expectedRemainingAmountPerDay={expectedRemainingAmountPerDay}
                realRemainingAmountPerDay={realRemainingAmountPerDay} />
            <LatestTransactions dailyTransactions={dailyTransactions} />
            <MenuBar navigation={navigation}></MenuBar> */}
        </View>
    );
}

