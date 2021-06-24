import './App.css';
import { useEffect, useState } from 'react';
import {fetchSearch} from './api/fetchData';
import {Home} from './components/home/Home';
import {SearchResults} from './components/search/SearchResults';
import {ItemOverview} from './components/items/ItemOverview';
import {Nav} from './components/util/Nav';

function App() {
	const [searching, setSearching] = useState(false);
	const [searchData, setSearchData] = useState([]);
	const [selectedItem, setSelectedItem] = useState('');
	const [overview, setOverview] = useState(false)
	const [loading, setLoading] = useState(true);
	const [windowOffset, setWindowOffset] = useState(0);
	
	const handleInput = async (e) => {
		if (e.target.value) {
			setSearching(true);
			const data = await fetchSearch(e.target.value);
			setSearchData(data.results);
		}else{
			setSearching(false)
		}
	}

	const itemOverview = (id) => {
		setSelectedItem(id);
		setOverview(true);
	}
	
return (
	<div className="App" >
		<Nav handleInput={handleInput} />
		<div className='container'>
			{searching ? <SearchResults loading={loading} itemOverview={itemOverview} searchData={searchData}/> : 
			<Home loading={loading} setLoading={setLoading} itemOverview={itemOverview} />}
			<ItemOverview setLoading={setLoading} loading={loading} setOverview={setOverview} overview={overview} selectedItem={selectedItem} />
			</div>
	</div>
);
}

export default App;
