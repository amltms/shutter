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
  const [selectedItem, setSelectedItem] = useState<ItemAttributes>();
  const [overviewOpen, setOverviewOpen] = useState(false);

  useEffect(() => {
    selectedItem !== null && setOverviewOpen(true);
    console.log("hi");
  }, [selectedItem]);

  const handleSearchInput = async (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value
      ? fetchSearch(e.target.value).then((data) => setSearchItems(data.results))
      : setSearchItems([]);
  };

  return (
    <div className="App">
      {selectedItem && overviewOpen && (
        <ItemOverview
          selectedItem={selectedItem}
          setOverviewOpen={setOverviewOpen}
        />
      )}

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
