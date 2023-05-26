import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import reducers from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  version: 1,
  // https://github.com/rt2zz/redux-persist/blob/master/docs/migrations.md
}
const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})


const persistor = persistStore(store);
console.log("   --- store.getState() --- " , store.getState())

export { store, persistor };

