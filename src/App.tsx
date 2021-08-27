import "./App.css";
import { FC, ChangeEvent, useState, useEffect } from "react";
import { ItemContext } from "./components/context/ItemContext";
import { fetchSearch } from "./api/fetchContent";
import { Home } from "./components/home/Home";
import { Nav } from "./components/Nav";
import { SearchResults } from "./components/SearchResults";
import { ItemOverview } from "./components/items/overview/ItemOverview";
import { ItemAttributes } from "./components/interfaces";

const App: FC = () => {
  const [searchItems, setSearchItems] = useState<ItemAttributes[]>([]);
  const [selectedItem, setSelectedItem] = useState<ItemAttributes>();
  const [overviewOpen, setOverviewOpen] = useState(false);
  const [saved, setSaved] = useState<ItemAttributes[]>([]);
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
    <ItemContext.Provider
      value={{ saved, setSaved, selectedItem, setSelectedItem }}
    >
      <div className="App">
        <Nav handleSearchInput={handleSearchInput} />
        {selectedItem && overviewOpen && (
          <ItemOverview
            selectedItem={selectedItem}
            setOverviewOpen={setOverviewOpen}
          />
        )}

        {searching ? <SearchResults items={searchItems} /> : <Home />}
      </div>
    </ItemContext.Provider>
  );
};

export default App;
