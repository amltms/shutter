import { ChangeEventHandler } from "react";
import styled from "styled-components";

const Bar = styled.div`
  position: fixed;
  z-index: 10000;
  width: 100%;
  padding: 1rem;
`;
interface Props {
  handleSearchInput: ChangeEventHandler<HTMLInputElement>;
}

export const Nav = ({ handleSearchInput }: Props) => {
  return (
    <Bar>
      Screens
      <input type="text" onChange={handleSearchInput} />
    </Bar>
  );
};
