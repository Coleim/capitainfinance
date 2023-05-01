import { combineReducers } from 'redux';
import { ADD_RECURRING_TRANSACTION, ADD_TRANSACTION, RESET_STORE, SET_TODAY, TransactionAction, UPDATE_RECURRING_TRANSACTION } from "../actions/transactions";
import * as Crypto from 'expo-crypto';
import { database } from '../services/DbServices';
import { INSERT_SAVING } from '../actions/savings';
import { Transaction } from '../models/transaction';
import { date } from '../services/DateAsString';

// https://stackoverflow.com/questions/72748846/modify-android-gradle-properties-in-expo-managed-app


function clementSettings() {
    
    let recurringTransactionsInitMap = new Map<string, Transaction>();
    let UUID = Crypto.randomUUID();
    recurringTransactionsInitMap.set(UUID, {transaction_id: UUID, owner_id: '123', label: 'Salaire Clement', amount: 3100, category: 'SALAIRE', isReccuring: true });
    // 5227,85
    UUID = Crypto.randomUUID();
    recurringTransactionsInitMap.set(UUID, {transaction_id: UUID, owner_id: '123', label: 'Salaire Sybille', amount: 1700, category: 'SALAIRE', isReccuring: true });
    //=> 1759,39
    //=> 30,21
    UUID = Crypto.randomUUID();
    recurringTransactionsInitMap.set(UUID, {transaction_id: UUID, owner_id: '123', label: 'CAF Mi temps', amount: 297, category: 'ALLOCATIONS', isReccuring: true });
    UUID = Crypto.randomUUID();
    recurringTransactionsInitMap.set(UUID, {transaction_id: UUID, owner_id: '123', label: 'CAF Nounou', amount: 188, category: 'ALLOCATIONS', isReccuring: true });
    console.log(">>>>>>>> recurringTransactionsInitMap " , recurringTransactionsInitMap)
    return recurringTransactionsInitMap;
}


const initialStateRecurringTransactions = {
    today: undefined,
    recurringTransactions: {
        list: [],
        totalExpenses: 0,
        totalIncomes: 0,
    },
    currentMonthDailyTransactions: {
        list: [],
        totalExpenses: 0,
        totalIncomes: 0,
    },
    allDailyTransactions: {
        list: [],
        totalExpenses: 0,
        totalIncomes: 0,
    },
    totalExpenses: 0,
    totalIncomes: 0,
    availableMonthlyAmount: 0, // Montant disponible pour le mois
    availableDailyAmount: 0, // Montant disponible journalier : availableMonthlyAmount divisé par le nombre de jours du mois
    spentPerDay: [], // Montant dépensé chaque jour, ce mois.
    theoriticalAvailableAmountPerDay: [], // Montant disponible théorique, chaque jour : availableMonthlyAmount - availableDailyAmount x jour
    realAvailableAmountPerDay: [], // Montant disponible réel, chaque jour, jusqu'au jour courant : availableMonthlyAmount - sum(spentPerDay[i] , i < jour)
}



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

    //     let realRemainingAmountPerDay = [];
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
    //     setRealRemainingAmountPerDay(realRemainingAmountPerDay);
    // }


const getRealAvailableAmountPerDay = (availableMonthlyAmount: number, spentPerDay: number[], today: Date | undefined) : number[] => {    
    let realAvailableAmountPerDay = [];
    let stackedAvailableAmountPerDay = Number(availableMonthlyAmount);
    console.log(stackedAvailableAmountPerDay)
    if(today) {
        for (let i = 0; i < today.getDate(); ++i) {
            if(spentPerDay.length > i ) {
                console.log("AH ? before " , stackedAvailableAmountPerDay)
                console.log("AH ? Number(spentPerDay[i]) " , Number(spentPerDay[i]))
                stackedAvailableAmountPerDay = Number(stackedAvailableAmountPerDay) + Number(spentPerDay[i]);
                realAvailableAmountPerDay.push(stackedAvailableAmountPerDay);
                console.log("AH ? " , stackedAvailableAmountPerDay)
            } else {
                realAvailableAmountPerDay.push(stackedAvailableAmountPerDay);
                console.log(stackedAvailableAmountPerDay)
            }
        }
    }
    console.log(realAvailableAmountPerDay)
    return realAvailableAmountPerDay;
}

const fillSpendPerDay = (today: Date, iSpent: number[]) => {    
    let spentPerDay = [...iSpent];
    for (let i = 0; i < today.getDate(); ++i) {
        if(spentPerDay.length <= i) {
            spentPerDay.push(Number(0));
        }
    }
    return spentPerDay
}

const transactions = (state = initialStateRecurringTransactions, action: any) => {
    console.log(">>>>>>>>>>>>>>>   recurringTransactions <<<<<<<<<<<<<<<<<<<<<<")
    console.log("STATE: " , state)
    console.log("ACTION: " , action)
    if(action.type !== SET_TODAY && !state.today) {
        return state;
    }
    const today: Date = action.today ?? state.today;
    const numberOfDaysInMonth = date.GetNumberOfDaysInCurrentMonth(today);
    let realAvailableAmountPerDay = [];
    let spentPerDay = [];
    
    switch (action.type) {
        case SET_TODAY:
            spentPerDay = fillSpendPerDay(today, state.spentPerDay);
            return {
                ...state,
                today: action.today,
                spentPerDay: spentPerDay,
                realAvailableAmountPerDay: getRealAvailableAmountPerDay(state.availableMonthlyAmount, spentPerDay, today)
            }
        case ADD_RECURRING_TRANSACTION:
            const availableMonthlyAmount = state.availableMonthlyAmount + action.transaction.amount;
            const availableDailyAmount = Number((availableMonthlyAmount / numberOfDaysInMonth));
            let theoriticalAvailableAmountPerDay = [];
            for (let i = 1; i <= numberOfDaysInMonth; ++i) {
                theoriticalAvailableAmountPerDay.push(Number(availableMonthlyAmount - (i * availableDailyAmount)));
            }
            return {
                ...state,
                recurringTransactions: {
                    list: [...state.recurringTransactions.list, action.transaction],
                    totalExpenses: action.transaction.amount<0 ? state.recurringTransactions.totalExpenses + action.transaction.amount : state.recurringTransactions.totalExpenses,
                    totalIncomes: action.transaction.amount>0 ? state.recurringTransactions.totalIncomes + action.transaction.amount : state.recurringTransactions.totalIncomes,
                },
                totalExpenses: action.transaction.amount<0 ? state.totalExpenses + action.transaction.amount : state.totalExpenses,
                totalIncomes: action.transaction.amount>0 ? state.totalIncomes + action.transaction.amount : state.totalIncomes,
                availableMonthlyAmount: availableMonthlyAmount,
                availableDailyAmount: availableDailyAmount,
                theoriticalAvailableAmountPerDay: theoriticalAvailableAmountPerDay,
                realAvailableAmountPerDay: getRealAvailableAmountPerDay(availableMonthlyAmount, state.spentPerDay, state.today)
            }
        case ADD_TRANSACTION:
            spentPerDay = fillSpendPerDay(today, state.spentPerDay);
            if(action.transaction.date) {
                const actionDate = action.transaction.date as Date;
                if(actionDate.getDate() > today.getDate()) {
                    spentPerDay[today.getDate()-1] = Number(spentPerDay[today.getDate()-1]) + action.transaction.amount;
                } else {
                    spentPerDay[actionDate.getDate()-1] = Number(spentPerDay[actionDate.getDate()-1]) + action.transaction.amount;
                }
            } else {
                spentPerDay[today.getDate()-1] = Number(spentPerDay[today.getDate()-1]) + action.transaction.amount;
            }
            realAvailableAmountPerDay = getRealAvailableAmountPerDay(state.availableMonthlyAmount, spentPerDay, today);
            return {
                ...state,
                currentMonthDailyTransactions: {
                    list: [...state.currentMonthDailyTransactions.list, action.transaction],
                    totalExpenses: action.transaction.amount<0 ? state.currentMonthDailyTransactions.totalExpenses + action.transaction.amount : state.currentMonthDailyTransactions.totalExpenses,
                    totalIncomes: action.transaction.amount>0 ? state.currentMonthDailyTransactions.totalIncomes + action.transaction.amount : state.currentMonthDailyTransactions.totalIncomes,
                },
                totalExpenses: action.transaction.amount<0 ? state.totalExpenses + action.transaction.amount : state.totalExpenses,
                totalIncomes: action.transaction.amount>0 ? state.totalIncomes + action.transaction.amount : state.totalIncomes,
                spentPerDay: spentPerDay,
                realAvailableAmountPerDay: realAvailableAmountPerDay
            }
            
        case UPDATE_RECURRING_TRANSACTION:
            return state;
        case RESET_STORE:
            spentPerDay = fillSpendPerDay(today, []);
            return {
                ...initialStateRecurringTransactions,
                today: action.today,
                spentPerDay: spentPerDay,
                realAvailableAmountPerDay: getRealAvailableAmountPerDay(state.availableMonthlyAmount, spentPerDay, today)
            }
        default:
            return initialStateRecurringTransactions;
    }
}

const reducers = combineReducers({
    transactions
});

export default reducers;
