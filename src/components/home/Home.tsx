import { FC } from "react";
import { useEffect, useState } from "react";
import { fetchPopular } from "../../api/fetchContent";
import { ItemList } from "../items/ItemList";
import { ItemAttributes } from "../interfaces";
import { SlideShow } from "./slideshow/SlideShow";
import { SavedItems } from "./SavedItems";

export type HomeProps = {
  saved: ItemAttributes[];
  setSaved: (newVal: ItemAttributes[]) => void;
  setSelectedItem: (newVal: ItemAttributes) => void;
};

export const Home: FC<HomeProps> = ({ setSelectedItem, saved, setSaved }) => {
  const [popularItems, setPopularItems] = useState<ItemAttributes[]>([]);
  const [savedItems, setSavedItems] = useState([]);

  useEffect(() => {
    fetchPopular("all").then((data) => {
      setPopularItems(data.results);
    });
  }, []);

  return (
    <div>
      <SlideShow popularItems={popularItems} />
      <SavedItems
        setSelectedItem={setSelectedItem}
        saved={saved}
        setSaved={setSaved}
      />
      <ItemList
        saved={saved}
        setSaved={setSaved}
        setSelectedItem={setSelectedItem}
        items={popularItems}
      />
    </div>
  );
};
