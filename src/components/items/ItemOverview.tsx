import { FC } from "react";
import ReactDOM from "react-dom";
import { ItemAttributes } from "../interfaces";

interface Props {
  selectedItem: ItemAttributes;
}

export const ItemOverview: FC<Props> = (props) => {
  return ReactDOM.createPortal(
    <div>{props.selectedItem.id}</div>,
    document.getElementById("portal")!
  );
};
