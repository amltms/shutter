import { FC } from "react";
import { useEffect, useState } from "react";
import { fetchPopular } from "../../api/fetchContent";
import { ItemList } from "../items/ItemList";
import { ItemAttributes } from "../interfaces";
import { Slider } from "./slideshow/Slider";

export type HomeProps = {
  setSelectedItem: React.Dispatch<
    React.SetStateAction<ItemAttributes | undefined>
  >;
};

export const Home: FC<HomeProps> = ({ setSelectedItem }) => {
  const [popularItems, setPopularItems] = useState<ItemAttributes[]>([]);
  useEffect(() => {
    fetchPopular("all").then((data) => {
      setPopularItems(data.results);
    });
  }, []);

  return (
    <div>
      <Slider popularItems={popularItems} />
      <ItemList setSelectedItem={setSelectedItem} items={popularItems} />
    </div>
  );
};
