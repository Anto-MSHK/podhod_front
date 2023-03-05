import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import imagesUploadReducer from './Slices/imagesUploadSlice';
import ExpoCreateReducer from './Slices/ExpoCreateSlice';


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    images : imagesUploadReducer,
    eventCreate: ExpoCreateReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
