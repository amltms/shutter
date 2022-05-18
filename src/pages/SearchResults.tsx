import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { ItemAttributes } from '../types';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { RootState } from '../app/store';
import { ItemList } from '../components/items/ItemList';
import { getSearch } from '../features/item/itemSlice';

const SearchContainer = styled.div`
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

export const SearchResults: FC = () => {
	let { search } = useParams();
	const { items } = useAppSelector((state: RootState) => state.item);
	const dispatch = useAppDispatch();

	useEffect(() => {
		search && dispatch(getSearch(search));
	}, [search, dispatch]);

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
