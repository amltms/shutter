import styled from 'styled-components';
import { FC, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { SearchBox } from './search/SearchBox';
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
	transition: 0.3s;
	padding: 5rem 5rem 0rem 5rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	:after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
		transform: scaleY(${({ scrolled }) => (scrolled ? '1' : '0')});
		transform-origin: top center;
		background: #000000;
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
		font-size: 1.2rem;
		padding-left: 1.5rem;
		:hover {
			color: #c37373;
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
	align-items: center;
`;

const Logo = styled(NavLink)`
	line-height: 0.7;
	font-size: 3rem !important;
	font-weight: bold;
	color: #da5d5d;
`;

const HamburgerMenu = styled.div`
	display: none;
	@media screen and (max-width: 900px) {
		display: block;
		cursor: pointer;
	}
`;

export const Nav: FC = () => {
	const [scrolled, setScrolled] = useState(false);
	const [showDropdown, setShowDropDown] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const show = window.scrollY > 100;
			show ? setScrolled(true) : setScrolled(false);
		};

		document.addEventListener('scroll', handleScroll);
		return () => {
			document.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<NavBar scrolled={scrolled}>
			<NavLeft>
				<Logo to="/">Sweep</Logo>
				<MenuLinks showDropDown={showDropdown}>
					<NavLink to="movie">Movies</NavLink>
					<NavLink to="tv">TV</NavLink>
					<NavLink to="saved">Saved</NavLink>
				</MenuLinks>
			</NavLeft>
			<SearchBox />
			<HamburgerMenu onClick={() => setShowDropDown(!showDropdown)} className={`nav-icon ${showDropdown && ' open'}`}>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</HamburgerMenu>
		</NavBar>
	);
};
