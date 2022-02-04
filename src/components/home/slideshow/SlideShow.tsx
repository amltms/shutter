import { FC, useState, useEffect, useRef } from 'react';
import { ItemAttributes } from '../../interfaces';
import styled from 'styled-components';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { Slide } from './Slide';
import { SlideContent } from './SlideContent';

interface Props {
	popularItems: ItemAttributes[];
}

interface SliderProps {
	currentSlide: number;
}
interface DotProps {
	dotNumber: number;
	currentSlide: number;
}
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

const Container = styled.div`
	height: auto;
	position: relative;
	overflow: hidden;
`;

const DotContainer = styled.div`
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	bottom: 8%;
	z-index: 10;
	width: auto;
	cursor: pointer;
`;

const Dot = styled.div<DotProps>`
	height: 1rem;
	width: 1rem;
	background-color: ${({ dotNumber, currentSlide }) => (dotNumber === currentSlide ? '#da5d5d;' : '#3d3d3d')};
	border-radius: 50%;
	display: inline-block;
	margin: 0.3rem;
`;

const Slider = styled.div<SliderProps>`
	scrollbar-width: none;
	width: 100%;
	display: flex;
	transition: 0.8s;
	transform: translateX(${({ currentSlide }) => -currentSlide * 100}%);
`;

export const SlideShow: FC<Props> = ({ popularItems }) => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const timer: { current: NodeJS.Timeout | null } = useRef(null);

	let slideArr = [0, 1, 2];

	useEffect(() => {
		clearInterval(timer.current as NodeJS.Timeout);
		timer.current = setInterval(() => {
			setCurrentSlide(currentSlide + 1);
		}, 10000);

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

			<SlideContent slideContent={popularItems[currentSlide]} />

			<Slider currentSlide={currentSlide}>
				{slideArr.map((i) => (
					<Slide key={i} item={popularItems[i]} />
				))}
			</Slider>
			<DotContainer>
				{slideArr.map((i) => (
					<Dot dotNumber={i} currentSlide={currentSlide} onClick={() => setCurrentSlide(i)} />
				))}
			</DotContainer>
		</Container>
	);
};
