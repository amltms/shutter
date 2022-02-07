import { useState } from 'react';
import { Home } from './components/home/Home';
import { Routes, Route } from 'react-router-dom';
import { ItemAttributes } from './components/interfaces';
import { Nav } from './components/nav/Nav';
import { SearchBox } from './components/nav/search/SearchBox';
import { SearchResults } from './components/nav/search/SearchResults';
import { ItemContext } from './components/context/ItemContext';
import { SavedItems } from './components/home/SavedItems';
import { Overview } from './components/items/overview/Overview';

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
				{searching ? (
					<SearchResults items={searchItems} />
				) : (
					<Routes>
						<Route path="/" element={<Home />}>
							<Route path=":type" element={<Home />} />
						</Route>
						<Route path="/saved" element={<SavedItems />} />
						<Route path="/saved" element={<SavedItems />} />
						<Route path="/overview/:type/:id" element={<Overview />} />
					</Routes>
				)}
			</div>
		</ItemContext.Provider>
	);
}
