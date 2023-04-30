import { createStore, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import reducers from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Transaction } from '../models/transaction';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  version: 1,
}
const persistedReducer = persistReducer(persistConfig, reducers);




// const store = createStore(persistedReducer, applyMiddleware(thunk));
// const store = createStore(persistedReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})


const persistor = persistStore(store);
console.log("   --- store.getState() --- " , store.getState())

export { store, persistor };
// export { store };


