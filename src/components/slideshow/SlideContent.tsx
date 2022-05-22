import { FC } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ItemAttributes } from '../../types';
import { palette } from '../../styles/palette';

interface Props {
	slideContent: ItemAttributes;
}

const Content = styled.div`
	position: absolute;
	left: 0;
	width: 100%;
	z-index: 2;
	bottom: 0;
	width: 100%;
	padding: 8vw;
	text-align: center;

	@media screen and (max-width: 900px) {
		h1 {
			font-size: 3rem;
		}
		p {
			font-size: 1rem;
		}
	}
`;

const DetailsBtn = styled.button`
	transition: 0.3s;
	font-size: 1.5rem;
	margin-top: 1.5rem;
	padding: 1rem 0;
	position: relative;
	display: inline-block;
	@media screen and (max-width: 900px) {
		padding: 0.8rem;
		font-size: 1rem;
	}
	:after {
		content: '';
		position: absolute;
		width: 100%;
		transform: scaleX(1);
		height: 1px;
		bottom: -8px;
		left: 0;
		background-color: ${palette.primary};
		transform-origin: bottom left;
		transition: transform 0.3s ease-out;
	}
	:hover:after {
		transform-origin: bottom right;
		transform: scaleX(0);
	}
	:hover {
		color: ${palette.primary};
	}
`;

const OverviewText = styled.p`
	overflow: hidden;
	font-size: 1.5rem;
	text-overflow: ellipsis;
	color: ${palette.secondaryTextColor};
	margin-top: 2vw;
	margin: 0 auto;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	@media (min-width: 1800px) {
		-webkit-line-clamp: 5;
		width: 50%;
	}
`;

const AnimateContainer = styled.div`
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
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
					<AnimateContainer>
						<div key={slideContent.id} className="animate-text">
							<h1>{slideContent.title || slideContent.name}</h1>
							<OverviewText>{slideContent.overview}</OverviewText>
						</div>
					</AnimateContainer>
					<DetailsBtn onClick={() => overviewHandle()}>More Details</DetailsBtn>
				</Content>
			)}
		</>
	);
};
