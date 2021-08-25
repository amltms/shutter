import "./App.css";
import { FC, ChangeEvent, useState, useEffect } from "react";
import { fetchSearch } from "./api/fetchContent";
import { ItemList } from "./components/items/ItemList";
import { Home } from "./components/home/Home";
import { Nav } from "./components/Nav";
import { SearchResults } from "./components/SearchResults";
import { ItemOverview } from "./components/items/overview/ItemOverview";
import { ItemAttributes } from "./components/interfaces";

const App: FC = () => {
  const [searchItems, setSearchItems] = useState<ItemAttributes[]>([]);
  const [selectedItem, setSelectedItem] = useState<ItemAttributes>();
  const [overviewOpen, setOverviewOpen] = useState(false);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    selectedItem !== null && setOverviewOpen(true);
  }, [selectedItem]);

  const handleSearchInput = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setSearching(true);
      fetchSearch(e.target.value).then((data) => setSearchItems(data.results));
    } else {
      setSearching(false);
    }
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
      {searching ? (
        <SearchResults setSelectedItem={setSelectedItem} items={searchItems} />
      ) : (
        <Home setSelectedItem={setSelectedItem} />
      )}
    </div>
  );
};

export default App;
