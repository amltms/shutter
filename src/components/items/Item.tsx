import { ItemAttributes } from '../interfaces';
import { FC } from 'react';
import styled from 'styled-components';

export type ItemProps = {
	item: ItemAttributes;
};

const ItemContainer = styled.div`
	margin: 1rem 1rem 1rem 0rem;
	border-radius: 1.2rem;
	height: 300px;
	width: 200px;
	position: relative;
	overflow: hidden;
`;

const ItemImg = styled.img`
	height: 100%;
	object-fit: contain;
`;

export const Item: FC<ItemProps> = ({ item }) => {
	return (
		<ItemContainer>
			<ItemImg src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`} alt="poster" />
		</ItemContainer>
	);
};
