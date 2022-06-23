import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import itemReducer from '../features/item/itemSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
	reducer: {
		item: itemReducer,
		auth: authReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
