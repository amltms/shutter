import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { NavLeft } from './NavLeft';
import { NavRight } from './NavRight';
import { NavFullScreen } from './NavFullScreen';
import { useLocation } from 'react-router-dom';

interface Scroll {
	scrolled: boolean;
}

const NavBar = styled.div<Scroll>`
	z-index: 1000;
	width: 100%;
	position: fixed;
	transition: 0.4s;
	padding: 2vw 4vw;
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
	${({ scrolled }) => scrolled && 'padding:1.5rem 2vw;'};
	@media screen and (max-width: 900px) {
		padding: 1rem;
	}
`;

const HamburgerMenu = styled.div`
	display: none;
	@media screen and (max-width: 900px) {
		display: block;
		cursor: pointer;
	}
`;

export const Nav = () => {
	const [scrolled, setScrolled] = useState(false);
	const [showDropdown, setShowDropDown] = useState(false);
	const location = useLocation();

	useEffect(() => {
		showDropdown && setShowDropDown(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location]);

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
			<NavFullScreen show={showDropdown} />
			<NavBar scrolled={scrolled}>
				<NavLeft />
				<NavRight />
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
