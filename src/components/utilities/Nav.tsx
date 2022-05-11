import styled from 'styled-components';
import { FC, useEffect, useRef, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import * as palette from '../../styles/palette';
import { MdSearch, MdClear } from 'react-icons/md';

interface Scroll {
	scrolled: boolean;
}

interface NavProps {
	showDropDown: boolean;
}

interface searchProps {
	active: boolean;
}

const SearchInput = styled.input<searchProps>`
	background: none;
	font-size: 1.2rem;
	border: none;
	transition: 0.5s;
	width: ${({ active }) => (active ? '15rem' : '0')};
	transform-origin: left;
	margin-left: 0.5rem;
	::placeholder {
		color: ${palette.secondaryTextColor};
		opacity: 1;
	}
`;

const SearchBox = styled.div<searchProps>`
	transition: 1s;
	border: 2.5px solid;
	padding: 0.5rem;
	padding-right: 0;
	border-color: ${({ active }) => (active ? 'rgba(215, 215, 215, 0.3)' : 'transparent')};
	border-radius: 1.5rem;
	display: flex;
	@media screen and (max-width: 900px) {
		padding: 1rem;
	}
`;

const NavBar = styled.div<Scroll>`
	z-index: 1000;
	width: 100%;
	position: fixed;
	transition: 0.6s;
	:after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
		transform: scaleY(${({ scrolled }) => (scrolled ? '1' : '0')});
		transform-origin: top center;
		background: rgba(0, 0, 0, 0.8);
		z-index: -1;
		transition: transform 0.3s;
	}
	@media screen and (max-width: 900px) {
		padding: 1rem;
	}
`;
const NavContent = styled.div`
	padding: 1.5vw 8vw;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const MenuLinks = styled.div<NavProps>`
	display: flex;
	align-items: baseline;
	a {
		font-size: 1.5rem;
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
			background-color: ${palette.baseColor};
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

const Logo = styled(Link)`
	line-height: 0.7;
	font-size: 3.5rem !important;
	font-weight: bold;
	margin-right: 1.5rem;
	transition: 0.3s;
	letter-spacing: 0.1rem;
	color: ${palette.baseColor};
	-webkit-text-stroke: 1px ${palette.baseColor};
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

const NavLine = styled.hr`
	margin: 0 auto;
	width: 100%;
	border: 0;
	height: 2px;
	background: rgba(247, 247, 247, 0);
	background-image: linear-gradient(to right, rgba(247, 247, 247, 0), rgba(255, 255, 255, 0.2), rgba(247, 247, 247, 0));
`;

export const Nav: FC = () => {
	const [scrolled, setScrolled] = useState(false);
	const [searchActive, setSearchActive] = useState(false);
	const [showDropdown, setShowDropDown] = useState(false);

	const searchInput = useRef<HTMLInputElement>(null);

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

	useEffect(() => {
		searchActive && searchInput.current && searchInput.current.focus();
	}, [searchActive]);

	return (
		<>
			<NavBar scrolled={scrolled}>
				<NavContent>
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
					<SearchBox active={searchActive}>
						<MdSearch size={30} onClick={() => setSearchActive(!searchActive)} />
						<SearchInput ref={searchInput} placeholder="Search" active={searchActive} />
					</SearchBox>
					<HamburgerMenu onClick={() => setShowDropDown(!showDropdown)} className={`nav-icon ${showDropdown && ' open'}`}>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
					</HamburgerMenu>
				</NavContent>
				<NavLine />
			</NavBar>
		</>
	);
};
