import { FC } from "react";
import { ItemAttributes } from "../../interfaces";
import styled from "styled-components";

interface Props {
  item: ItemAttributes;
}

const SlideContainer = styled.div`
  position:relative;
	height:auto;
}
`;
const Backdrop = styled.img`
  width:100%;
  mask-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0) 10%,
    rgba(0, 0, 0, 0.7) 90%
  );
}
`;

const SlideContent = styled.div`
  position: absolute;
  width: 100%;
  z-index: 2;
  bottom: 12vw;
	width:80%;
  padding: 7vw;
}
`;

const DetailsBtn = styled.button`
  padding: 1rem 1.5rem;
  border-radius: 2.5rem;
  font-size: 1.2rem;
  margin-top: 1rem;
  color: black;
  background-color: white;
  font-weight: 500;
}
`;
export const Slide: FC<Props> = ({ item }) => {
  return (
    <>
      {item && (
        <SlideContainer>
          <SlideContent>
            <h1>{item.title || item.original_name}</h1>
            <p>{item.overview}</p>
            <DetailsBtn>More Details</DetailsBtn>
          </SlideContent>
          <Backdrop
            src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
          />
        </SlideContainer>
      )}
    </>
  );
};
