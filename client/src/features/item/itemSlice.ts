import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import itemService from './itemService';
import { Credits, Details, Genre } from '../../types';

export interface ItemState {
	items: any;
	selectedItem: Details | null;
	status: 'idle' | 'loading' | 'failed';
	credits: Credits | null;
	genres: Genre[];
}

const initialState: ItemState = {
	items: [],
	selectedItem: null,
	status: 'idle',
	credits: null,
	genres: [],
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
export const getCredits = createAsyncThunk('item/getCredits', async (itemData: { type: string; id: string }) => {
	const { type, id } = itemData;
	const response = await itemService.getCredits(type, id);
	return response;
});

export const getGenres = createAsyncThunk('item/getGenres', async (type: string) => {
	const response = await itemService.getGenres(type);

	return response.genres;
});

export const getGenreItems = createAsyncThunk('item/getGenreItems', async (genreData: { type: string; id: number }) => {
	const response = await itemService.getGenreItems(genreData.type, genreData.id);

	return response.results;
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
			.addCase(getCredits.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getCredits.fulfilled, (state, action) => {
				state.status = 'idle';
				state.credits = action.payload;
			})
			.addCase(getGenres.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getGenres.fulfilled, (state, action) => {
				state.status = 'idle';
				state.genres = action.payload;
			})
			.addCase(getGenreItems.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getGenreItems.fulfilled, (state, action) => {
				state.status = 'idle';
				state.items = action.payload;
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
