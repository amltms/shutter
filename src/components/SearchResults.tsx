import { FC } from "react";
import { ItemList, ItemListProps } from "./items/ItemList";

export const SearchResults: FC<ItemListProps> = ({
  setSelectedItem,
  items,
  saved,
  setSaved,
}) => {
  return (
    <div>
      <h1>Search Results...</h1>
      {items.length === 0 ? (
        <h1>No Results</h1>
      ) : (
        <ItemList
          saved={saved}
          setSaved={setSaved}
          setSelectedItem={setSelectedItem}
          items={items}
        />
      )}
    </div>
  );
};
