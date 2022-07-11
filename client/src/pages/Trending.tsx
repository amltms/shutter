import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { RootState } from '../app/store';
import { getGenres, getTrending, reset } from '../features/item/itemSlice';
import { GenreCarousel } from '../components/genres/GenreCarousel';
import { ItemList } from '../components/items/ItemList';
import { SlideShow } from '../components/slideshow/SlideShow';
import Spinner from '../components/utilities/Spinner';

export const Trending = () => {
	const { items, genres, status } = useAppSelector((state: RootState) => state.item);
	let { type } = useParams();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getTrending(type || 'all'));
		dispatch(getGenres(type || 'all'));

		return () => {
			dispatch(reset());
		};
	}, [dispatch, type]);

	if (status === 'loading' && items.length === 0) {
		return <Spinner />;
	}

	return (
		<div>
			<SlideShow items={items} />
			<GenreCarousel genres={genres} />
			<ItemList items={items} />
		</div>
	);
};
