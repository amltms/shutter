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
	${({ scrolled }) => scrolled && 'background: rgb(0, 0, 0); padding:1rem;'};
	> a {
		font-size: 1.8rem;
	}
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
