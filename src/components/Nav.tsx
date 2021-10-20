import { useState, useEffect, FC } from "react";
import { useHistory, NavLink } from "react-router-dom";
import styled from "styled-components";
import { MdSearch } from "react-icons/md";

interface Scroll {
  scrolled: boolean;
  showDropDown: boolean;
}
interface NavProps {
  showDropDown: boolean;
}

const Bar = styled.div<Scroll>`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  width: 100%;
  padding: 5rem 5rem 0rem 5rem;
  transition: 0.3s;
  ${({ scrolled }) => scrolled && "background: rgb(0, 0, 0); padding:1rem;"};
  > a {
    font-size: 1.8rem;
  }
  @media screen and (max-width: 900px) {
    padding: 1rem;
  }
`;

const NavLeft = styled.div<NavProps>`
  display: flex;
  align-items: baseline;
  a {
    font-size: 1.2rem;
    padding-left: 1.5rem;
    :hover {
      color: #da5d5d;
    }
  }
  a:last-of-type {
    font-size: 2rem;
  }
  @media screen and (max-width: 900px) {
    display: ${(props) => (props.showDropDown ? "flex" : "none")};
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

const Logo = styled.div`
  a {
    line-height: 0.7;
    font-size: 2.5rem;
    font-weight: bold;
  }
`;

const Bars = styled.div`
  display: none;
  @media screen and (max-width: 901px) {
    display: block;
    cursor: pointer;
  }
`;

const Search = styled(MdSearch)``;

export const Nav: FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropDown] = useState(false);
  const history = useHistory();

  useEffect(() => {
    return history.listen((location) => {
      setShowDropDown(false);
    });
  }, [history]);

  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 100;
      show ? setScrolled(true) : setScrolled(false);
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Bar showDropDown={showDropdown} scrolled={scrolled}>
      <div className="flex">
        <Logo>
          <NavLink activeClassName="active" to="/">
            Sweep
          </NavLink>
        </Logo>
        <NavLeft showDropDown={showDropdown}>
          <NavLink exact to="/">
            Home
          </NavLink>
          <NavLink to="/movie">Movies</NavLink>
          <NavLink to="/tv">TV</NavLink>
          <NavLink to="/saved">Saved</NavLink>
          <NavLink to="/search">
            <Search />
          </NavLink>
        </NavLeft>
      </div>
      <Bars>
        <div
          onClick={() => setShowDropDown(!showDropdown)}
          className={`nav-icon ${showDropdown && " open"}`}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </Bars>
    </Bar>
  );
};
