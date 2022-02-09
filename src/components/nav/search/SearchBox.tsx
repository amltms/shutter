import { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import { MdSearch, MdClear } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';

interface ClearProps {
	searching: string;
}

const SearchInput = styled.input`
	background: none;
	font-size: 1.2rem;
	border: none;
	transition: 0.2s;
	::placeholder {
		color: white;
		opacity: 1;
	}
`;

const Box = styled.div`
	border: 1px solid white;
	border-radius: 5vw;
	transition: 0.2s;
	display: flex;
	align-items: center;
	padding: 0.8rem;
`;

const Search = styled(MdSearch)`
	font-size: 1.3rem;
	display: block;
	margin-right: 0.4rem;
`;

const Clear = styled(MdClear)<ClearProps>`
	opacity: ${({ searching }) => (searching ? '1' : '0')};
`;

export const SearchBox: FC = () => {
	const [searchValue, setSearchValue] = useState('');
	let navigate = useNavigate();
	const { pathname } = useLocation();

	useEffect(() => {
		// clear searchbox if not searching and changing page
		!pathname.startsWith('/search') && searchValue && setSearchValue('');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

	useEffect(() => {
		if (searchValue) {
			navigate(`/search/${searchValue}`);
		} else {
			navigate(`/`);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchValue]);

	return (
		<Box>
			<Search />
			<SearchInput type="text" value={searchValue} placeholder="Search" onChange={(e) => setSearchValue(e.target.value)} />
			<Clear onClick={() => setSearchValue('')} searching={searchValue} />
		</Box>
	);
};
