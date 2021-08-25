import { FC, useState, useEffect } from "react";
import { ItemAttributes } from "../../interfaces";
import styled from "styled-components";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { Slide } from "./Slide";

interface Props {
  popularItems: ItemAttributes[];
}

const NavBtn = styled.button`
  position:absolute;
	z-index:100;
	font-size:5rem;
	opacity:0;
	padding:1rem;
	height:100%;

	&:hover {
    opacity:1;
  }
}
`;

const Container = styled.div`
  height:auto;
	position:relative;
}
`;

export const Slider: FC<Props> = ({ popularItems }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {}, [currentSlide]);

  return (
    <Container>
      <NavBtn
        style={{ right: 0 }}
        onClick={() => setCurrentSlide(currentSlide + 1)}
      >
        <MdNavigateNext />
      </NavBtn>

      <NavBtn onClick={() => setCurrentSlide(currentSlide - 1)}>
        <MdNavigateBefore />
      </NavBtn>
      <Slide item={popularItems[6]} />
    </Container>
  );
};
