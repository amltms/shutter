import { FC } from "react";
import { Credits } from "../interfaces";
interface Props {
  credits: Credits;
}

export const ItemCredits: FC<Props> = ({ credits }) => {
  return (
    <div>
      {credits.cast.map((c) => (
        <p>{c.name}</p>
      ))}
    </div>
  );
};
