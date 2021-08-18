import { ItemAttributes } from "../interfaces";
import { FC } from "react";
import styled from "styled-components";

export type ItemProps = {
  item: ItemAttributes;
  setSelectedItem: React.Dispatch<React.SetStateAction<ItemAttributes>>;
};

const ItemImg = styled.img`
  object-fit: contain;
  border-radius: 1.2rem;
  margin: 1rem 1rem 1rem 0rem;
  transition: 0.5s;
  position: relative;
  min-width: 200px;
  height: 300px;
  overflow: hidden;
`;

export const Item: FC<ItemProps> = (props) => {
  return (
    <ItemImg
      src={`https://image.tmdb.org/t/p/original/${props.item.poster_path}`}
      alt="poster"
      onClick={() => props.setSelectedItem(props.item)}
    />
  );
};
