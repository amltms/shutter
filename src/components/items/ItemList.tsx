import { Item } from "./Item";
import { ItemAttributes } from "../interfaces";
import { FC } from "react";
import styled from "styled-components";
type ItemListProps = {
  items: ItemAttributes[];
  setSelectedItem: React.Dispatch<
    React.SetStateAction<ItemAttributes | undefined>
  >;
};

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const ItemList: FC<ItemListProps> = (props) => {
  return (
    <Grid>
      {props.items.map(
        (i) =>
          i.poster_path && (
            <Item item={i} key={i.id} setSelectedItem={props.setSelectedItem} />
          )
      )}
    </Grid>
  );
};
