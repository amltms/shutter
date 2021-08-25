import { useState, useEffect } from "react";
import { FC } from "react";
import styled from "styled-components";
import { Credits, Cast } from "../../interfaces";
import { CreditsProfile } from "./CreditsProfile";

interface Props {
  credits: Credits;
}
const CastList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const findCrewType = (PersonArr: Cast[], type: string) => {
  return PersonArr.filter((person) => person.job === type);
};

const test = (credits: Credits) => {
  let writers = credits.crew.filter((person) => person.job === "Writer");
  let director = credits.crew.filter((person) => person.job === "Director")[0];
  if (director && writers) {
    if (writers.some((e) => e.id === director.id)) {
      return <CreditsProfile person={director} />;
    }
    return <CreditsProfile person={director} />;
  }
};

export const ItemCredits: FC<Props> = ({ credits }) => {
  const [writers, setWriters] = useState(
    credits.crew.filter((person) => person.job === "Writer")
  );
  const [director, setDirector] = useState<Cast>(
    credits.crew.filter((person) => person.job === "Director")[0]
  );

  useEffect(() => {
    if (writers.some((e) => e.job === "Director")) {
    }
  }, []);
  return (
    <>
      <h2>Cast</h2>
      <CastList>
        {credits.cast.slice(0, 3).map((person) => (
          <CreditsProfile person={person} />
        ))}
      </CastList>

      <h2>Crew</h2>
      <CastList>{test(credits)}</CastList>
    </>
  );
};
