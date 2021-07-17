import './App.css';
import { useState } from 'react';
import {fetchSearch} from './api/fetchData';
import {Home} from './components/home/Home';
import {Nav} from './components/util/Nav';

function App() {
	const [loading, setLoading] = useState(true);
	const [searchData, setSearchData] = useState([]);
	const [contentType, setContentType] = useState('all');
	
	const handleInput = async (e) => {
		e.target.value ? fetchSearch(e.target.value).then(data => setSearchData(data.results)): setSearchData([])
	}
	
return (
	<div className="App" >
		<Nav handleInput={handleInput} setContentType={setContentType}/>
		<div className='container'>
			<Home loading={loading} setLoading={setLoading} contentType={contentType}  searchData={searchData} />
		</div>
	</div>
);
}

export default App;
