import { Transaction } from "../models/transaction";
import * as Crypto from 'expo-crypto';

export const ADD_RECURRING_TRANSACTION = 'ADD_RECURRING_TRANSACTION';
export const UPDATE_RECURRING_TRANSACTION = 'UPDATE_RECURRING_TRANSACTION';
export const REMOVE_RECURRING_TRANSACTION = 'REMOVE_RECURRING_TRANSACTION';

export const ADD_TRANSACTION = 'ADD_TRANSACTION';
export const UPDATE_TRANSACTION = 'UPDATE_TRANSACTION';
export const REMOVE_TRANSACTION = 'REMOVE_TRANSACTION';

export const RESET_STORE = 'RESET_STORE';


export const SET_TODAY = 'SET_TODAY';

export interface TransactionAction {
    type: string;
    transaction: Transaction;
};


export const updateTransaction = (transaction: Transaction, label: string, amount: number) => ({ 
    type: transaction.isReccuring ? UPDATE_RECURRING_TRANSACTION : UPDATE_TRANSACTION, 
    transaction: {
        ...transaction,
        label,
        amount
    } });

export const addTransaction = (label: string, amount: number, category: string, date: Date = new Date(), recurring: boolean = false) => ({ 
    type: recurring ? ADD_RECURRING_TRANSACTION : ADD_TRANSACTION, 
    transaction: { 
        transaction_id: Crypto.randomUUID(),
        owner_id: '123', // how to handle that ??
        label,
        amount,
        category,
        date,
        isReccuring: recurring
    }
});

export const removeTransaction = (transaction: Transaction) => ({ 
    type: transaction.isReccuring ? REMOVE_RECURRING_TRANSACTION : REMOVE_TRANSACTION, 
    transaction });


// export const addTransaction = (transaction: Transaction) => ({ type: ADD_TRANSACTION, transaction });
export const resetStore = (today: Date) => ({ type: RESET_STORE, today });
export const setToday = (today: Date) => ({ type: SET_TODAY, today });