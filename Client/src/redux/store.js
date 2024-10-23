import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import projectReducer from './projectsSlice';
import pdfReducer from './pdfSlice';
import colabSlice from './colabSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  user: userReducer,
  projects: projectReducer,
  colabs: colabSlice,
  pdf: pdfReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  version: 1
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);