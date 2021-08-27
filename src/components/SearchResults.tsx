import { FC } from "react";
import { ItemList, ItemListProps } from "./items/ItemList";

export const SearchResults: FC<ItemListProps> = ({ items }) => {
  return (
    <div>
      <h1>Search Results...</h1>
      {items.length === 0 ? <h1>No Results</h1> : <ItemList items={items} />}
    </div>
  );
};
