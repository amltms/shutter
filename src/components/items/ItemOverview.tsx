import { FC, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { VscChromeClose } from "react-icons/vsc";
import styled from "styled-components";
import { ItemAttributes, Details, Credits } from "../interfaces";
import { fetchItem, fetchCredits } from "../../api/fetchContent";
import { ItemDetails } from "./ItemDetails";

const Overview = styled.div`
  position: absolute;
  top: 0;
  z-index: 2000;
  height: 100vh;
  width: 100%;
  background: black;
`;

const ExitBtn = styled.button`
  top: 0;
  right: 0;
  position: absolute;
  margin: 2rem;
  z-index: 100;
  font-size: 2rem;
`;

interface Props {
  selectedItem: ItemAttributes;
  setOverviewOpen: (newVal: boolean) => void;
}

export const ItemOverview: FC<Props> = ({ setOverviewOpen, selectedItem }) => {
  const [item, setItem] = useState<Details>();
  const [credits, setCredits] = useState<Credits>();

  useEffect(() => {
    fetchItem(selectedItem.media_type, selectedItem.id).then((data) => {
      setItem(data);
      console.log();
    });
    fetchCredits(selectedItem.media_type, selectedItem.id).then((data) => {
      setCredits(data);
    });
  }, [selectedItem]);

  return ReactDOM.createPortal(
    <Overview>
      <ExitBtn onClick={() => setOverviewOpen(false)}>
        <VscChromeClose />
      </ExitBtn>
      {item && credits && <ItemDetails details={item} credits={credits} />}
    </Overview>,
    document.getElementById("portal")!
  );
};
