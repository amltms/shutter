import { useState, useEffect, FC } from "react";
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
  padding: 5rem;
  justify-content: space-between;
  transition: 0.3s;

  ${({ scrolled }) => scrolled && "background: rgb(0, 0, 0); padding:1.5rem;"};
  > a {
    font-size: 1.8rem;
  }
`;

const NavLeft = styled.div`
  display: flex;
  align-items: flex-end;
  a {
    font-size: 1.2rem;
    padding-right: 1.5rem;
    :hover {
      color: #da5d5d;
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

export const Nav: FC = () => {
  const [scrolled, setScrolled] = useState(false);

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
    <Bar scrolled={scrolled}>
      <NavLeft>
        <Logo>
          <NavLink activeClassName="active" to="/">
            Screens
          </NavLink>
        </Logo>
        <NavLink activeClassName="active" exact to="/index/movie">
          Movies
        </NavLink>
        <NavLink activeClassName="active" exact to="/index/tv">
          TV
        </NavLink>
        <NavLink activeClassName="active" exact to="/saved">
          Saved
        </NavLink>
      </NavLeft>
      <NavLink activeClassName="active" exact to="/search">
        <MdSearch />
      </NavLink>
    </Bar>
  );
};
