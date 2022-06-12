import styled from 'styled-components';
import { FaUserCircle } from 'react-icons/fa';
import { AiOutlineUser } from 'react-icons/ai';
import { MdLogout } from 'react-icons/md';
import { FC, useEffect, useState } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { RootState } from '../../app/store';
import { logout, reset } from '../../features/auth/authSlice';
import { palette } from '../../styles/palette';
import { Search } from './Search';

interface Scroll {
	scrolled: boolean;
}
interface NavProps {
	showDropDown: boolean;
}

const NavBar = styled.div<Scroll>`
	z-index: 1000;
	width: 100%;
	position: fixed;
	transition: 0.4s;
	padding: 3rem 8vw;
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	:after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
		transform: scaleY(${({ scrolled }) => (scrolled ? '1' : '0')});
		transform-origin: top center;
		background: rgba(0, 0, 0, 1);
		z-index: -1;
		transition: transform 0.3s;
	}
	${({ scrolled }) => scrolled && 'padding:1.5rem;'};
	@media screen and (max-width: 900px) {
		padding: 1rem;
	}
`;

const MenuLinks = styled.div<NavProps>`
	display: flex;
	align-items: baseline;
	a {
		font-size: 22px;
		padding: 0 1rem;
		margin: 0;
		color: ${palette.secondaryTextColor};
		position: relative;
		:after {
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
		:hover {
			color: ${palette.primaryTextColor};
		}
	}
	@media screen and (max-width: 900px) {
		display: ${(props) => (props.showDropDown ? 'flex' : 'none')};
		position: absolute;
		top: 0;
		left: 0;
		background-color: black;
		height: 100vh;
		width: 100%;
		z-index: -1;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		a {
			padding: 2.5rem;
		}
	}
`;

const NavLeft = styled.div`
	display: flex;
	align-items: flex-end;
`;

const NavRight = styled.div`
	display: flex;
	align-items: center;
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

const HamburgerMenu = styled.div`
	display: none;
	@media screen and (max-width: 900px) {
		display: block;
		cursor: pointer;
	}
`;

const Login = styled(Link)`
	font-size: 1.3rem;
	margin-left: 0.5rem;
	display: inline-block;
`;

const DropDownMenu = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	padding-left: 0.5rem;
	svg {
		fill: ${palette.secondaryTextColor};
		font-size: 1.7rem;
	}
	:hover {
		> div {
			display: block;
		}
	}
`;

const Dropdown = styled.div`
	display: none;
	position: absolute;
	right: 0;
	top: 100%;
	width: 200px;
	background-color: #0d0d0d;
	box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
	z-index: 1;
	padding: 0.5rem;
	border-radius: 0.5rem;
	svg {
		margin-right: 0.3rem;
	}
	hr {
		margin: 0.2rem 0 !important;
	}

	button {
		padding: 0.8rem;
		width: 100%;
		font-size: 1.2rem;
		text-align: left;
		display: flex;
		align-items: center;
		border-radius: 0.5rem;

		:hover {
			background-color: #090909;
			color: ${palette.primary};
		}
	}
`;

const Profile = styled.div`
	padding: 0.8rem;
	display: flex;
	align-items: center;
	p {
		font-size: 1.2rem;
		display: inline-block;
	}
`;

export const Nav: FC = () => {
	const [scrolled, setScrolled] = useState(false);
	const [showDropdown, setShowDropDown] = useState(false);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state: RootState) => state.auth);

	const onLogout = () => {
		dispatch(logout());
		dispatch(reset());
		navigate('/');
	};

	useEffect(() => {
		const handleScroll = () => {
			const show = window.scrollY > 10;
			show ? setScrolled(true) : setScrolled(false);
		};

		document.addEventListener('scroll', handleScroll);
		return () => {
			document.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<>
			<NavBar scrolled={scrolled}>
				<NavLeft>
					<Logo to="/">Shutter</Logo>
					<MenuLinks showDropDown={showDropdown}>
						<NavLink to="movie" className={(navData) => (navData.isActive ? 'active' : '')}>
							Movies
						</NavLink>
						<NavLink to="tv">TV</NavLink>
						<NavLink to="saved">Saved</NavLink>
					</MenuLinks>
				</NavLeft>
				<NavRight>
					<Search />
					{user ? (
						<DropDownMenu>
							<AiOutlineUser />
							<Dropdown>
								<Profile>
									<AiOutlineUser />
									<p>{`${user.firstName} ${user.lastName}`}</p>
								</Profile>
								<hr />
								<button onClick={onLogout}>
									<MdLogout />
									Logout
								</button>
							</Dropdown>
						</DropDownMenu>
					) : (
						<Login to="/login">Login</Login>
					)}
				</NavRight>
				<HamburgerMenu onClick={() => setShowDropDown(!showDropdown)} className={`nav-icon ${showDropdown && ' open'}`}>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
				</HamburgerMenu>
			</NavBar>
		</>
	);
};
