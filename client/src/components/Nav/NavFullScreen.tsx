import styled from 'styled-components';
import { FC } from 'react';
import { palette } from '../../styles/palette';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { RootState } from '../../app/store';
import { logout, reset } from '../../features/auth/authSlice';
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

	a,
	button {
		font-size: 2rem;
		font-weight: 300;
		padding: 1rem;
		:hover {
			color: ${palette.primary};
		}
	}
`;

export const NavFullScreen: FC<Props> = ({ show }) => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state: RootState) => state.auth);
	const navigate = useNavigate();

	const onLogout = () => {
		dispatch(logout());
		dispatch(reset());
		navigate('/');
	};

	return (
		<FullScreenMenu show={show}>
			<NavLink to="movie" className={(navData) => (navData.isActive ? 'active' : '')}>
				Movies
			</NavLink>
			<NavLink to="tv">TV</NavLink>
			<NavLink to="saved">Saved</NavLink>
			{user ? <button onClick={onLogout}>Logout</button> : <NavLink to="login">Login</NavLink>}
		</FullScreenMenu>
	);
};
