import { FC } from "react";
import { Details } from "../../interfaces";
import styled from "styled-components";
interface Props {
  item: Details;
}

const DetailsContainer = styled.div`
	display: flex;
	margin-bottom:2rem;
}
`;

const Info = styled.div`
	flex:4;
}
`;

const Genres = styled.p`
	margin:1rem 0;
}`;

const Rating = styled.div`
	display:flex;
	flex-direction: column;
	justify-content: center;
  align-items: center;
	flex:1;
}`;

const Attribute = styled.span`
	margin-right:2rem;
}`;

export const OverviewDetails: FC<Props> = ({ item }) => {
  return (
    <>
      <h1>{item.title || item.original_name}</h1>

      <DetailsContainer>
        <Info>
          <p>
            <Attribute>
              {(item.release_date || item.first_air_date || "----").substring(
                0,
                4
              )}
            </Attribute>
            <span>{item.runtime} mins</span>
          </p>

          <Genres>
            {item?.genres.map((g) => (
              <Attribute>{g.name}</Attribute>
            ))}
          </Genres>
          <p>{item.overview}</p>
        </Info>
        <Rating>
          <h1>{item.vote_average}</h1>
          <p>{item.vote_count}</p>
        </Rating>
      </DetailsContainer>
    </>
  );
};
