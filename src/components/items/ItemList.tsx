import { Item } from "./Item";
import { ItemAttributes } from "../interfaces";
import { FC } from "react";
import styled from "styled-components";

export type ItemListProps = {
  setSaved: (newVal: ItemAttributes[]) => void;
  saved: ItemAttributes[];
  items: ItemAttributes[];
  setSelectedItem: (newVal: ItemAttributes) => void;
};

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const ItemList: FC<ItemListProps> = ({
  items,
  saved,
  setSaved,
  setSelectedItem,
}) => {
  return (
    <Grid>
      {items.map(
        (i) =>
          i.poster_path && (
            <Item
              setSaved={setSaved}
              saved={saved}
              item={i}
              key={i.id}
              setSelectedItem={setSelectedItem}
            />
          )
      )}
    </Grid>
  );
};
