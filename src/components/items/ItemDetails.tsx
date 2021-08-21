import { FC } from "react";
import { Details, Credits } from "../interfaces";
import styled from "styled-components";
import { ItemCredits } from "./ItemCredits";
type Props = {
  details: Details;
  credits: Credits;
};

const OverviewDetails = styled.div`
	z-index:99;
	position:relative;
}
`;
const Backdrop = styled.img`
  position: absolute;
  top: 0;
  width: 100%;
	filter: brightness(40%);
  mask-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.7) 40%
  );
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
          {details.genres.map((g) => (
            <span>{g.name}</span>
          ))}
        </p>
        <p>
          {(details.release_date || details.first_air_date || "----").substring(
            0,
            4
          )}
        </p>
        <span>{details.runtime} mins</span>
        <p>{details.overview}</p>
        <h1>{details.vote_average}</h1>
        <h2>{details.vote_count}</h2>
        <ItemCredits credits={credits} />
      </OverviewDetails>
    </div>
  );
};
