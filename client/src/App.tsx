import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Nav } from './components/utilities/Nav';
import { ItemContext } from './components/context/ItemContext';
import { Overview } from './pages/ItemOverview';
import { Trending } from './pages/Trending';
import { ItemAttributes } from './types';
import { useLocation } from 'react-router';
import { SearchResults } from './pages/SearchResults';
import { SavedItems } from './pages/SavedItems';
import { Genre } from './pages/Genre';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

function App() {
	const [saved, setSaved] = useState<ItemAttributes[]>([]);
	const location = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location]);

	return (
		<ItemContext.Provider value={{ saved, setSaved }}>
			<div className="App">
				<Nav />

				<Routes>
					<Route path="/" element={<Trending />}>
						<Route path=":type" element={<Trending />} />
					</Route>
					<Route path="/saved" element={<SavedItems />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/overview/:type/:id" element={<Overview />} />
					<Route path="/search/:search" element={<SearchResults />} />
					<Route path="/:type/genre/:id" element={<Genre />} />
				</Routes>
			</div>
		</ItemContext.Provider>
	);
}

export default App;
