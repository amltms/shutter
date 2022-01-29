import { useState } from 'react';
import { Home } from './components/home/Home';
import { ItemAttributes } from './components/interfaces';
import { Nav } from './components/nav/Nav';
import { SearchBox } from './components/nav/search/SearchBox';
import { SearchResults } from './components/nav/search/SearchResults';

export default function App() {
	const [searching, setSearching] = useState(false);
	const [searchItems, setSearchItems] = useState<ItemAttributes[]>([]);
	return (
		<div className="App">
			<Nav>
				<SearchBox setSearching={setSearching} setSearchItems={setSearchItems} />
			</Nav>
			{searching ? <SearchResults items={searchItems} /> : <Home />}
		</div>
	);
}
