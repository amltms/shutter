import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { RootState } from '../app/store';
import { getGenreItems, reset } from '../features/item/itemSlice';
import Spinner from '../components/utilities/Spinner';
import { ItemList } from '../components/items/ItemList';

const ItemDetails = styled.div`
	padding: 20% 0vw;
`;

export const Genre: FC = () => {
	const { items, status } = useAppSelector((state: RootState) => state.item);
	const dispatch = useAppDispatch();

	let { type, id } = useParams();

	useEffect(() => {
		type && id && dispatch(getGenreItems({ type, id: Number(id) }));

		return () => {
			dispatch(reset());
		};
	}, [id, type, dispatch]);

	if (status === 'loading') {
		return <Spinner />;
	}

	return (
		<>
			<ItemDetails>{items && <ItemList items={items} />}</ItemDetails>
		</>
	);
};
