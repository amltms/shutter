import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from './authService';
import { User } from '../../types';

// Get user from localStorage
const userJson = localStorage.getItem('user');

export interface AuthState {
	user: User | null;
	status: 'idle' | 'loading' | 'failed';
	saved: string[];
	message: any;
}

const initialState: AuthState = {
	user: userJson !== null ? JSON.parse(userJson) : null,
	status: 'idle',
	saved: [],
	message: '',
};

export const login = createAsyncThunk('auth/login', async (user: User, thunkAPI) => {
	try {
		return await authService.login(user);
	} catch (error: any) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

export const register = createAsyncThunk('auth/register', async (user: User) => {
	const response = await authService.register(user);

	return response.results;
});

export const logout = createAsyncThunk('auth/logout', async () => {
	await authService.logout();
});

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		reset: (state: any) => {
			state.status = 'idle';
			state.message = '';
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(login.fulfilled, (state, action) => {
				state.status = 'idle';
				state.user = action.payload;
			})
			.addCase(login.rejected, (state, action) => {
				state.status = 'failed';
				state.message = action.payload;
				state.user = null;
			})
			.addCase(register.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(register.fulfilled, (state, action) => {
				state.status = 'idle';
				state.user = action.payload;
			})
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
			});
	},
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
