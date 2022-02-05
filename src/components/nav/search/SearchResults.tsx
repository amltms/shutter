import { FC } from 'react';
import styled from 'styled-components';
import { ItemList, ItemListProps } from '../../items/ItemList';

const SearchContainer = styled.div`
	padding: 7vw;
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
export const SearchResults: FC<ItemListProps> = ({ items }) => {
	return (
		<>
			{items.length === 0 ? (
				<Text>
					<h2>No Results</h2>
				</Text>
			) : (
				<SearchContainer>
					<ItemList items={items} />
				</SearchContainer>
			)}
		</>
	);
};
