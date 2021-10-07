import { FC, useEffect, useState } from "react";
import { fetchItem, fetchCredits } from "../../../api/fetchContent";
import styled from "styled-components";
import { Details, Credits } from "../../interfaces";
import { ItemCredits } from "./credits/ItemCredits";
import { OverviewDetails } from "./OverviewDetails";
interface Props {
  match: { params: { id: number; type: string } };
}

const ItemDetails = styled.div`
  padding: 20% 10vw 0 10vw;
`;

const Backdrop = styled.img`
  z-index: -1;
  position: fixed;
  opacity: 1;
  width: 100%;
  filter: brightness(60%);
  mask-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0) 30%,
    rgba(0, 0, 0, 0.7) 100%
  );
  @media screen and (max-width: 900px) {
    height: 100vh;
    width: auto;
    margin-left: 50%;
    transform: translate(-50%, 0%);
  }
`;
export const Overview: FC<Props> = (props) => {
  const [item, setItem] = useState<Details>();
  const [credits, setCredits] = useState<Credits>();

  useEffect(() => {
    fetchItem(props.match.params.type, props.match.params.id).then((data) => {
      setItem(data);
    });
    fetchCredits(props.match.params.type, props.match.params.id).then(
      (data) => {
        setCredits(data);
      }
    );
  }, [props.match.params.id, props.match.params.type]);

  return (
    <>
      <Backdrop
        src={`https://image.tmdb.org/t/p/original/${item?.backdrop_path}`}
        alt="backdrop"
      />
      <ItemDetails>
        {item && <OverviewDetails item={item} />}
        {credits && <ItemCredits credits={credits} />}
      </ItemDetails>
    </>
  );
};
