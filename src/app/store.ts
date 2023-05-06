import {
	configureStore,
	ThunkAction,
	Action,
	combineReducers,
} from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import imagesUploadReducer from "./Slices/imagesUploadSlice";
import ExpoCreateReducer from "./Slices/ExpoCreateSlice";
import ExhibitCreateReducer from "./Slices/ExhibitCreateSlice";
import selectedExhibitReducer from "./Slices/SelectedExhibitSlice";
import selectedPageReducer from '../app/Slices/SelectedPageSlice'
import { eventsApi } from "./services/EventsApi";
import storage from "redux-persist/es/storage";
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
import { exhibitsApi } from "./services/ExhibitsApi";
import { eventPagesApi } from "./services/EventPages.Api";
import { chaptersApi } from "./services/ChapterApi";
import ExpoCreatePageSlice from "./Slices/ExpoCreatePageSlice";

const rootReducer = combineReducers({
	[eventsApi.reducerPath]: eventsApi.reducer,
	[exhibitsApi.reducerPath]: exhibitsApi.reducer,
	[eventPagesApi.reducerPath]: eventPagesApi.reducer,
	[chaptersApi.reducerPath]: chaptersApi.reducer,
	counter: counterReducer,
	images: imagesUploadReducer,
	eventCreate: ExpoCreateReducer,
	exhibitCreate: ExhibitCreateReducer,
	eventCreatePage: ExpoCreatePageSlice,
	selectedExhibit: selectedExhibitReducer,
	selectedPage: selectedPageReducer,
});

const persistConfig = {
	key: "root",
	storage,
	blacklist: ["events", "eventCreate", "images", "chapters", ],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleWare =>
		getDefaultMiddleWare({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat([
			eventsApi.middleware,
			exhibitsApi.middleware,
			eventPagesApi.middleware,
			chaptersApi.middleware,
		]),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
