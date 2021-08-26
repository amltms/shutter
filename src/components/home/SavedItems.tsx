import { FC } from "react";
import { Item } from "../items/Item";
import { ItemAttributes } from "../interfaces";
import styled from "styled-components";

interface Props {
  saved: ItemAttributes[];
  setSelectedItem: (newVal: ItemAttributes) => void;
  setSaved: (newVal: ItemAttributes[]) => void;
}
const ItemRow = styled.div`
  display: flex;
`;
const SavedContainer = styled.div`
  background: #111;
  margin: 0 1.2rem;
  border-radius: 2rem;
`;
export const SavedItems: FC<Props> = ({ saved, setSaved, setSelectedItem }) => {
  return (
    <SavedContainer>
      <ItemRow>
        {saved.map((i) => (
          <Item
            setSaved={setSaved}
            saved={saved}
            item={i}
            key={i.id}
            setSelectedItem={setSelectedItem}
          />
        ))}
      </ItemRow>
    </SavedContainer>
  );
};
