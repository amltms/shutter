import { Item } from './Item';
import { FC, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { ItemAttributes } from '../../types';

export type ItemListProps = {
	items: ItemAttributes[];
};

interface SliderProps {
	currentSlide: number;
}

const Container = styled.div`
	height: auto;
	position: relative;
	overflow: hidden;
`;

const Grid = styled.div<SliderProps>`
	padding: 4rem;
	scrollbar-width: none;
	width: 100%;
	display: flex;
	transition: 0.8s;
	transform: translateX(${({ currentSlide }) => -currentSlide * 50}%);
`;

const NavBtn = styled.button`
	position: absolute;
	z-index: 100;
	font-size: 5rem;
	opacity: 0;
	padding: 1rem;
	height: 100%;
	&:hover {
		opacity: 1;
	}
`;

export const ItemList: FC<ItemListProps> = ({ items }) => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const listRef = useRef();

	let slideArr = [0, 1, 3, 4, 5];

	useEffect(() => {
		if (currentSlide > slideArr.length - 1) {
			setCurrentSlide(0);
		} else if (currentSlide < 0) {
			setCurrentSlide(slideArr.length - 1);
		}
	}, [currentSlide, slideArr.length]);

	return (
		<Container>
			<NavBtn style={{ right: 0 }} onClick={() => setCurrentSlide(currentSlide + 1)}>
				<MdNavigateNext />
			</NavBtn>

			<NavBtn onClick={() => setCurrentSlide(currentSlide - 1)}>
				<MdNavigateBefore />
			</NavBtn>
			<Grid currentSlide={currentSlide}>{items.map((i) => i.poster_path && <Item key={i.id} item={i} />)}</Grid>
		</Container>
	);
};
