import { Item } from './Item';
import { FC } from 'react';
import styled from 'styled-components';
import { ItemAttributes } from '../../types';

export type ItemListProps = {
	items: ItemAttributes[];
};

const Grid = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;

export const ItemList: FC<ItemListProps> = ({ items }) => {
	return <Grid>{items.map((i) => i.poster_path && <Item key={i.id} item={i} />)}</Grid>;
};
