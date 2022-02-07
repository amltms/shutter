import { useState } from 'react';
import { Home } from './components/home/Home';
import { Routes, Route } from 'react-router-dom';
import { ItemAttributes } from './components/interfaces';
import { ItemContext } from './components/context/ItemContext';
import { SavedItems } from './components/home/SavedItems';
import { Overview } from './components/items/overview/Overview';
import { Nav } from './components/nav/Nav';
import { SearchResults2 } from './components/nav/search/SearchResults';

export default function App() {
	const [saved, setSaved] = useState<ItemAttributes[]>([]);
	return (
		<ItemContext.Provider value={{ saved, setSaved }}>
			<div className="App">
				<Nav />
				<Routes>
					<Route path="/" element={<Home />}>
						<Route path=":type" element={<Home />} />
					</Route>
					<Route path="/saved" element={<SavedItems />} />
					<Route path="/saved" element={<SavedItems />} />
					<Route path="/search/:search" element={<SearchResults2 />} />
					<Route path="/overview/:type/:id" element={<Overview />} />
				</Routes>
			</div>
		</ItemContext.Provider>
	);
}
