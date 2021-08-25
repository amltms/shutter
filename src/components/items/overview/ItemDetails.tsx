import { FC } from "react";
import { Details, Credits } from "../../interfaces";
import styled from "styled-components";
import { ItemCredits } from "./ItemCredits";
type Props = {
  details: Details;
  credits: Credits;
};

const OverviewDetails = styled.div`
	z-index:99;
	position:relative;
	padding:10vw 10vw 0vw 10vw;
}
`;

const Backdrop = styled.img`
  position: absolute;
  top: 0;
  width:100%;
	filter: brightness(60%);
  mask-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0) 30%,
    rgba(0, 0, 0, 0.7) 100%
  );
}
`;

const DetailsContainer = styled.div`
	display: flex;
	margin: 1rem 0;
}
`;

const Rating = styled.div`
	display:flex;
	flex-direction: column;
  align-items: center;
	flex:1;
}
`;

export const ItemDetails: FC<Props> = ({ details, credits }) => {
  return (
    <div>
      <Backdrop
        src={`https://image.tmdb.org/t/p/original/${details.backdrop_path}`}
        alt="poster"
      />
      <OverviewDetails>
        <h1>{details.title || details.original_name}</h1>
        <p>
          <span style={{ marginRight: "1rem" }}>
            {(
              details.release_date ||
              details.first_air_date ||
              "----"
            ).substring(0, 4)}
          </span>
          <span>{details.runtime} mins</span>
        </p>

        <p>
          {details.genres.map((g) => (
            <span style={{ marginRight: "2rem" }}>{g.name}</span>
          ))}
        </p>

        <DetailsContainer>
          <p style={{ flex: 3 }}>{details.overview}</p>
          <Rating>
            <h1>{details.vote_average}</h1>
            <p>{details.vote_count}</p>
          </Rating>
        </DetailsContainer>
        <ItemCredits credits={credits} />
      </OverviewDetails>
    </div>
  );
};
