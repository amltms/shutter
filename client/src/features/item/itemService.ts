import axios from 'axios';
import { ItemAttributes, ItemDB, Genre } from '../../types';
const apikey = '5042d9bd250e2fbd1f65fceff13e225d';
const API_URL = '/api/items/';

const getData = async (url: string, urlVars?: string) => {
	return await axios
		.get(`https://api.themoviedb.org/3/${url}?api_key=${apikey}&language=en-UK${urlVars}`)
		.then((res) => res.data)
		.catch((err) => console.log(err));
};

const config = (token: string) => {
	return {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
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

const getGenres = async (type: String): Promise<Genre[]> => {
	if (type === 'all') {
		let [movies, tv] = await Promise.all([getGenres('movie'), getGenres('tv')]);

		movies = movies.map((obj) => ({ ...obj, type: 'movie' }));
		tv = tv.map((obj) => ({ ...obj, type: 'tv' }));
		const all = [...movies, ...tv];

		return all.filter((value, index, self) => index === self.findIndex((t) => t.id === value.id && t.name === value.name));
	} else {
		const { genres } = await getData(`genre/${type}/list`);
		return genres;
	}
};

const getGenreItems = async (type: String, genre: number) => {
	return getData(`discover/${type}`, `&with_genres=${genre}`);
};

const getSearch = async (search: String) => {
	return getData(`search/multi`, `&query=${search}`);
};

const getSavedDB = async (token: string): Promise<ItemDB[]> => {
	const { data } = await axios.get(API_URL, config(token));
	return data;
};

const getSaved = async (token: string): Promise<ItemAttributes[]> => {
	return await Promise.all((await getSavedDB(token)).map((item: ItemDB) => getItem(item.media_type, item.id)));
};

const configureSaved = async (id: number, media_type: string, token: string) => {
	const { data } = await axios.put(API_URL, { id, media_type }, config(token));
	return data;
};

const itemService = {
	getTrending,
	getItem,
	getSearch,
	getCredits,
	getGenres,
	getGenreItems,
	getSavedDB,
	getSaved,
	configureSaved,
};

export default itemService;
