import "./App.css";
import { FC, ChangeEvent, useState, useEffect } from "react";
import { fetchSearch } from "./api/fetchContent";
import { ItemList } from "./components/items/ItemList";
import { Home } from "./components/Home";
import { Nav } from "./components/Nav";
import { ItemOverview } from "./components/items/ItemOverview";
import { ItemAttributes } from "./components/interfaces";

const App: FC = () => {
  const [searchItems, setSearchItems] = useState<ItemAttributes[]>([]);
  const [selectedItem, setSelectedItem] = useState<ItemAttributes>({});
  useEffect(() => {
    console.log(selectedItem);
  }, [selectedItem]);

  const handleSearchInput = async (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value
      ? fetchSearch(e.target.value).then((data) => setSearchItems(data))
      : setSearchItems([]);
  };

  return (
    <div className="App">
      <ItemOverview selectedItem={selectedItem} />
      <Nav handleSearchInput={handleSearchInput} />
      {searchItems.length === 0 ? (
        <Home setSelectedItem={setSelectedItem} />
      ) : (
        <ItemList setSelectedItem={setSelectedItem} items={searchItems} />
      )}
    </div>
  );
};

export default App;
