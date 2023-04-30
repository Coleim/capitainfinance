import { Transaction } from "../models/transaction";

export const ADD_RECURRING_TRANSACTION = 'ADD_RECURRING_TRANSACTION';
export const ADD_TRANSACTION = 'ADD_TRANSACTION';
export const UPDATE_RECURRING_TRANSACTION = 'UPDATE_RECURRING_TRANSACTION';
export const RESET_STORE = 'RESET_STORE';

export interface TransactionAction {
    type: string;
    transaction: Transaction;
};


export const updateRecurringTransaction = (transaction: Transaction) => ({ type: UPDATE_RECURRING_TRANSACTION, transaction });
export const addRecurringTransaction = (transaction: Transaction) => ({ type: ADD_RECURRING_TRANSACTION, transaction });
export const addTransaction = (transaction: Transaction) => ({ type: ADD_TRANSACTION, transaction });
export const resetStore = () => ({ type: RESET_STORE });