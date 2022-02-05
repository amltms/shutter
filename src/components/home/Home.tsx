import { useEffect, useState, FC } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPopular } from '../../api/fetchContent';
import { ItemAttributes } from '../interfaces';
import { ItemList } from '../items/ItemList';
import { SlideShow } from './slideshow/SlideShow';

export const Home: FC = () => {
	const [popularItems, setPopularItems] = useState<ItemAttributes[]>([]);
	let { type } = useParams();
	useEffect(() => {
		fetchPopular(type || 'all').then((data) => {
			setPopularItems(data.results);
		});
	}, [type]);
	return (
		<div>
			<SlideShow popularItems={popularItems} />
			<ItemList items={popularItems} />
		</div>
	);
};
