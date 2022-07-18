import { FC } from 'react';
import styled from 'styled-components';
import { Genre } from '../../types';
import { GenreItem } from './GenreItem';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export type ItemProps = {
	genres: Genre[];
};

const Container = styled.div`
	height: auto;
	position: relative;
	overflow: hidden;
	padding: 1rem 4rem;
	margin: 3rem 0;
	@media (max-width: 900px) {
		padding: 0;
	}
`;

export const GenreCarousel: FC<ItemProps> = ({ genres }) => {
	var settings = {
		infinite: true,
		speed: 500,
		slidesToShow: 5,
		slidesToScroll: 4,
		initialSlide: 0,
		nextArrow: <MdNavigateNext />,
		prevArrow: <MdNavigateBefore />,
		responsive: [
			{
				breakpoint: 1900,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
				},
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 800,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};
	return (
		<Container>
			<Slider {...settings}>
				{genres.map((genre) => {
					return <GenreItem key={genre.id} genre={genre} />;
				})}
			</Slider>
		</Container>
	);
};
