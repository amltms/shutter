import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ItemCredits } from '../components/itemOverview/credits/ItemCredits';
import { OverviewDetails } from '../components/itemOverview/OverviewDetails';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { RootState } from '../app/store';
import { getItem, getCredits, reset } from '../features/item/itemSlice';

const ItemDetails = styled.div`
	padding: 20% 10vw 0 10vw;
`;

const Backdrop = styled.img`
	z-index: -1;
	position: absolute;
	opacity: 1;
	width: 100%;
	filter: brightness(60%);
	mask-image: linear-gradient(to top, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.7) 100%);
	@media screen and (max-width: 900px) {
		height: 100vh;
		width: auto;
		margin-left: 50%;
		transform: translate(-50%, 0%);
	}
`;

export const Overview: FC = () => {
	const { selectedItem, credits } = useAppSelector((state: RootState) => state.item);
	const dispatch = useAppDispatch();

	let { type, id } = useParams();

	useEffect(() => {
		type && id && dispatch(getItem({ type: type, id: id }));
		type && id && dispatch(getCredits({ type: type, id: id }));

		return () => {
			dispatch(reset());
		};
	}, [id, type, dispatch]);

	return (
		<>
			<Backdrop src={`https://image.tmdb.org/t/p/original/${selectedItem?.backdrop_path}`} alt="backdrop" />
			<ItemDetails>
				{selectedItem && <OverviewDetails item={selectedItem} />}
				{credits && <ItemCredits credits={credits} />}
			</ItemDetails>
		</>
	);
};
