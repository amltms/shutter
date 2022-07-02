import styled from 'styled-components';
import { FC } from 'react';
import { palette } from '../../styles/palette';
import { NavLink } from 'react-router-dom';

interface Props {
	show: boolean;
}

const FullScreenMenu = styled.div<Props>`
	position: fixed;
	background-color: black;
	height: 100vh;
	width: 100%;
	z-index: 120;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	display: ${({ show }) => (show ? 'flex' : 'none')};

	a {
		font-size: 2rem;
		padding: 1rem;
		:hover {
			color: ${palette.primary};
		}
	}
`;

export const NavFullScreen: FC<Props> = ({ show }) => {
	return (
		<FullScreenMenu show={show}>
			<NavLink to="movie" className={(navData) => (navData.isActive ? 'active' : '')}>
				Movies
			</NavLink>
			<NavLink to="tv">TV</NavLink>
			<NavLink to="saved">Saved</NavLink>
			<NavLink to="login">Login</NavLink>
		</FullScreenMenu>
	);
};
