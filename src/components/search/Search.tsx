import { FC, useState, ChangeEvent } from "react";
import styled from "styled-components";
import { ItemAttributes } from "../interfaces";
import { fetchSearch } from "../../api/fetchContent";
import { SearchResults } from "./SearchResults";

interface Props {}

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 12rem;
`;
const SearchBox = styled.input`
  background: #222;
  width: 50%;
  padding: 1.5rem 2rem;
  font-size: 2rem;
  border: none;
  color: white;
  border-radius: 5vw;
  transition: 0.2s;
  ::placeholder {
    color: white;
    opacity: 0.5;
  }
`;
export const Search: FC<Props> = (props) => {
  const [searchItems, setSearchItems] = useState<ItemAttributes[]>([]);
  const [searching, setSearching] = useState(false);

  const handleSearchInput = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setSearching(true);
      fetchSearch(e.target.value).then((data) => setSearchItems(data.results));
    } else {
      setSearching(false);
    }
  };
  return (
    <>
      <Container>
        <SearchBox
          type="text"
          placeholder="Search"
          onChange={handleSearchInput}
        />
      </Container>
      {searching && <SearchResults items={searchItems} />}
    </>
  );
};
