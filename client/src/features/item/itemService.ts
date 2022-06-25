import axios from 'axios';
import { ItemAttributes, ItemDB } from '../../types';
const apikey = '5042d9bd250e2fbd1f65fceff13e225d';
const API_URL = '/api/items/';

const getData = async (url: string, urlVars?: string) => {
	return await axios
		.get(`https://api.themoviedb.org/3/${url}?api_key=${apikey}&language=en-UK${urlVars}`)
		.then((res) => res.data)
		.catch((err) => console.log(err));
};

const getTrending = async (contentType: String) => {
	return getData(`trending/${contentType}/week`);
};

const getItem = async (type: String, id: Number) => {
	const data = await getData(`${type}/${id}`);
	data.media_type = type;
	return data;
};

const getCredits = async (type: String, id: String) => {
	return getData(`${type}/${id}/credits`);
};

const getGenres = async (type: String) => {
	return getData(`/genre/${type}/list`);
};

const getGenreItems = async (type: String, genre: number) => {
	return getData(`discover/${type}`, `&with_genres=${genre}`);
};

const getSearch = async (search: String) => {
	return getData(`search/multi`, `&query=${search}`);
};

const getSaved = async (token: string): Promise<ItemAttributes[]> => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const { data } = await axios.get(API_URL, config);
	return await Promise.all(data.map((item: ItemDB) => getItem(item.mediaType, item.id)));
};

const configureSaved = async (type: string, id: number, token: string): Promise<ItemAttributes[]> => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const { data } = await axios.put(API_URL, config);
	return await Promise.all(data.map((item: ItemDB) => getItem(item.mediaType, item.id)));
};

const itemService = {
	getTrending,
	getItem,
	getSearch,
	getCredits,
	getGenres,
	getGenreItems,
	getSaved,
	configureSaved,
};

export default itemService;
