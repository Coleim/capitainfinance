import { combineReducers } from 'redux';
import { ADD_RECURRING_TRANSACTION, ADD_TRANSACTION, REMOVE_RECURRING_TRANSACTION, REMOVE_TRANSACTION, UPDATE_RECURRING_TRANSACTION, UPDATE_TRANSACTION } from "../actions/transactions";
import * as Crypto from 'expo-crypto';
import { INSERT_SAVING } from '../actions/savings';
import { Transaction } from '../models/transaction';
import { date } from '../services/DateAsString';
import { RESET_STORE, SET_TODAY } from '../actions/global';

// https://stackoverflow.com/questions/72748846/modify-android-gradle-properties-in-expo-managed-app

const today = new Date();
const initialStateRecurringTransactions = {
    today: undefined,
    recurringTransactions: [],
    currentMonthDailyTransactions: [{ amount: -10, category: "TEST", date: new Date(today.getFullYear(), today.getMonth()-1, 25), isReccuring: false, label: "Test VIEUX", owner_id: "123", transaction_id: "0b9b2727-10b4-40bc-a435-6e73f5007131"}],
    pastDailyTransactions: [],
    totalExpenses: 0,
    totalIncomes: 0,
    availableMonthlyAmount: 0, // Montant disponible pour le mois
    availableDailyAmount: 0, // Montant disponible journalier : availableMonthlyAmount divisé par le nombre de jours du mois
    spentPerDay: [], // Montant dépensé chaque jour, ce mois.
    theoriticalAvailableAmountPerDay: [], // Montant disponible théorique, chaque jour : availableMonthlyAmount - availableDailyAmount x jour
    realAvailableAmountPerDay: [], // Montant disponible réel, chaque jour, jusqu'au jour courant : availableMonthlyAmount - sum(spentPerDay[i] , i < jour)
}

const getRealAvailableAmountPerDay = (availableMonthlyAmount: number, spentPerDay: number[], today: Date | undefined) : number[] => {
    let realAvailableAmountPerDay = [];
    let stackedAvailableAmountPerDay = Number(availableMonthlyAmount);
    if(today) {
        for (let i = 0; i < today.getDate(); ++i) {
            if(spentPerDay.length > i ) {
                stackedAvailableAmountPerDay = Number(stackedAvailableAmountPerDay) + Number(spentPerDay[i]);
                realAvailableAmountPerDay.push(stackedAvailableAmountPerDay);
            } else {
                realAvailableAmountPerDay.push(stackedAvailableAmountPerDay);
            }
        }
    }
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

function calculateSpendPerDay(today: Date, currentMonthTransactions: Transaction[]): number[] {
    let spentPerDay: number[] = [];
    for (let i = 0; i < today.getDate(); ++i) {
        if(spentPerDay.length <= i) {
            spentPerDay.push(Number(0));
        }
    }
    currentMonthTransactions.forEach((transaction: Transaction) => {
        if(transaction.date) {
            const transactionDate = new Date(transaction.date);
            if (transactionDate.getMonth() === today.getMonth() && transactionDate.getFullYear() === today.getFullYear()) {
                spentPerDay[transactionDate.getDate() - 1] += transaction.amount;
            }
        }
    });
    return spentPerDay;
}



const transactions = (state = initialStateRecurringTransactions, action: any) => {
    if(action.type !== SET_TODAY && !state.today) {
        return state;
    }
    const today: Date = action.today ?? state.today;
    const numberOfDaysInMonth = date.GetNumberOfDaysInCurrentMonth(today);
    let realAvailableAmountPerDay = [];
    let spentPerDay = [];
    
    switch (action.type) {
        case SET_TODAY:
            const currentMonthTransactions = state.currentMonthDailyTransactions.filter((transaction) => { 
                const d = new Date(transaction.date);
                return d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
            });
            const pastTransactions = state.currentMonthDailyTransactions.filter((transaction) => {
                const d = new Date(transaction.date);
                d.getMonth() !== today.getMonth() || d.getFullYear() !== today.getFullYear();
            });
            spentPerDay = calculateSpendPerDay(today, currentMonthTransactions);
            return {
                ...state,
                today: action.today,
                currentMonthDailyTransactions: currentMonthTransactions,
                pastDailyTransactions: pastTransactions,
                spentPerDay: spentPerDay,
                realAvailableAmountPerDay: getRealAvailableAmountPerDay(state.availableMonthlyAmount, spentPerDay, today)
            }
        case ADD_RECURRING_TRANSACTION: {
            const newRecurringTransactions = [...state.recurringTransactions, action.transaction];
            const availableMonthlyAmount = state.availableMonthlyAmount + action.transaction.amount;
            const availableDailyAmount = Number((availableMonthlyAmount / numberOfDaysInMonth));
            let theoriticalAvailableAmountPerDay = [];
            for (let i = 1; i <= numberOfDaysInMonth; ++i) {
                theoriticalAvailableAmountPerDay.push(Number(availableMonthlyAmount - (i * availableDailyAmount)));
            }
            return {
                ...state,
                recurringTransactions: newRecurringTransactions,
                availableMonthlyAmount: availableMonthlyAmount,
                availableDailyAmount: availableDailyAmount,
                theoriticalAvailableAmountPerDay: theoriticalAvailableAmountPerDay,
                realAvailableAmountPerDay: getRealAvailableAmountPerDay(availableMonthlyAmount, state.spentPerDay, state.today)
            }
        }
        case UPDATE_RECURRING_TRANSACTION: {
            const updatedTransaction: Transaction = action.transaction;
            const recurringTransactions = state.recurringTransactions.map((transaction: Transaction) => {
                if (transaction.transaction_id === updatedTransaction.transaction_id) {
                    return {
                        ...transaction,
                        label: updatedTransaction.label,
                        amount: updatedTransaction.amount,
                        category: updatedTransaction.category,
                        isReccuring: true
                    }
                } else {
                    return transaction;
                }
            });
            const totalExpenses = recurringTransactions.reduce((acc, transaction) => {
                return transaction.amount < 0 ? acc + transaction.amount : acc;
            }, 0);
            const totalIncomes = recurringTransactions.reduce((acc, transaction) => {
                return transaction.amount > 0 ? acc + transaction.amount : acc;
            }, 0);
            const availableMonthlyAmount = totalExpenses + totalIncomes;
            const availableDailyAmount = Number((availableMonthlyAmount / numberOfDaysInMonth));
            let theoriticalAvailableAmountPerDay = [];
            for (let i = 1; i <= numberOfDaysInMonth; ++i) {
                theoriticalAvailableAmountPerDay.push(Number(availableMonthlyAmount - (i * availableDailyAmount)));
            }
            return {
                ...state,
                recurringTransactions: recurringTransactions,
                availableMonthlyAmount: availableMonthlyAmount,
                availableDailyAmount: availableDailyAmount,
                theoriticalAvailableAmountPerDay: theoriticalAvailableAmountPerDay,
                realAvailableAmountPerDay: getRealAvailableAmountPerDay(availableMonthlyAmount, state.spentPerDay, today)
            };
        }
        case REMOVE_RECURRING_TRANSACTION: {
            const recurringTransactions: Transaction[] = state.recurringTransactions.filter(
                (transaction: Transaction) => transaction.transaction_id !== action.transaction.transaction_id
            );
            const availableMonthlyAmount = recurringTransactions.reduce( (total, transaction) => total + transaction.amount, 0 );
            const availableDailyAmount = Number((availableMonthlyAmount / numberOfDaysInMonth));
            let theoriticalAvailableAmountPerDay = [];
            for (let i = 1; i <= numberOfDaysInMonth; ++i) {
                theoriticalAvailableAmountPerDay.push(Number(availableMonthlyAmount - (i * availableDailyAmount)));
            }
            return {
                ...state,
                recurringTransactions: recurringTransactions,
                availableMonthlyAmount,
                availableDailyAmount,
                theoriticalAvailableAmountPerDay,
                realAvailableAmountPerDay: getRealAvailableAmountPerDay(availableMonthlyAmount, state.spentPerDay, state.today),
            };
        }
        case ADD_TRANSACTION: {
            let newCurrentMonthDailyTransactions = [...state.currentMonthDailyTransactions];
            if(action.transaction.date) {
                const actionDate = action.transaction.date as Date;
                if (actionDate.getMonth() === today.getMonth() && actionDate.getFullYear() === today.getFullYear()) {
                    newCurrentMonthDailyTransactions.push(action.transaction);
                }
            }
            spentPerDay = calculateSpendPerDay(today, newCurrentMonthDailyTransactions);
            return {
                ...state,
                currentMonthDailyTransactions: newCurrentMonthDailyTransactions,
                spentPerDay: spentPerDay,
                realAvailableAmountPerDay: getRealAvailableAmountPerDay(state.availableMonthlyAmount, spentPerDay, today)
            }
            // spentPerDay = fillSpendPerDay(today, state.spentPerDay);
            // if(action.transaction.date) {
            //     const actionDate = action.transaction.date as Date;
            //     if (actionDate.getMonth() === today.getMonth() && actionDate.getFullYear() === today.getFullYear()) {
            //         if(actionDate.getDate() > today.getDate()) {
            //             spentPerDay[today.getDate()-1] = Number(spentPerDay[today.getDate()-1]) + action.transaction.amount;
            //         } else {
            //             spentPerDay[actionDate.getDate()-1] = Number(spentPerDay[actionDate.getDate()-1]) + action.transaction.amount;
            //         }
            //     } else {
            //         // Add to past transactions ?? 
            //         return state;
            //     }
            // } else {
            //     spentPerDay[today.getDate()-1] = Number(spentPerDay[today.getDate()-1]) + action.transaction.amount;
            // }
        }
        case UPDATE_TRANSACTION: {
            const updatedTransaction = action.transaction;
            const updatedTransactionList = state.currentMonthDailyTransactions.map((transaction) => {
                if (transaction.transaction_id === updatedTransaction.transaction_id) {
                    return {
                        ...transaction,
                        label: updatedTransaction.label,
                        amount: updatedTransaction.amount,
                        category: updatedTransaction.category
                    }
                } else {
                    return transaction;
                }
            });
        
            // const updatedSpentPerDay = fillSpendPerDay(today, []);
            // updatedTransactionList.forEach((transaction: Transaction) => {
            //     if(transaction.date) {
            //         const transactionDate = new Date(transaction.date);
            //         if (transactionDate.getMonth() === today.getMonth() && transactionDate.getFullYear() === today.getFullYear()) {
            //             updatedSpentPerDay[transactionDate.getDate() - 1] += transaction.amount;
            //         }
            //     }
            // });
            const updatedSpentPerDay = calculateSpendPerDay(today, updatedTransactionList);
            const updatedRealAvailableAmountPerDay = getRealAvailableAmountPerDay(state.availableMonthlyAmount, updatedSpentPerDay, today);
            
            return {
                ...state,
                currentMonthDailyTransactions: updatedTransactionList,
                spentPerDay: updatedSpentPerDay,
                realAvailableAmountPerDay: updatedRealAvailableAmountPerDay,
            };
        }
        case REMOVE_TRANSACTION: {
            const removedTransaction = action.transaction;
            const updatedTransactionList = state.currentMonthDailyTransactions.filter(t => t.transaction_id !== removedTransaction.transaction_id);

            // const updatedSpentPerDay = fillSpendPerDay(today, []);
            // transactions.forEach((transaction) => {
            //     if(transaction.date) {
            //         const transactionDate = new Date(transaction.date);
            //         if (transactionDate.getMonth() === today.getMonth() && transactionDate.getFullYear() === today.getFullYear()) {
            //             updatedSpentPerDay[transactionDate.getDate() - 1] += transaction.amount;
            //         }
            //     }
            // });
            
            const updatedSpentPerDay = calculateSpendPerDay(today, updatedTransactionList);
            const updatedRealAvailableAmountPerDay = getRealAvailableAmountPerDay(state.availableMonthlyAmount, updatedSpentPerDay, today);
            return {
                ...state,
                currentMonthDailyTransactions: updatedTransactionList,
                spentPerDay: updatedSpentPerDay,
                realAvailableAmountPerDay: updatedRealAvailableAmountPerDay,
            };
        }
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