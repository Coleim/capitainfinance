export const RESET_STORE = 'RESET_STORE';
export const SET_TODAY = 'SET_TODAY';


export const resetStore = (today: Date) => ({ type: RESET_STORE, today });
export const setToday = (today: Date) => ({ type: SET_TODAY, today });
