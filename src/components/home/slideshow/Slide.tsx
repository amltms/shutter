import { FC, useContext } from "react";
import { ItemAttributes } from "../../interfaces";
import styled from "styled-components";
import { ItemContext } from "../../context/ItemContext";

interface Props {
  item: ItemAttributes;
}

const SlideContainer = styled.div`
  position:relative;
	height:auto;
  min-width: 100%;
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
  bottom: 8vw;
	width:100%;
  padding: 7vw;
}
`;

const DetailsBtn = styled.button`
	font-size: 1.5rem;
	color: black;
  font-weight: 500;
  margin-top: 1.5rem;
  padding: 1rem 1.5rem;
  background-color:none;
	color:white;
	border:1px solid white;
	border-radius: 2.5rem;

	:hover{
		background:white;
		color:black;
	}
}
`;

const OverviewText = styled.p`
	overflow: hidden;
  text-overflow: ellipsis;
	margin-top:2vw;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
	 @media (min-width: 1800px) {
		-webkit-line-clamp: 5;
    width:60%;
  }
}
`;

export const Slide: FC<Props> = ({ item }) => {
  const { setSelectedItem } = useContext(ItemContext);
  return (
    <>
      {item && (
        <SlideContainer>
          <SlideContent>
            <h1>{item.title || item.original_name}</h1>
            <OverviewText>{item.overview}</OverviewText>
            <DetailsBtn onClick={() => setSelectedItem(item)}>
              More Details
            </DetailsBtn>
          </SlideContent>
          <Backdrop
            src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
          />
        </SlideContainer>
      )}
    </>
  );
};
