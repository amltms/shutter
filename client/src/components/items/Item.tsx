import { useNavigate, useParams } from 'react-router-dom';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { FC, useContext } from 'react';
import styled from 'styled-components';
import { ItemContext } from '../context/ItemContext';
import { ItemAttributes } from '../../types';

export type ItemProps = {
	item: ItemAttributes;
};

const ItemContainer = styled.div`
	margin: 1rem 1rem 1rem 0rem;
	transition: 0.3s;
	position: relative;
	:hover {
		z-index: 2;
		transform: scale(1.1);
	}
`;

const ItemImg = styled.img`
	object-fit: contain;
	border-radius: 1.2rem;
	transition: 0.5s;
	position: relative;
	overflow: hidden;
	height: 300px;
	@media screen and (max-width: 900px) {
		height: 25rem;
	}
`;

const ItemPreview = styled.div`
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
`;

const SaveIcon = styled.div`
	position: absolute;
	padding: 1rem;
	right: 0;
`;

const PreviewContent = styled.div`
	background: rgba(0, 0, 0, 0.5);
	height: 100%;
	cursor: pointer;
	width: 100%;
`;
export const Item: FC<ItemProps> = ({ item }) => {
	console.log(item);

	const { saved, setSaved } = useContext(ItemContext);
	let navigate = useNavigate();
	let { type } = useParams();

	const savedValidation = (item: ItemAttributes) => {
		if (saved && saved.some((i: ItemAttributes) => i.id === item.id)) {
			setSaved(saved.filter((i: ItemAttributes) => i.id !== item.id));
		} else {
			setSaved([...saved, item]);
		}
	};

	const overviewHandle = () => {
		navigate(`/overview/${item.media_type ? item.media_type : type}/${item.id}`);
	};

	return (
		<ItemContainer>
			<ItemPreview>
				<SaveIcon onClick={() => savedValidation(item)}>{saved && saved.some((i: ItemAttributes) => i.id === item.id) ? <BsBookmarkFill /> : <BsBookmark />}</SaveIcon>
				<PreviewContent onClick={() => overviewHandle()}></PreviewContent>
			</ItemPreview>
			<ItemImg src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`} alt="poster" />
		</ItemContainer>
	);
};
