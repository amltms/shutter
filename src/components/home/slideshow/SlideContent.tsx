import { FC } from 'react';
import { ItemAttributes } from '../../interfaces';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface Props {
	slideContent: ItemAttributes;
}
const Content = styled.div`
	position: absolute;
	left: 0;
	width: 100%;
	z-index: 2;
	bottom: 4vw;
	width: 100%;
	padding: 7vw;
	@media screen and (max-width: 900px) {
		bottom: 10%;
		h1 {
			font-size: 3rem;
		}
		p {
			font-size: 1rem;
		}
	}
`;

const DetailsBtn = styled.button`
	font-size: 1.5rem;
	margin-top: 1.5rem;
	padding: 1.3rem;
	border-radius: 2.5rem;
	border: 2px solid #da5d5d;
	background-size: 100% 200%;
	background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, #da5d5d 50%);
	transition: background-position 0.3s;
	:hover {
		background-position: 0 -98%;
	}

	@media screen and (max-width: 900px) {
		padding: 0.8rem;
		font-size: 1rem;
	}
`;

const OverviewText = styled.p`
	overflow: hidden;
	font-size: 1.5rem;
	text-overflow: ellipsis;
	margin-top: 2vw;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	@media (min-width: 1800px) {
		-webkit-line-clamp: 5;
		width: 50%;
	}
`;

export const SlideContent: FC<Props> = ({ slideContent }) => {
	let navigate = useNavigate();
	const overviewHandle = () => {
		navigate(`/overview/${slideContent.media_type}/${slideContent.id}`);
	};

	return (
		<>
			{slideContent && (
				<Content>
					<div key={slideContent.id} className="animate-text">
						<h1>{slideContent.title || slideContent.name}</h1>
						<OverviewText>{slideContent.overview}</OverviewText>
					</div>
					<DetailsBtn onClick={() => overviewHandle()}>More Details</DetailsBtn>
				</Content>
			)}
		</>
	);
};
