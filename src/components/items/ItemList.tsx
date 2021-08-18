import { Item } from "./Item";
import { ItemAttributes } from "../interfaces";
import { FC } from "react";

type ItemListProps = {
  items: ItemAttributes[];
  setSelectedItem: React.Dispatch<React.SetStateAction<ItemAttributes>>;
};

export const ItemList: FC<ItemListProps> = (props) => {
  return (
    <div>
      {props.items.map(
        (i) =>
          i.poster_path && (
            <Item item={i} key={i.id} setSelectedItem={props.setSelectedItem} />
          )
      )}
    </div>
  );
};
