import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import styled from 'styled-components';
import { ItemAttributes, ItemDB } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { configureSaved } from '../../features/item/itemSlice';
import { palette } from '../../styles/palette';

export type ItemProps = {
	item: ItemAttributes;
	saved: ItemDB[];
};

interface PreviewItems {
	titleWidth: any;
}

const ItemContainer = styled.div`
	margin: 1rem 1rem 1rem 0rem;
	transition: 0.3s;
	position: relative;
	overflow: hidden;
	:hover {
		transform: translate(0, -10%);
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

const ItemPreview = styled.div<PreviewItems>`
	position: absolute;
	background: rgba(0, 0, 0, 0.8);
	border-radius: 1.2rem;
	overflow: hidden;
	height: 100%;
	width: 100%;
	transition: 0.3s;
	z-index: 10;
	opacity: 0;
	:hover {
		opacity: 1;
	}
	:hover h2 {
		transition: ${({ titleWidth }) => (titleWidth > 250 ? `${titleWidth / 0.2}ms` : `${titleWidth / 0.4}ms`)};
		transition-timing-function: linear;

		transition-delay: 0.5s;
		transform: translate(${({ titleWidth }) => (titleWidth > 180 ? `-${titleWidth - 170}px` : '0')});
	}
`;

const SaveIcon = styled.div`
	position: absolute;
	padding: 1rem;
	right: 0;
	z-index: 1000;
	font-size: 1.8rem;
`;

const PreviewContent = styled.div`
	position: absolute;
	width: 100%;
	white-space: nowrap;
	overflow: hidden;
	padding: 1.2rem;
	height: 100%;
	left: 0;
	bottom: 0;
	cursor: pointer;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	user-select: none;
	h2 {
		width: fit-content;
		font-size: 1.5rem;
		margin-bottom: 0.6rem;
		font-weight: 400;
		transition: 0.5s;
	}
	p {
		color: ${palette.secondaryTextColor};
		font-size: 1.2rem;
	}
`;
export const Item = ({ item, saved }: ItemProps) => {
	const { user } = useAppSelector((state: RootState) => state.auth);
	const [savedIcon, setSavedIcon] = useState(false);
	const [titleRef, setTitleRef] = useState(null);

	let navigate = useNavigate();
	const dispatch = useAppDispatch();
	let { type } = useParams();
	const title: any = useRef<HTMLHeadingElement>(null);

	useEffect(() => {
		title.current && setTitleRef(title.current.offsetWidth);
	}, [title]);

	useEffect(() => {
		if (saved.find((i: ItemDB) => i.id === item.id)) {
			setSavedIcon(true);
		}
	}, [item.id, saved]);

	const savedValidation = (item: ItemAttributes) => {
		setSavedIcon(!savedIcon);
		dispatch(configureSaved(item));
	};

	return (
		<ItemContainer>
			<ItemPreview titleWidth={titleRef}>
				{user && <SaveIcon onClick={() => savedValidation(item)}>{savedIcon ? <BsBookmarkFill /> : <BsBookmark />}</SaveIcon>}
				<PreviewContent onClick={() => navigate(`/overview/${item.media_type ? item.media_type : type}/${item.id}`)}>
					<h2 ref={title}>{item.title || item.name}</h2>
					<p>{(item.release_date || item.first_air_date || '----').substring(0, 4)}</p>
				</PreviewContent>
			</ItemPreview>
			<ItemImg src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`} alt="poster" />
		</ItemContainer>
	);
};
