import { useEffect, useState, FC } from "react";
import { fetchPopular } from "../../api/fetchContent";
import { ItemList } from "../items/ItemList";
import { ItemAttributes } from "../interfaces";
import { SlideShow } from "./slideshow/SlideShow";

interface Props {
  match: { params: { type: string } };
}
export const Home: FC<Props> = (props) => {
  const [popularItems, setPopularItems] = useState<ItemAttributes[]>([]);

  useEffect(() => {
    fetchPopular(props.match.params.type || "all").then((data) => {
      setPopularItems(data.results);
    });
  }, [props.match.params.type]);

  return (
    <div>
      <SlideShow popularItems={popularItems} />
      <ItemList items={popularItems} />
    </div>
  );
};
