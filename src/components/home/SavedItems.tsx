import { FC, useContext } from "react";
import { Item } from "../items/Item";
import { ItemAttributes } from "../interfaces";
import styled from "styled-components";
import { ItemContext } from "../context/ItemContext";

const ItemRow = styled.div`
  display: flex;
`;
const SavedContainer = styled.div`
  background: #111;
  margin: 0 1.2rem;
  border-radius: 2rem;
`;
export const SavedItems: FC = () => {
  const { saved } = useContext(ItemContext);
  return (
    <SavedContainer>
      <ItemRow>
        {saved.map((i: ItemAttributes) => (
          <Item item={i} key={i.id} />
        ))}
      </ItemRow>
    </SavedContainer>
  );
};
