import { ItemAttributes } from '../interfaces';
import { FC } from 'react';
import styled from 'styled-components';

export type ItemProps = {
	item: ItemAttributes;
};

const ItemContainer = styled.div`
	margin: 1rem 1rem 1rem 0rem;
	transition: 0.3s;
	position: relative;
	:hover {
		z-index: 2;
		transform: scale(1.1);
	}
`;

const ItemImg = styled.img`
	object-fit: contain;
	border-radius: 1.2rem;
	transition: 0.5s;
	position: relative;
	overflow: hidden;
	height: 300px;
	@media screen and (max-width: 900px) {
		height: 25rem;
	}
`;

export const Item: FC<ItemProps> = ({ item }) => {
	return (
		<ItemContainer>
			<ItemImg src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`} alt="poster" />
		</ItemContainer>
	);
};
