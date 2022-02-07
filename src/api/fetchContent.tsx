import axios from 'axios';
const apikey = '5042d9bd250e2fbd1f65fceff13e225d';

const getData = async (url: string, urlVars?: string) => {
	return await axios
		.get(`https://api.themoviedb.org/3/${url}?api_key=${apikey}&language=en-UK${urlVars}`)
		.then((res) => res.data)
		.catch((err) => console.log(err));
};

export const fetchPopular = (contentType: string) => {
	return getData(`trending/${contentType}/week`);
};

export const fetchItem = (contentType: string | undefined, id: number | undefined) => {
	return getData(`${contentType}/${id}`);
};

export const fetchCredits = (contentType: string | undefined, id: number | undefined) => {
	return getData(`${contentType}/${id}/credits`);
};

export const fetchSearch = (search: string) => {
	return getData(`search/multi`, `&query=${search}`);
};
