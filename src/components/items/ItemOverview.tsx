import { FC } from "react";
import ReactDOM from "react-dom";
import { ItemAttributes } from "../interfaces";
import styled from "styled-components";

const Overview = styled.div`
  position: absolute;
  top: 0;
  height: 100vh;
`;

interface Props {
  selectedItem: ItemAttributes;
}

export const ItemOverview: FC<Props> = (props) => {
  return ReactDOM.createPortal(
    <Overview>{props.selectedItem.id}</Overview>,
    document.getElementById("portal")!
  );
};
