import { useEffect, useState, FC } from "react";
import { fetchPopular } from "../../api/fetchContent";
import { ItemList } from "../items/ItemList";
import { ItemAttributes } from "../interfaces";
import { SlideShow } from "./slideshow/SlideShow";
import styled from "styled-components";

interface Props {
  match: { params: { type: string } };
}

const ItemContainer = styled.div`
  margin-top: -10%;
`;
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
      <ItemContainer>
        <ItemList items={popularItems} />
      </ItemContainer>
    </div>
  );
};
