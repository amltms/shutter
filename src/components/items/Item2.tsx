import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ItemAttributes } from '../../types';
import { ItemContext } from '../context/ItemContext';

export type ItemProps = {
	item: ItemAttributes;
};
export type PreviewProps = {
	bg: string;
};

const ItemImg = styled.img`
	transition: opacity 0.3s;
	width: 100%;
	min-height: 100%;
	height: fit-content;
	z-index: 20;
`;

const ItemPreview = styled.div<PreviewProps>`
	position: absolute;
	height: 100%;
	width: 100%;
	font-size: 1.8rem;
	background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${({ bg }) => bg});
	background-size: cover;
`;

const ItemContainer = styled.div`
	border-radius: 1.2rem;
	margin: 1rem 1rem 1rem 0rem;
	position: relative;
	overflow: hidden;
	transition: 0.5s;
	display: flex;
	flex-direction: row;
	width: 200px;
	height: 300px;
	flex: none;
	:hover {
		cursor: pointer;
		width: 500px;
	}
	&:hover ${ItemImg} {
		opacity: 0;
	}
`;

const SaveIcon = styled.div`
	position: absolute;
	padding: 1rem;
	right: 0;
`;

const PreviewContent = styled.div`
	position: absolute;
	white-space: nowrap;
	overflow: hidden;
	padding: 2rem;
	left: 0;
	bottom: 0;
`;

export const Item: FC<ItemProps> = ({ item }) => {
	const { saved, setSaved } = useContext(ItemContext);
	let navigate = useNavigate();

	const savedValidation = (item: ItemAttributes) => {
		if (saved && saved.some((i: ItemAttributes) => i.id === item.id)) {
			setSaved(saved.filter((i: ItemAttributes) => i.id !== item.id));
		} else {
			setSaved([...saved, item]);
		}
	};

	return (
		<ItemContainer onClick={() => navigate(`/overview/${item.media_type}/${item.id}`)}>
			<ItemPreview bg={`https://image.tmdb.org/t/p/original/${item?.backdrop_path}`}>
				<SaveIcon onClick={() => savedValidation(item)}>{saved && saved.some((i: ItemAttributes) => i.id === item.id) ? <BsBookmarkFill /> : <BsBookmark />}</SaveIcon>
				<PreviewContent>
					<h2>{item.title || item.name}</h2>
					<p>{(item.release_date || item.first_air_date || '----').substring(0, 4)}</p>
				</PreviewContent>
			</ItemPreview>
			<ItemImg src={`https://image.tmdb.org/t/p/w300/${item?.poster_path}`} alt="poster" />
		</ItemContainer>
	);
};
