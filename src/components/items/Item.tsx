import { ItemAttributes } from '../interfaces';
import { useNavigate } from 'react-router-dom';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { FC, useContext } from 'react';
import styled from 'styled-components';
import { ItemContext } from '../context/ItemContext';

export type ItemProps = {
	item: ItemAttributes;
};
export type PreviewProps = {
	bg: string;
};

const ItemContainer = styled.div`
	margin: 1rem 1rem 1rem 0rem;
	transition: 0.5s;
	position: relative;
	width: 200px;
	border-radius: 1.2rem;
	overflow: hidden;
	height: 300px;
	flex: none;
	:hover {
		width: 600px;
	}
`;

const ItemImg = styled.img`
	display: block;
	border-radius: 1.2rem;
	transition: 0.5s;
	height: 100%;
	@media screen and (max-width: 900px) {
		height: 25rem;
	}
`;

const ItemPreview = styled.div<PreviewProps>`
	position: absolute;
	height: 100%;
	width: 100%;
	transition: 0.3s;
	z-index: 10;
	font-size: 1.8rem;
	opacity: 0;
	:hover {
		opacity: 1;
	}
	::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${({ bg }) => bg});
		background-size: 600px;
		height: 100%;
		width: 100%;
		cursor: pointer;
	}
`;

const SaveIcon = styled.div`
	position: absolute;
	padding: 1rem;
	right: 0;
`;

const PreviewContent = styled.div`
	position: absolute;
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

	const overviewHandle = () => {
		navigate(`/overview/${item.media_type}/${item.id}`);
	};

	return (
		<ItemContainer>
			<ItemPreview bg={`https://image.tmdb.org/t/p/original/${item?.backdrop_path}`} onClick={() => overviewHandle()}>
				<SaveIcon onClick={() => savedValidation(item)}>{saved && saved.some((i: ItemAttributes) => i.id === item.id) ? <BsBookmarkFill /> : <BsBookmark />}</SaveIcon>
				<PreviewContent>
					<h2>{item.title}</h2>
					<p>{item.release_date}</p>
				</PreviewContent>
			</ItemPreview>
			<ItemImg src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`} alt="poster" />
		</ItemContainer>
	);
};
