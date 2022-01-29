import styled from 'styled-components';
import { FC, useEffect, useState } from 'react';

interface Props {
	children: React.ReactNode;
}

interface Scroll {
	scrolled: boolean;
}

const Bar = styled.div<Scroll>`
	z-index: 100;
	width: 100%;
	position: fixed;
	transition: 0.3s;
	padding: 5rem;
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
	${({ scrolled }) => scrolled && 'padding:1rem;'};

	@media screen and (max-width: 900px) {
		padding: 1rem;
	}
`;

const Logo = styled.a`
	line-height: 0.7;
	font-size: 2.5rem;
	font-weight: bold;
`;

export const Nav: FC<Props> = (props) => {
	const [scrolled, setScrolled] = useState(false);

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
		<Bar scrolled={scrolled}>
			<Logo>Sweep</Logo>
			{props.children}
		</Bar>
	);
};
