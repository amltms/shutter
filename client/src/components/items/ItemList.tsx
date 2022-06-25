import { Item } from './Item';
import { FC } from 'react';
import styled from 'styled-components';
import { ItemAttributes } from '../../types';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';

export type ItemListProps = {
	items: ItemAttributes[];
};

const Grid = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;

export const ItemList: FC<ItemListProps> = ({ items }) => {
	const { user } = useAppSelector((state: RootState) => state.auth);
	return <Grid>{items.map((i) => i.poster_path && <Item key={i.id} item={i} user={user} />)}</Grid>;
};
