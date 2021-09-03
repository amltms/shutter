import "./App.css";
import { FC, ChangeEvent, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ItemContext } from "./components/context/ItemContext";
import { fetchSearch } from "./api/fetchContent";
import { Nav } from "./components/Nav";
import { Home } from "./components/home/Home";
import { SavedItems } from "./components/home/SavedItems";
import { SearchResults } from "./components/SearchResults";
import { ItemAttributes } from "./components/interfaces";
import { Overview } from "./components/items/overview/Overview";

const App: FC = () => {
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
      }}
    >
      <div className="App">
        <Router>
          <Nav handleSearchInput={handleSearchInput} />
          <Switch>
            <Route exact path="/overview/:type/:id" component={Overview} />
            {searching ? (
              <SearchResults items={searchItems} />
            ) : (
              <>
                <Route exact path="/saved" component={SavedItems} />
                <Route exact path="/">
                  <Redirect to="/index/all" />
                </Route>
                <Route exact path="/index/:type" component={Home} />
              </>
            )}
          </Switch>
        </Router>
      </div>
    </ItemContext.Provider>
  );
};

export default App;
