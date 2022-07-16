import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Nav } from './components/Nav/Nav';
import { Overview } from './pages/ItemOverview';
import { Trending } from './pages/Trending';
import { useLocation } from 'react-router';
import { SearchResults } from './pages/SearchResults';
import { SavedItems } from './pages/SavedItems';
import { Genre } from './pages/Genre';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { getSavedDB } from './features/item/itemSlice';
import { RootState } from './app/store';
import { AnimatePresence } from 'framer-motion';
import { AuthContainer } from './components/form/AuthContainer';

function App() {
	const location = useLocation();
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state: RootState) => state.auth);

	useEffect(() => {
		dispatch(getSavedDB());
	}, [dispatch, user]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location]);

	return (
		<div className="App">
			<Nav />
			<AnimatePresence exitBeforeEnter initial={false}>
				<Routes>
					<Route path="/" element={<Trending />}>
						<Route path=":type" element={<Trending />} />
					</Route>
					<Route path="/saved" element={<SavedItems />} />
					<Route
						path="/login"
						element={
							<AuthContainer>
								<Login />
							</AuthContainer>
						}
					/>
					<Route
						path="/register"
						element={
							<AuthContainer>
								<Register />
							</AuthContainer>
						}
					/>
					<Route path="/overview/:type/:id" element={<Overview />} />
					<Route path="/search/:search" element={<SearchResults />} />
					<Route path="/:type/genre/:id" element={<Genre />} />
				</Routes>
			</AnimatePresence>
		</div>
	);
}

export default App;
