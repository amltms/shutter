import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCredits, fetchItem } from '../../../api/fetchContent';
import { Credits, Details } from '../../interfaces';
import { ItemCredits } from './credits/ItemCredits';
import { OverviewDetails } from './OverviewDetails';

interface Props {}

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

export const Overview: FC<Props> = (props) => {
	const [item, setItem] = useState<Details>();
	const [credits, setCredits] = useState<Credits>();

	let { type, id } = useParams();

	useEffect(() => {
		fetchItem(type, Number(id)).then((data) => {
			setItem(data);
		});

		fetchCredits(type, Number(id)).then((data) => {
			setCredits(data);
		});
	}, [id, type]);

	return (
		<>
			<Backdrop src={`https://image.tmdb.org/t/p/original/${item?.backdrop_path}`} alt="backdrop" />
			<ItemDetails>
				{item && <OverviewDetails item={item} />}
				{credits && <ItemCredits credits={credits} />}
			</ItemDetails>
		</>
	);
};
