import "./App.css";
import { FC, ChangeEvent, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ItemContext } from "./components/context/ItemContext";
import { fetchSearch } from "./api/fetchContent";
import { Nav } from "./components/Nav";
import { Home } from "./components/home/Home";
import { SavedItems } from "./components/home/SavedItems";
import { SearchResults } from "./components/SearchResults";
import { ItemOverview } from "./components/items/overview/ItemOverview";
import { ItemAttributes } from "./components/interfaces";

const App: FC = () => {
  const [selectedItem, setSelectedItem] = useState<ItemAttributes>();
  const [overviewOpen, setOverviewOpen] = useState(false);
  const [saved, setSaved] = useState<ItemAttributes[]>([]);
  const [searchItems, setSearchItems] = useState<ItemAttributes[]>([]);
  const [searching, setSearching] = useState(false);

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
      value={{
        saved,
        setSaved,
        selectedItem,
        setSelectedItem,
        setOverviewOpen,
      }}
    >
      <div className="App">
        {selectedItem && overviewOpen && (
          <ItemOverview
            selectedItem={selectedItem}
            setOverviewOpen={setOverviewOpen}
          />
        )}
        <Router>
          <Nav handleSearchInput={handleSearchInput} />
          <Switch>
            <Route exact path="/saved" component={SavedItems} />
            {searching ? (
              <SearchResults items={searchItems} />
            ) : (
              <>
                <Route path={["/:type", "/"]} component={Home} />
              </>
            )}
          </Switch>
        </Router>
      </div>
    </ItemContext.Provider>
  );
};

export default App;
