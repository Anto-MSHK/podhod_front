

import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import imagesUploadReducer from './Slices/imagesUploadSlice';
import ExpoCreateReducer from './Slices/ExpoCreateSlice';
import { eventsApi } from './services/EventsApi';
import storage from 'redux-persist/es/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";









const rootReducer = combineReducers({
  [eventsApi.reducerPath]: eventsApi.reducer,
  counter: counterReducer,
  images: imagesUploadReducer,
  eventCreate: ExpoCreateReducer
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['events', 'eventCreate'],
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([
      eventsApi.middleware
    ]),
});

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
