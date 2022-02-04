import { FC } from 'react';
import { ItemAttributes } from '../../interfaces';
import styled from 'styled-components';

interface Props {
	item: ItemAttributes;
}

const SlideContainer = styled.div`
	position: relative;
	height: auto;
	min-width: 100%;
	overflow: hidden;
`;
const Backdrop = styled.img`
	width: 100%;
	mask-image: linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.4) 100%);
	@media screen and (max-width: 900px) {
		height: 70vh;
		width: auto;
		margin-left: 50%;
		transform: translate(-50%, 0%);
	}
`;

export const Slide: FC<Props> = ({ item }) => {
	return (
		<>
			{item && (
				<SlideContainer>
					<Backdrop src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`} />
				</SlideContainer>
			)}
		</>
	);
};
