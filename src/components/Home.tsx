import { useEffect, useState, FC } from 'react';
import { fetchPopular } from '../api/fetchContent';
import { ItemAttributes } from './interfaces';
import { ItemList } from './items/ItemList';

interface Props {}

export const Home: FC = (props: Props) => {
	const [popularItems, setPopularItems] = useState<ItemAttributes[]>([]);

	useEffect(() => {
		fetchPopular('all').then((data) => {
			setPopularItems(data.results);
		});
	}, []);
	return (
		<div className="App">
			<ItemList items={popularItems} />
		</div>
	);
};
