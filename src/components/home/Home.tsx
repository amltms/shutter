import { useEffect, useState, FC } from 'react';
import { fetchPopular } from '../../api/fetchContent';
import { ItemAttributes } from '../interfaces';
import { ItemList } from '../items/ItemList';
import { SlideShow } from './slideshow/SlideShow';

export const Home: FC = () => {
	const [popularItems, setPopularItems] = useState<ItemAttributes[]>([]);

	useEffect(() => {
		fetchPopular('all').then((data) => {
			setPopularItems(data.results);
		});
	}, []);
	return (
		<div>
			<SlideShow popularItems={popularItems} />
			<ItemList items={popularItems} />
		</div>
	);
};
