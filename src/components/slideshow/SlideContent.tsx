import { FC } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ItemAttributes } from '../../types';
import { palette } from '../../styles/palette';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';

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
	padding: 5vw 8vw;
	h1 {
		font-size: 6vw;
	}

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
	margin-left: 0.5rem;
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

const AnimateContainer = styled.div`
	overflow: hidden;
	display: flex;
`;

const GenreName = styled.span`
	font-size: 1.6rem;
	padding-right: 2rem;
	color: ${palette.secondaryTextColor};
	padding-left: 0.5rem;
	transition: 0.4s;
	:hover {
		cursor: pointer;
		color: ${palette.primary};
	}
`;

export const SlideContent: FC<Props> = ({ slideContent }) => {
	let navigate = useNavigate();
	const { genres } = useAppSelector((state: RootState) => state.item);
	const filteredGenres = slideContent?.genre_ids && genres.filter((genre) => slideContent.genre_ids.includes(genre.id));

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
							<p>
								{filteredGenres.map((genre) => (
									<GenreName key={genre.id}>{genre.name} </GenreName>
								))}
							</p>
						</div>
					</AnimateContainer>
					<DetailsBtn onClick={() => overviewHandle()}>More Details</DetailsBtn>
				</Content>
			)}
		</>
	);
};
