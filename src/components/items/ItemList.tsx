import { Item } from './Item';
import { ItemAttributes } from '../interfaces';
import { FC } from 'react';
import styled from 'styled-components';

export type ItemListProps = {
	items: ItemAttributes[];
};

const Grid = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;

export const ItemList: FC<ItemListProps> = ({ items }) => {
	return <Grid>{items.map((i) => i.poster_path && <Item item={i} />)}</Grid>;
};
