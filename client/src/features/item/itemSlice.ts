import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import itemService from './itemService';
import { Credits, Details, Genre, ItemAttributes, ItemDB } from '../../types';
import { RootState } from '../../app/store';

export interface ItemState {
	items: ItemAttributes[];
	searchItems: ItemAttributes[];
	selectedItem: Details | null;
	savedItems: ItemAttributes[];
	savedItemsDB: ItemDB[];
	status: 'idle' | 'loading' | 'failed';
	credits: Credits | null;
	genres: Genre[];
	message: any;
}

const initialState: ItemState = {
	items: [],
	searchItems: [],
	selectedItem: null,
	savedItems: [],
	savedItemsDB: [],
	status: 'idle',
	credits: null,
	genres: [],
	message: '',
};

const accessPrivateRoot = async (thunkAPI: any, fn: any, params?: Array<any>): Promise<any> => {
	try {
		const state = thunkAPI.getState() as RootState;
		const token = state.auth.user?.token;
		if (!token) {
			return thunkAPI.rejectWithValue('No token');
		} else {
			// line thats different
			return params ? await fn(...params, token) : await fn(token);
		}
	} catch (error: any) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
};

export const getTrending = createAsyncThunk('item/getTrending', async (contentType: string) => {
	const response = await itemService.getTrending(contentType);

	return response.results;
});

export const getItem = createAsyncThunk('item/getItem', async (itemData: { type: string; id: number }) => {
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

export const getSavedDB = createAsyncThunk('item/getSavedDB', async (_, thunkAPI) => {
	return accessPrivateRoot(thunkAPI, itemService.getSavedDB);
});

export const getSaved = createAsyncThunk('item/getSaved', async (_, thunkAPI) => {
	return accessPrivateRoot(thunkAPI, itemService.getSaved);
});

export const configureSaved = createAsyncThunk('item/configureSaved', async (item: ItemAttributes, thunkAPI) => {
	return accessPrivateRoot(thunkAPI, itemService.configureSaved, [item.id, item.media_type]);
});

export const itemSlice = createSlice({
	name: 'item',
	initialState,
	reducers: {
		reset: (state: any) => {
			state.status = 'idle';
			state.message = '';
			state.items = [];
			state.selectedItem = null;
			state.savedItems = [];
			state.credits = null;
			state.genres = [];
		},
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
				state.searchItems = action.payload;
			})
			.addCase(getSavedDB.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getSavedDB.fulfilled, (state, action) => {
				state.status = 'idle';
				state.savedItemsDB = action.payload;
			})
			.addCase(getSavedDB.rejected, (state, action) => {
				state.status = 'failed';
				state.message = action.payload;
			})
			.addCase(getSaved.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getSaved.fulfilled, (state, action) => {
				state.status = 'idle';
				state.savedItems = action.payload;
			})
			.addCase(getSaved.rejected, (state, action) => {
				state.status = 'failed';
				state.message = action.payload;
			})
			.addCase(configureSaved.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(configureSaved.fulfilled, (state, action) => {
				state.status = 'idle';
				state.savedItemsDB = action.payload;
			})
			.addCase(configureSaved.rejected, (state, action) => {
				state.status = 'failed';
				state.message = action.payload;
			});
	},
});

export const { reset } = itemSlice.actions;
export default itemSlice.reducer;
