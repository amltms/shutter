import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ItemList } from '../components/items/ItemList';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { RootState } from '../app/store';
import { getSaved } from '../features/item/itemSlice';
import Spinner from '../components/utilities/Spinner';

const SavedContainer = styled.div`
	padding: 10vw 6vw;
`;

const Text = styled.div`
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	h2 {
		color: #333;
	}
	p {
		position: absolute;
		top: 0;
	}
`;
export const SavedItems: FC = () => {
	const dispatch = useAppDispatch();
	const { savedItems, savedItemsDB, status } = useAppSelector((state: RootState) => state.item);
	const [didMount, setDidMount] = useState(false);

	useEffect(() => {
		if (Object.keys(savedItems).length !== 0) {
			setDidMount(true);
		}
	}, [savedItemsDB, savedItems]);

	useEffect(() => {
		dispatch(getSaved());
	}, [dispatch, savedItemsDB]);

	if (status === 'loading' && !didMount) {
		return <Spinner />;
	}

	return (
		<>
			{Object.keys(savedItems).length !== 0 ? (
				<SavedContainer>
					<ItemList items={savedItems} />
				</SavedContainer>
			) : (
				<Text>
					<h2>No Items</h2>
				</Text>
			)}
		</>
	);
};
