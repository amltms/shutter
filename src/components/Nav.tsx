import { ChangeEventHandler } from "react";

interface Props {
  handleSearchInput: ChangeEventHandler<HTMLInputElement>;
}

export const Nav = ({ handleSearchInput }: Props) => {
  return (
    <nav>
      TV Films
      <input type="text" onChange={handleSearchInput} />
    </nav>
  );
};
