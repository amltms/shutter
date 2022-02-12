import { FC } from 'react';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import styled from 'styled-components';

interface Props {
	setCurrentSlide: any;
	currentSlide: number;
	slideArr: number[];
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

const DotContainer = styled.div`
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	bottom: 8vw;
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

export const SlideNavigation: FC<Props> = ({ setCurrentSlide, currentSlide, slideArr }) => {
	return (
		<>
			<NavBtn style={{ right: 0 }} onClick={() => setCurrentSlide(currentSlide + 1)}>
				<MdNavigateNext />
			</NavBtn>

			<NavBtn onClick={() => setCurrentSlide(currentSlide - 1)}>
				<MdNavigateBefore />
			</NavBtn>

			<DotContainer>
				{slideArr.map((i) => (
					<Dot key={i} dotNumber={i} currentSlide={currentSlide} onClick={() => setCurrentSlide(i)} />
				))}
			</DotContainer>
		</>
	);
};
