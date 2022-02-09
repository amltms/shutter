import { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { fetchSearch } from '../../../api/fetchContent';
import { ItemAttributes } from '../../interfaces';
import { ItemList } from '../../items/ItemList';

const SearchContainer = styled.div`
	padding: 12vw 7vw;
`;
const Text = styled.div`
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	h2 {
		color: #333;
	}
`;

export const SearchResults2: FC = () => {
	const [searchItems, setSearchItems] = useState<ItemAttributes[]>([]);
	let { search } = useParams();
	let filterTimeout: { current: NodeJS.Timeout | null } = useRef(null);

	useEffect(() => {
		/*debounce */
		clearInterval(filterTimeout.current as NodeJS.Timeout);
		filterTimeout.current = setTimeout(() => {
			search && fetchSearch(search).then((data) => setSearchItems(data.results));
		}, 400);
	}, [search]);

	return (
		<>
			{searchItems.length === 0 ? (
				<Text>
					<h2>No Results</h2>
				</Text>
			) : (
				<SearchContainer>
					<ItemList items={searchItems} />
				</SearchContainer>
			)}
		</>
	);
};
