import { useState } from 'react';
import { Home } from './components/Home';
import { ItemAttributes } from './components/interfaces';
import { Nav } from './components/Nav';
import { SearchBox } from './components/search/SearchBox';
import { SearchResults } from './components/search/SearchResults';

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
