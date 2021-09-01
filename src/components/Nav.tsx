import { ChangeEventHandler, useState, useEffect } from "react";
import styled from "styled-components";
import { MdSearch } from "react-icons/md";
import { NavLink } from "react-router-dom";
interface Scroll {
  scrolled: boolean;
}
const Bar = styled.div<Scroll>`
  position: fixed;
  display: flex;
  z-index: 1000;
  width: 100%;
  padding: 2rem;
  justify-content: space-between;
  transition: 0.3s;
  ${({ scrolled }) => scrolled && "background: rgb(0, 0, 0); padding:1rem;"};

  a {
    font-size: 1.3rem;
    padding-right: 1.5rem;
    :hover {
      color: #da5d5d;
    }
  }
`;

const Search = styled.input`
  font-size: 1rem;
  border: none;
  background: transparent;
  color: white;
  border-radius: 10vw;
  transition: 0.2s;
  padding: 0 0.5rem;
  ::placeholder {
    color: white;
    opacity: 0.8;
  }
`;

const SearchBox = styled.form`
  padding: 0.5rem;
  border: 1px solid white;
  border-radius: 10vw;
  display: flex;
  align-items: center;
  font-size: 1.5rem;
`;

const NavLeft = styled.div`
  display: flex;
  align-items: flex-end;
`;

const Logo = styled.div`
  a {
    line-height: 0.7;
    font-size: 2.5rem;
    font-weight: bold;
  }
`;

interface Props {
  handleSearchInput: ChangeEventHandler<HTMLInputElement>;
}

export const Nav = ({ handleSearchInput }: Props) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 300;
      show ? setScrolled(true) : setScrolled(false);
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Bar scrolled={scrolled}>
      <NavLeft>
        <Logo>
          <NavLink activeClassName="active" to="/">
            Screens
          </NavLink>
        </Logo>
        <NavLink activeClassName="active" exact to="/movie">
          Movies
        </NavLink>
        <NavLink activeClassName="active" exact to="/tv">
          TV
        </NavLink>
        <NavLink activeClassName="active" exact to="/saved">
          Saved
        </NavLink>
      </NavLeft>

      <SearchBox className="search-box">
        <MdSearch />
        <Search type="text" placeholder="Search" onChange={handleSearchInput} />
      </SearchBox>
    </Bar>
  );
};
