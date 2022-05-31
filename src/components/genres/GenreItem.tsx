import { useNavigate, useParams } from 'react-router-dom';
import { FC } from 'react';
import styled from 'styled-components';
import { Genre } from '../../types';
import { palette } from '../../styles/palette';

export type ItemProps = {
	genre: Genre;
};

const GenreImg = styled.img`
	border-radius: 1.5rem;
	height: 100%;
	width: 100%;
	position: absolute;
	z-index: -1;
	object-fit: cover;
	filter: brightness(20%);
	transition: 0.5s;
`;

const GenreContainer = styled.div`
	border-radius: 1.5rem;
	height: 15rem;
	margin: 0 1rem;
	padding: 2rem;
	flex-basis: 380px;
	flex-grow: 0;
	flex-shrink: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	overflow: hidden;
	cursor: pointer;
	p {
		transition: 0.4s;
		font-size: 2rem;
	}
	&:hover p {
		color: ${palette.primary};
	}
	&:hover ${GenreImg} {
		filter: brightness(15%) grayscale(1);
		transform: scale(3);
	}
`;

export const GenreItem: FC<ItemProps> = ({ genre }) => {
	let navigate = useNavigate();

	let { type } = useParams();
	const handleClick = () => {
		navigate(`/${type ? type : 'movie'}/genres/${genre.id}`);
	};

	return (
		<GenreContainer onClick={handleClick}>
			<GenreImg src={`${process.env.PUBLIC_URL}/genres/${genre.id}.jpg`} alt={genre.name} />
			<p>{genre.name}</p>
		</GenreContainer>
	);
};
