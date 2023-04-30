import { combineReducers } from 'redux';
import { ADD_RECURRING_TRANSACTION, ADD_TRANSACTION, RESET_STORE, TransactionAction, UPDATE_RECURRING_TRANSACTION } from "../actions/transactions";
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


// const recurringTransactions = useSelector( state => state.recurringTransactions);
// const remainingRecurringMonthlyAmount = useSelector( state => state.remainingRecurringMonthlyAmount);

const initialStateRecurringTransactions = {
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


const getRealAvailableAmountPerDay = (availableMonthlyAmount: number, spentPerDay: number[]) : number[] => {
    const today = new Date();
    let realAvailableAmountPerDay = [];
    let stackedAvailableAmountPerDay = availableMonthlyAmount;
    console.log("spentPerDay: ", spentPerDay)
    console.log("stackedAvailableAmountPerDay: ", stackedAvailableAmountPerDay)
    console.log("availableMonthlyAmount: ", availableMonthlyAmount)
    for (let i = 0; i < today.getDate(); ++i) {
        if(spentPerDay.length > i ) {
            stackedAvailableAmountPerDay = stackedAvailableAmountPerDay + Number(spentPerDay.at(i));
            realAvailableAmountPerDay.push(stackedAvailableAmountPerDay);
        } else {
            realAvailableAmountPerDay.push(stackedAvailableAmountPerDay);
        }
    }
    console.log("getRealAvailableAmountPerDay: ", realAvailableAmountPerDay)
    return realAvailableAmountPerDay;
}

const transactions = (state = initialStateRecurringTransactions, action) => {
    console.log(">>>>>>>>>>>>>>>   recurringTransactions <<<<<<<<<<<<<<<<<<<<<<")
    console.log("STATE: " , state)
    console.log("ACTION: " , action)
    const today = new Date();
    const numberOfDaysInMonth = date.GetNumberOfDaysInCurrentMonth();
    let realAvailableAmountPerDay = [];
    
    switch (action.type) {
        case ADD_RECURRING_TRANSACTION:
            // return initialStateRecurringTransactions;
            const availableMonthlyAmount = state.availableMonthlyAmount + action.transaction.amount;
            const availableDailyAmount = Number((availableMonthlyAmount / numberOfDaysInMonth).toFixed(2));
            let theoriticalAvailableAmountPerDay = [];
            for (let i = 1; i <= numberOfDaysInMonth; ++i) {
                theoriticalAvailableAmountPerDay.push(Number(availableMonthlyAmount - (i * availableDailyAmount)).toFixed(2));
            }

            realAvailableAmountPerDay = getRealAvailableAmountPerDay(availableMonthlyAmount, state.spentPerDay);
            // const realAvailableAmountPerDay = [];
            // let stackedAvailableAmountPerDay = availableMonthlyAmount;
            // for (let i = 0; i < today.getDate(); ++i) {
            //     if(state.spentPerDay.length > i ) {
            //         stackedAvailableAmountPerDay = stackedAvailableAmountPerDay + Number(state.spentPerDay.at(i));
            //         realAvailableAmountPerDay.push(stackedAvailableAmountPerDay);
            //     } else {
            //         realAvailableAmountPerDay.push(stackedAvailableAmountPerDay);
            //     }
            // }

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
                realAvailableAmountPerDay: realAvailableAmountPerDay
            }
        case ADD_TRANSACTION:
            let spentPerDay = [...state.spentPerDay];
            for (let i = 0; i < today.getDate(); ++i) {
                if(spentPerDay.length <= i) {
                    spentPerDay.push(0);
                }
            }
            
            if(action.transaction.date) {
                const actionDate = action.transaction.date as Date;
                if(actionDate.getDate() > today.getDate()) {
                    spentPerDay[today.getDate()-1] = spentPerDay.at(today.getDate()-1) + action.transaction.amount;
                } else {
                    spentPerDay[actionDate.getDate()-1] = spentPerDay.at(actionDate.getDate()-1) + action.transaction.amount;
                }
            } else {
                spentPerDay[today.getDate()-1] = spentPerDay.at(today.getDate()-1) + action.transaction.amount;
            }

            realAvailableAmountPerDay = getRealAvailableAmountPerDay(state.availableMonthlyAmount, spentPerDay);
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
                return initialStateRecurringTransactions
        default:
            return state;
    }
}

// const remainingRecurringMonthlyAmount = (state = 0, action) => {
//     console.log(">>>>>>>>>>>>>>>   remainingRecurringMonthlyAmount <<<<<<<<<<<<<<<<<<<<<<")
//     console.log("STATE: " , state)
//     console.log("ACTION: " , action)
//     switch (action.type) {
//         case ADD_RECURRING_TRANSACTION:
//             return state + action.transaction.amount;
//             return 0; 
//         case UPDATE_RECURRING_TRANSACTION:
//             return state;
//         default:
//             return state;
//     }
// }

const testRed = (state = 0, action) => {
    console.log(">>>>>>>>>>>>>>>   testRed <<<<<<<<<<<<<<<<<<<<<<")
    console.log("STATE: " , state)
    console.log("ACTION: " , action)
    switch (action.type) {
        case ADD_RECURRING_TRANSACTION:
            return state + action.transaction.amount;
            return 0; 
        case UPDATE_RECURRING_TRANSACTION:
            return state;
        default:
            return state;
    }
}


// export const GetRemainingMonthlyAmount = async () => {
//     let remainingMonthlyAmount = 0;
//     await db.transaction(async connection => {
//         const res = await connection.execute(`SELECT amount FROM recurring ;`);
//         res.rows.forEach(row => {
//             remainingMonthlyAmount += Number(row.amount)
//         });
//     });
//     return remainingMonthlyAmount.toFixed(2);
// }

const reducers = combineReducers({
    transactions,
    testRed
});

console.log(">> RED: " , reducers)

export default reducers;
