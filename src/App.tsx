import "./App.css";
import { FC, ChangeEvent, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  BrowserRouter,
} from "react-router-dom";
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
    <div className="App">
      {selectedItem && overviewOpen && (
        <ItemOverview
          selectedItem={selectedItem}
          setOverviewOpen={setOverviewOpen}
        />
      )}

      <Nav handleSearchInput={handleSearchInput} />
      {searching ? (
        <SearchResults
          saved={saved}
          setSaved={setSaved}
          setSelectedItem={setSelectedItem}
          items={searchItems}
        />
      ) : (
        <Home
          saved={saved}
          setSaved={setSaved}
          setSelectedItem={setSelectedItem}
        />
      )}
    </div>
  );
};

export default App;
