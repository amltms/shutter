import { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Credits } from '../../../types';
import { CreditsProfile } from './CreditsProfile';

interface Props {
	credits: Credits;
}
const CastList = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

const filterByJob = (credits: Credits, job: string) => {
	return credits.crew.filter((person) => person.job === job);
};

export const ItemCredits: FC<Props> = ({ credits }) => {
	const [writers, setWriters] = useState(filterByJob(credits, 'Writer'));
	const [director, setDirector] = useState(filterByJob(credits, 'Director')[0]);

	useEffect(() => {
		if (writers.some((e) => e.id === director.id)) {
			setDirector({ ...director, job: 'Director / Writer' });
			setWriters(writers.filter((writer) => writer.id !== director.id));
		}
	}, [director, writers]);

	return (
		<>
			<h2>Cast</h2>
			<CastList>
				{credits.cast.slice(0, 3).map((person) => (
					<CreditsProfile person={person} />
				))}
			</CastList>
			{director && (
				<>
					<h2>Crew</h2>
					<CastList>
						{director && <CreditsProfile person={director} />}

						{writers.map((w) => (
							<CreditsProfile person={w} />
						))}
					</CastList>
				</>
			)}
		</>
	);
};
