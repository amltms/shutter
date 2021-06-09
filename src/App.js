import './App.css';
import { useState } from 'react';
import {fetchSearch} from './api/fetchData';
import {Home} from './Home';
import {SearchResults} from './components/SearchResults';
import {ItemOverview} from './components/ItemOverview';
import {Nav} from './components/Nav';

function App() {
    const [searching, setSearching] = useState(false);
    const [searchData, setSearchData] = useState([]);
    const [selectedItem, setSelectedItem] = useState('');
    const [overview, setOverview] = useState(false)
    const [loading, setLoading] = useState(true);

    const handleInput = async (e) => {
        if (e.target.value) {
            setSearching(true);
            const data = await fetchSearch(e.target.value);
            console.log(data.results);
            setSearchData(data.results);
        }else{
            setSearching(false)
        }
    }

    
const itemOverview = (id) => {
        setLoading(true);
        setSelectedItem(id);
        setOverview(true);
    }
    return (
        <div className="App">
            <Nav handleInput={handleInput} />
            {overview && <ItemOverview setLoading={setLoading} loading={loading} setOverview={setOverview} selectedItem={selectedItem} />}
            {searching ? <SearchResults loading={loading} itemOverview={itemOverview} searchData={searchData}/> : <Home loading={loading} setLoading={setLoading} itemOverview={itemOverview}/>}
        </div>
    );
}

export default App;
