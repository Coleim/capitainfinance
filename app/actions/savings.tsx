import { Saving } from "../models/saving";

export const INSERT_SAVING = 'INSERT_SAVING';

export interface SavingAction {
    type: string;
    saving: Saving;
};

export const insertSaving = (month: number, amount: number, year: number) => ({ type: INSERT_SAVING, saving: { month, amount, year} });