import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Nav } from './components/utilities/Nav';
import { ItemContext } from './ItemContext';
import { Overview } from './pages/Overview';
import { Trending } from './pages/Trending';
import { ItemAttributes } from './types';

function App() {
	const [saved, setSaved] = useState<ItemAttributes[]>([]);
	return (
		<ItemContext.Provider value={{ saved, setSaved }}>
			<div className="App">
				<Nav />
				<Routes>
					<Route path="/" element={<Trending />}>
						<Route path=":type" element={<Trending />} />
					</Route>
					<Route path="/overview/:type/:id" element={<Overview />} />
				</Routes>
			</div>
		</ItemContext.Provider>
	);
}

export default App;
