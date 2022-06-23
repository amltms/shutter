import { FC, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { ItemContext } from '../components/context/ItemContext';
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
	const { saved } = useContext(ItemContext);
	const dispatch = useAppDispatch();

	const { savedItems } = useAppSelector((state: RootState) => state.item);
	console.log(savedItems);

	useEffect(() => {
		dispatch(getSaved());
	}, [dispatch]);

	return (
		<>
			{Object.keys(saved).length !== 0 ? (
				<SavedContainer>
					<ItemList items={saved} />
				</SavedContainer>
			) : (
				<Text>
					<h2>No Items</h2>
				</Text>
			)}
		</>
	);
};
