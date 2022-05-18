import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import itemService from './itemService';
import { Credits, Details } from '../../types';

export interface ItemState {
	items: any;
	selectedItem: Details | null;
	status: 'idle' | 'loading' | 'failed';
}

const initialState: ItemState = {
	items: [],
	selectedItem: null,
	status: 'idle',
};

export const getTrending = createAsyncThunk('item/getTrending', async (contentType: string) => {
	const response = await itemService.getTrending(contentType);

	return response.results;
});

export const getItem = createAsyncThunk('item/getItem', async (itemData: { type: string; id: string }) => {
	const { type, id } = itemData;
	const response = await itemService.getItem(type, id);

	return response;
});

export const getSearch = createAsyncThunk('item/getSearch', async (search: string) => {
	const response = await itemService.getSearch(search);
	return response.results;
});

export const itemSlice = createSlice({
	name: 'item',
	initialState,
	reducers: {
		reset: (state: any) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getTrending.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getTrending.fulfilled, (state, action) => {
				state.status = 'idle';
				state.items = action.payload;
			})
			.addCase(getItem.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getItem.fulfilled, (state, action) => {
				state.status = 'idle';
				state.selectedItem = action.payload;
			})
			.addCase(getSearch.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getSearch.fulfilled, (state, action) => {
				state.status = 'idle';
				state.items = action.payload;
			});
	},
});

export const { reset } = itemSlice.actions;
export default itemSlice.reducer;
