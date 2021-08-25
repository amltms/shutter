import { FC } from "react";
import { ItemList, ItemListProps } from "./items/ItemList";

export const SearchResults: FC<ItemListProps> = ({
  setSelectedItem,
  items,
}) => {
  return (
    <div>
      <h1>Search Results...</h1>
      {items.length === 0 ? (
        <h1>No Results</h1>
      ) : (
        <ItemList setSelectedItem={setSelectedItem} items={items} />
      )}
    </div>
  );
};
