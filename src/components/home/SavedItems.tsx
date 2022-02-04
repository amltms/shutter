import { FC, useContext } from 'react';
import { ItemList } from '../items/ItemList';
import styled from 'styled-components';
import { ItemContext } from '../context/ItemContext';

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
`;
export const SavedItems: FC = () => {
	const { saved } = useContext(ItemContext);
	return (
		<>
			{Object.keys(saved).length !== 0 ? (
				<SavedContainer>
					<ItemList items={saved} />
				</SavedContainer>
			) : (
				<Text>
					<h2>No Items Saved</h2>
				</Text>
			)}
		</>
	);
};
