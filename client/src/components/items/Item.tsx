import { useNavigate } from 'react-router-dom';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { FC } from 'react';
import styled from 'styled-components';
import { ItemAttributes, ItemDB } from '../../types';
import { useAppDispatch } from '../../app/hooks';
import { configureSaved } from '../../features/item/itemSlice';

export type ItemProps = {
	item: ItemAttributes;
	saved: ItemDB[];
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
export const Item: FC<ItemProps> = ({ item, saved }) => {
	let navigate = useNavigate();
	const dispatch = useAppDispatch();

	const savedValidation = (item: ItemAttributes) => {
		dispatch(configureSaved(item));
	};

	return (
		<ItemContainer>
			<ItemPreview>
				<SaveIcon onClick={() => savedValidation(item)}>{saved.some((i: ItemDB) => i.id === item.id) ? <BsBookmarkFill /> : <BsBookmark />}</SaveIcon>
				<PreviewContent onClick={() => navigate(`/overview/${item.media_type}/${item.id}`)}></PreviewContent>
			</ItemPreview>
			<ItemImg src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`} alt="poster" />
		</ItemContainer>
	);
};
