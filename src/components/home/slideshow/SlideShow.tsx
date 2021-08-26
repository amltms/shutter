import { FC, useState, useEffect } from "react";
import { ItemAttributes } from "../../interfaces";
import styled from "styled-components";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { Slide } from "./Slide";

interface Props {
  popularItems: ItemAttributes[];
}

interface SliderProps {
  currentSlide: number;
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
	overflow:hidden;
}
`;

const Slider = styled.div<SliderProps>`
scrollbar-width: none;
	width: 100%;
  display: flex;
  transition: 0.8s;
	transform: translateX(${(props) => props.currentSlide}%);
	
}
`;

export const SlideShow: FC<Props> = ({ popularItems }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  let slideArr = [6, 7, 8];

  useEffect(() => {
    if (currentSlide === 100) {
      setCurrentSlide(-(slideArr.length * 100 - 100));
    } else if (currentSlide === -slideArr.length * 100) {
      setCurrentSlide(0);
    }
  }, [currentSlide]);

  return (
    <Container>
      <NavBtn
        style={{ right: 0 }}
        onClick={() => setCurrentSlide(currentSlide - 100)}
      >
        <MdNavigateNext />
      </NavBtn>

      <NavBtn onClick={() => setCurrentSlide(currentSlide + 100)}>
        <MdNavigateBefore />
      </NavBtn>
      <Slider currentSlide={currentSlide}>
        {slideArr.map((i) => (
          <Slide item={popularItems[i]} />
        ))}
      </Slider>
    </Container>
  );
};
