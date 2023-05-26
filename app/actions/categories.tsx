import { Category } from "../models/Category";

export const ADD_CATEGORY = 'ADD_CATEGORY';
export const REMOVE_CATEGORY = 'REMOVE_CATEGORY';

export interface CategoryAction {
    type: string;
    category: Category;
};

const colors = [
    "#f5a572",
    "#f39893",
    "#7a87a4",
    "#abd194",
    "#23888a",
    "#51bab5",
    "#b98ac0",
    "#7ac2db",
    "#84a1c1",
    "#f1c85e"
];

export const addCategory = (label: String) => ({ type: ADD_CATEGORY, category: { label, color: colors[Math.floor(Math.random() * 10)]} });
export const removeCategory = (label: String) => ({ type: REMOVE_CATEGORY, category: { label, color: colors[Math.floor(Math.random() * 10)]} });

