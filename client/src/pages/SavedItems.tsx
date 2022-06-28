import { FC, useEffect } from 'react';
import styled from 'styled-components';
import { ItemList } from '../components/items/ItemList';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { RootState } from '../app/store';
import { getSaved } from '../features/item/itemSlice';

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
	const { savedItems, savedItemsDB } = useAppSelector((state: RootState) => state.item);

	useEffect(() => {
		dispatch(getSaved());
	}, [dispatch, savedItemsDB]);

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
