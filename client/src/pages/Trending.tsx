import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { RootState } from '../app/store';
import { getGenres, getTrending, reset } from '../features/item/itemSlice';
import { GenreCarousel } from '../components/genres/GenreCarousel';
import { ItemList } from '../components/items/ItemList';
import { SlideShow } from '../components/slideshow/SlideShow';
import { motion } from 'framer-motion';
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

	if (status === 'loading') {
		return <Spinner />;
	}

	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
			<SlideShow items={items} />
			<GenreCarousel genres={genres} />
			<ItemList items={items} />
		</motion.div>
	);
};
