import { FC } from "react";
import { Details } from "../../interfaces";
import { GoStar } from "react-icons/go";
import styled from "styled-components";
interface Props {
  item: Details;
}

const DetailsContainer = styled.div`
  display: flex;
  margin: 2.5rem 0;

  @media screen and (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Info = styled.div`
  flex: 4;
  p:first-child {
    div:last-child {
      margin-right: 0;
    }
  }
  @media screen and (max-width: 900px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Genres = styled.div`
  margin: 1rem 0;
  font-size: 1.25rem;

  div {
    border: 1px solid #da5d5d;
    padding: 0.7rem;
    margin: 0.5rem 1rem 0.5rem 0rem;
    border-radius: 0.5rem;
  }
  div:last-child {
    margin-right: 0;
  }
`;

const ItemImg = styled.img`
  width: fit-content;
  object-fit: contain;
  border-radius: 1.2rem;
  transition: 0.5s;
  position: relative;
  overflow: hidden;
  margin-right: 2.5rem;
  height: 300px;
  @media (min-width: 1700px) {
    height: 15vw;
  }
  @media screen and (max-width: 900px) {
    margin: 0 0 2.5rem 0rem;
  }
`;

const Attribute = styled.div`
  margin-right: 2rem;
  display: inline-block;
`;

export const OverviewDetails: FC<Props> = ({ item }) => {
  return (
    <>
      <h1>{item.title || item.name}</h1>

      <DetailsContainer>
        <ItemImg
          src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
          alt="poster"
        />
        <Info>
          <p>
            <Attribute>
              {(item.release_date || item.first_air_date || "----").substring(
                0,
                4
              )}
            </Attribute>
            {item.runtime && <Attribute>{item.runtime} mins</Attribute>}
            <Attribute>
              {item.vote_average} <GoStar style={{ marginBottom: 2 }} />
            </Attribute>
          </p>

          <Genres>
            {item?.genres.map((g) => (
              <Attribute>{g.name}</Attribute>
            ))}
          </Genres>
          <p>{item.overview}</p>
        </Info>
      </DetailsContainer>
    </>
  );
};
