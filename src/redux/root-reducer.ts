import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import {appReducer, authReducer, documentReducer} from './slices';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'document'],
};

const rootReducer = combineReducers({
  app: appReducer,
  document: documentReducer,
  auth: authReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export default rootReducer;
