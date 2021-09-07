import "./App.css";
import { FC, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ItemContext } from "./components/context/ItemContext";
import { Nav } from "./components/Nav";
import { Home } from "./components/home/Home";
import { SavedItems } from "./components/home/SavedItems";
import { ItemAttributes } from "./components/interfaces";
import { Overview } from "./components/items/overview/Overview";
import { Search } from "./components/search/Search";

const App: FC = () => {
  const [saved, setSaved] = useState<ItemAttributes[]>([]);

  return (
    <ItemContext.Provider
      value={{
        saved,
        setSaved,
      }}
    >
      <div className="App">
        <Router>
          <Nav />
          <Switch>
            <Route exact path="/overview/:type/:id" component={Overview} />
            <Route exact path="/saved" component={SavedItems} />
            <Route exact path="/search" component={Search} />

            <Route exact path={["/", "/:type"]} component={Home} />
          </Switch>
        </Router>
      </div>
    </ItemContext.Provider>
  );
};

export default App;
