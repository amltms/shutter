import axios from 'axios';
const apikey = '5042d9bd250e2fbd1f65fceff13e225d';

const getData = async (url: string, urlVars?: string) => {
	return await axios
		.get(`https://api.themoviedb.org/3/${url}?api_key=${apikey}&language=en-UK${urlVars}`)
		.then((res) => res.data)
		.catch((err) => console.log(err));
};

const getTrending = async (contentType: String) => {
	return getData(`trending/${contentType}/week`);
};

const getItem = async (type: String, id: String) => {
	return getData(`${type}/${id}`);
};

const getCredits = async (type: String, id: String) => {
	return getData(`${type}/${id}/credits`);
};

const getSearch = async (search: String) => {
	return getData(`search/multi`, `&query=${search}`);
};

const itemService = {
	getTrending,
	getItem,
	getSearch,
	getCredits,
};

export default itemService;
