import { FC, useEffect, useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import styled from 'styled-components';
import { ItemList } from '../components/items/ItemList';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { RootState } from '../app/store';
import { getSaved } from '../features/item/itemSlice';
import Spinner from '../components/utilities/Spinner';
import { palette } from '../styles/palette';
import { AiFillWarning } from 'react-icons/ai';

const SavedContainer = styled.div`
	padding: 10vw 6vw;
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Text = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	h2 {
		color: #333;
		font-size: 2.5rem;
	}
	svg {
		margin: 1rem;
		font-size: 5rem;
		fill: #333;
	}
`;

const Alert = styled.div`
	position: absolute;
	top: 15%;
	width: auto;
	background-color: ${palette.warning};
	border-radius: 0.4rem;
	padding: 1rem;
	padding-right: 1.5rem;
	font-size: 1.2rem;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	p {
		font-size: 1.3rem;
	}
	> svg {
		font-size: 2rem;
		margin-right: 0.8rem;
	}
`;

export const SavedItems: FC = () => {
	const dispatch = useAppDispatch();
	const { savedItems, savedItemsDB, status } = useAppSelector((state: RootState) => state.item);
	const { user } = useAppSelector((state: RootState) => state.auth);
	const [didMount, setDidMount] = useState(false);

	useEffect(() => {
		if (Object.keys(savedItems).length !== 0) {
			setDidMount(true);
		}
	}, [savedItemsDB, savedItems]);

	useEffect(() => {
		dispatch(getSaved());
	}, [dispatch, savedItemsDB]);

	if (status === 'loading' && !didMount) {
		return <Spinner />;
	}

	return (
		<SavedContainer>
			{Object.keys(savedItems).length !== 0 ? (
				<ItemList items={savedItems} />
			) : (
				<>
					{!user && (
						<Alert>
							<AiFillWarning className="icon" />
							<p>You need to be logged in to save items</p>
						</Alert>
					)}
					<Text>
						<BiSearchAlt />
						<h2>No Items Found</h2>
					</Text>
				</>
			)}
		</SavedContainer>
	);
};
