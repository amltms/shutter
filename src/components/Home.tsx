import { useEffect, useState } from "react";
import { fetchPopular } from "../api/fetchContent";
import { ItemList } from "./items/ItemList";
import { ItemAttributes } from "../components/interfaces";
import { FC } from "react";

export type HomeProps = {
  setSelectedItem: React.Dispatch<
    React.SetStateAction<ItemAttributes | undefined>
  >;
};

export const Home: FC<HomeProps> = (props) => {
  const [popularItems, setPopularItems] = useState<ItemAttributes[]>([]);
  useEffect(() => {
    fetchPopular("all").then((data) => {
      setPopularItems(data.results);
    });
  }, []);

  return (
    <div>
      <ItemList setSelectedItem={props.setSelectedItem} items={popularItems} />
    </div>
  );
};
