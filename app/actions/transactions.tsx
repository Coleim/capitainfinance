import { Transaction } from "../models/transaction";
import * as Crypto from 'expo-crypto';

export const ADD_RECURRING_TRANSACTION = 'ADD_RECURRING_TRANSACTION';
export const UPDATE_RECURRING_TRANSACTION = 'UPDATE_RECURRING_TRANSACTION';
export const REMOVE_RECURRING_TRANSACTION = 'REMOVE_RECURRING_TRANSACTION';

export const ADD_TRANSACTION = 'ADD_TRANSACTION';
export const UPDATE_TRANSACTION = 'UPDATE_TRANSACTION';
export const REMOVE_TRANSACTION = 'REMOVE_TRANSACTION';

export interface TransactionAction {
    type: string;
    transaction: Transaction;
};


export const updateTransaction = (transaction: Transaction, label: string, amount: number, category: string, date: Date | undefined) => ({ 
    type: transaction.isReccuring ? UPDATE_RECURRING_TRANSACTION : UPDATE_TRANSACTION, 
    transaction: {
        ...transaction,
        label,
        category,
        amount,
        date
    } });

export const addTransaction = (label: string, amount: number, category: string, date: Date | undefined, recurring: boolean = false) => ({ 
    type: recurring ? ADD_RECURRING_TRANSACTION : ADD_TRANSACTION,
    transaction: { 
        transaction_id: Crypto.randomUUID(),
        owner_id: '123', // how to handle that ??
        label,
        amount,
        category,
        date,
        month: recurring || !date ? new Date().getMonth() : date.getMonth(),
        fullYear: recurring || !date ? new Date().getFullYear() : date.getFullYear(),
        isReccuring: recurring
    }
});

export const removeTransaction = (transaction: Transaction) => ({ 
    type: transaction.isReccuring ? REMOVE_RECURRING_TRANSACTION : REMOVE_TRANSACTION, 
    transaction });
