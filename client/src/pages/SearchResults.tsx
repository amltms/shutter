import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { RootState } from '../app/store';
import { ItemList } from '../components/items/ItemList';
import { getSearch } from '../features/item/itemSlice';
import Spinner from '../components/utilities/Spinner';
import { motion } from 'framer-motion';

const SearchContainer = styled(motion.div)`
	padding: 12vw 7vw;
`;

const Text = styled.div`
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	h2 {
		color: #333;
	}
`;

export const SearchResults = () => {
	const { search } = useParams();
	const [typing, setTyping] = useState(false);
	let filterTimeout: { current: NodeJS.Timeout | null } = useRef(null);
	const { searchItems, status } = useAppSelector((state: RootState) => state.item);
	const dispatch = useAppDispatch();

	useEffect(() => {
		setTyping(true);
		/*debounce */
		clearInterval(filterTimeout.current as NodeJS.Timeout);
		filterTimeout.current = setTimeout(() => {
			search && dispatch(getSearch(search));
			setTyping(false);
		}, 400);
	}, [search, dispatch]);

	if (status === 'loading') {
		return <Spinner />;
	}
	return (
		<>
			{searchItems.length === 0 && status === 'idle' && typing === false ? (
				<Text>
					<h2>No Results</h2>
				</Text>
			) : (
				<SearchContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
					<ItemList items={searchItems} />
				</SearchContainer>
			)}
		</>
	);
};
