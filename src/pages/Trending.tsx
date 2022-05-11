import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { RootState } from '../app/store';
import { ItemList } from '../components/items/ItemList';
import { SlideShow } from '../components/slideshow/SlideShow';
import { getTrending } from '../features/item/itemSlice';

export function Trending() {
	const { items } = useAppSelector((state: RootState) => state.item);
	let { type } = useParams();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getTrending(type || 'all'));
	}, [dispatch, type]);

	return (
		<div>
			<SlideShow items={items} />
			<ItemList items={items} />
		</div>
	);
}
