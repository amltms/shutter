import { FC } from "react";
import { Details } from "../../interfaces";
import { GoStar } from "react-icons/go";
import styled from "styled-components";
interface Props {
  item: Details;
}

const DetailsContainer = styled.div`
	display: flex;
	margin:2.5rem 0;
}
`;

const Info = styled.div`
	flex:4;
}
`;

const Genres = styled.p`
	margin:1rem 0;
}`;

const ItemImg = styled.img`
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
`;

const Attribute = styled.span`
	margin-right:2rem;
}`;

export const OverviewDetails: FC<Props> = ({ item }) => {
  return (
    <>
      <h1>{item.title || item.original_name}</h1>

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
              {item.vote_average} <GoStar />
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
