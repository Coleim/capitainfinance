import { Saving } from "../models/saving";
import * as Crypto from 'expo-crypto';
import { date } from "../services/DateAsString";

export const INSERT_SAVING = 'INSERT_SAVING';

export interface SavingAction {
    type: string;
    saving: Saving;
};

export const insertSaving = (savingDate: Date, amount: number) => ({ type: INSERT_SAVING, saving: { 
    saving_id: Crypto.randomUUID(),
    key: date.GetMonthKey(savingDate),
    savingDate,
    amount
} });
