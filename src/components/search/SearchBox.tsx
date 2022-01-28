import { FC, ChangeEvent } from 'react';
import styled from 'styled-components';
import { fetchSearch } from '../../api/fetchContent';

interface Props {
	setSearching: any;
	setSearchItems: any;
}

const SearchInput = styled.input`
	background: #222;
	width: 30%;
	padding: 0.8rem 1.2rem;
	font-size: 1rem;
	border: none;
	color: white;
	border-radius: 5vw;
	transition: 0.2s;
	::placeholder {
		color: white;
		opacity: 0.5;
	}
`;

export const SearchBox: FC<Props> = ({ setSearching, setSearchItems }) => {
	const handleSearchInput = async (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.value) {
			setSearching(true);
			fetchSearch(e.target.value).then((data) => setSearchItems(data.results));
		} else {
			setSearching(false);
		}
	};

	return <SearchInput type="text" placeholder="Search" onChange={handleSearchInput} />;
};
