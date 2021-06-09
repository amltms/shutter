import axios from 'axios';
const apikey = "5042d9bd250e2fbd1f65fceff13e225d";

export const fetchPopular = async () => {
    return await axios.get('https://api.themoviedb.org/3/movie/popular?api_key='+apikey+'&language=en-UK&page=1')
    .then(res => res.data)
    .catch(err => console.log(err))
}


export const fetchItem = async (id) => {
    return await axios.get('https://api.themoviedb.org/3/movie/'+id+'?api_key='+apikey)
    .then(res => res.data)
    .catch(err => console.log(err))
}

export const fetchSearch = async (id) => {
    return axios.get('https://api.themoviedb.org/3/search/movie?api_key='+apikey+'&language=en-UK&query='+id+'&page=1&include_adult=false')
    .then(res => res.data)
    .catch(err => console.log(err))
}
