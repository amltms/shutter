import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { RootState } from '../app/store';
import { ItemList } from '../components/items/ItemList';
import { SlideShow } from '../components/slideshow/SlideShow';
import Spinner from '../components/utilities/Spinner';
import { getTrending, reset } from '../features/item/itemSlice';

export function Trending() {
	const { items, status } = useAppSelector((state: RootState) => state.item);
	let { type } = useParams();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getTrending(type || 'all'));

		return () => {
			dispatch(reset());
		};
	}, [dispatch, type]);

	if (status === 'loading') {
		return <Spinner />;
	}

	return (
		<div>
			<SlideShow items={items} />
			<ItemList items={items} />
		</div>
	);
}
