import { useState } from 'react';
import { Home } from './components/home/Home';
import { ItemAttributes } from './components/interfaces';
import { Nav } from './components/nav/Nav';
import { SearchBox } from './components/nav/search/SearchBox';
import { SearchResults } from './components/nav/search/SearchResults';
import { ItemContext } from './components/context/ItemContext';

export default function App() {
	const [searching, setSearching] = useState(false);
	const [saved, setSaved] = useState<ItemAttributes[]>([]);
	const [searchItems, setSearchItems] = useState<ItemAttributes[]>([]);
	return (
		<ItemContext.Provider value={{ saved, setSaved }}>
			<div className="App">
				<Nav>
					<SearchBox setSearching={setSearching} searching={searching} setSearchItems={setSearchItems} />
				</Nav>
				{searching ? <SearchResults items={searchItems} /> : <Home />}
			</div>
		</ItemContext.Provider>
	);
}
