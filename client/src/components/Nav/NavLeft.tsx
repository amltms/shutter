import styled from 'styled-components';
import { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { palette } from '../../styles/palette';

const MenuLinks = styled.div`
	display: flex;
	align-items: baseline;
	span {
		display: none;
	}
	a {
		font-size: 22px;
		padding: 0 1rem;
		margin: 0;
		position: relative;
		:after {
			color: ${palette.primaryTextColor};
			content: '';
			position: absolute;
			width: 100%;
			transform: scaleX(0);
			height: 2px;
			bottom: -8px;
			left: 0;
			background-color: ${palette.primary};
			transition: transform 0.3s ease-out;
		}
		:hover:after {
			transform: scaleX(1);
		}
	}
	@media screen and (max-width: 900px) {
		display: none;
	}
`;

const Container = styled.div`
	display: flex;
	align-items: flex-end;
`;

const Logo = styled(Link)`
	line-height: 0.7;
	font-size: 50px;
	font-weight: bold;
	margin-right: 1.5rem;
	transition: 0.3s;
	letter-spacing: 0.1rem;
	color: ${palette.primary};
	-webkit-text-stroke: 1px ${palette.primary};
	:hover {
		color: rgba(0, 0, 0, 0);
	}
`;

export const NavLeft: FC = () => {
	return (
		<Container>
			<Logo to="/">Shutter</Logo>
			<MenuLinks>
				<NavLink to="movie" className={(navData) => (navData.isActive ? 'active' : '')}>
					Movies
				</NavLink>
				<NavLink to="tv">TV</NavLink>
				<NavLink to="saved">Saved</NavLink>
			</MenuLinks>
		</Container>
	);
};
