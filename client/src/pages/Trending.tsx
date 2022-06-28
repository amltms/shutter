import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { RootState } from '../app/store';
import { getGenres, getTrending, reset } from '../features/item/itemSlice';
import { GenreCarousel } from '../components/genres/GenreCarousel';
import { ItemList } from '../components/items/ItemList';
import { SlideShow } from '../components/slideshow/SlideShow';

export function Trending() {
	const { items, genres } = useAppSelector((state: RootState) => state.item);
	let { type } = useParams();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getTrending(type || 'all'));
		dispatch(getGenres(type || 'movie'));

		return () => {
			dispatch(reset());
		};
	}, [dispatch, type]);

	return (
		<div>
			<SlideShow items={items} />
			<GenreCarousel genres={genres} />
			<ItemList items={items} />
		</div>
	);
}
