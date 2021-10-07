import { FC } from "react";
import { ItemAttributes } from "../../interfaces";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

interface Props {
  item: ItemAttributes;
}

const SlideContainer = styled.div`
  position: relative;
  height: auto;
  min-width: 100%;
  overflow: hidden;
`;
const Backdrop = styled.img`
  width: 100%;
  mask-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.5) 50%,
    rgba(0, 0, 0, 0.4) 100%
  );
  @media screen and (max-width: 900px) {
    height: 70vh;
    width: auto;
    margin-left: 50%;
    transform: translate(-50%, 0%);
  }
`;

const SlideContent = styled.div`
  position: absolute;
  width: 100%;
  z-index: 2;
  bottom: 8vw;
  width: 100%;
  padding: 7vw;
  @media screen and (max-width: 900px) {
    bottom: 10%;
    h1 {
      font-size: 3rem;
    }
    p {
      font-size: 1rem;
    }
  }
`;

const DetailsBtn = styled.button`
  font-size: 1.5rem;
  font-weight: 500;
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: none;
  color: white;
  border: 1px solid white;
  border-radius: 2.5rem;

  :hover {
    background: white;
    color: black;
  }

  @media screen and (max-width: 900px) {
    padding: 0.8rem;
    font-size: 1rem;
  }
`;

const OverviewText = styled.p`
  overflow: hidden;
  font-size: 1.5rem;
  text-overflow: ellipsis;
  margin-top: 2vw;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  @media (min-width: 1800px) {
    -webkit-line-clamp: 5;
    width: 50%;
  }
`;

export const Slide: FC<Props> = ({ item }) => {
  const history = useHistory();
  const overviewHandle = () => {
    history.push(`/overview/${item.media_type}/${item.id}`);
  };
  return (
    <>
      {item && (
        <SlideContainer>
          <SlideContent>
            <h1>{item.title || item.name}</h1>
            <OverviewText>{item.overview}</OverviewText>
            <DetailsBtn onClick={() => overviewHandle()}>
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
