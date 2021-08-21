export type ItemAttributes = {
  id: number;
  poster_path: string;
  media_type: string;
  title?: string;
  original_name?: string;
  release_date?: string;
  first_air_date?: string;
};

export type Details = {
  id: number;
  backdrop_path: string;
  genres: { id: number; name: string }[];
  poster_path: string;
  media_type: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  runtime: number;
  title?: string;
  original_name?: string;
  release_date?: string;
  first_air_date?: string;
};

export type Credits = {
  id: number;
  cast: Cast[];
  crew: Crew[];
};

type Cast = {
  name: string;
  profile_path: string;
  character: string;
};

type Crew = {
  name: string;
  profile_path: string;
  character: string;
  job: string;
  department: string;
};
