import './index.css';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import { SavedItems } from './components/home/SavedItems';

const rootElement = document.getElementById('root');
render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<App />} />
			<Route path="/saved" element={<SavedItems />} />
		</Routes>
	</BrowserRouter>,
	rootElement
);
