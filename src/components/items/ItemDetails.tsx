import { FC } from "react";
import { Details } from "../interfaces";
type Props = {
  details: Details;
};

export const ItemDetails: FC<Props> = ({ details }) => {
  return (
    <div>
      <h1>{details.title || details.original_name}</h1>
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
    </div>
  );
};
