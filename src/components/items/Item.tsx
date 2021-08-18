import { ItemAttributes } from "../interfaces";
import { FC } from "react";

type ItemProps = {
  item: ItemAttributes;
  setSelectedItem: React.Dispatch<React.SetStateAction<ItemAttributes>>;
};

export const Item: FC<ItemProps> = (props) => {
  return (
    <img
      onClick={() => props.setSelectedItem(props.item)}
      className="poster-img"
      height="300px"
      src={`https://image.tmdb.org/t/p/original/${props.item.poster_path}`}
      alt="poster"
    />
  );
};
