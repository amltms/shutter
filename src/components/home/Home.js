import { useEffect, useState } from 'react';

import {fetchPopular} from '../../api/fetchData';
import {ItemRow} from '../items/ItemRow';
import {Slider} from './slideshow/Slider';
import {WatchList} from "./WatchList";
import { ItemOverview } from "../items/ItemOverview";
import { SearchResults } from "../search/SearchResults";

export const Home = ({loading, setLoading, contentType, searchData}) => {
  const [movies, setMovies] = useState([]);
	const [selectedItem, setSelectedItem] = useState({});
	const [overview, setOverview] = useState(false);
	const [watchList, setWatchList] = useState([]);

  useEffect(() => {
		fetchPopular(contentType).then((data) =>{
			setMovies(data.results);
      setLoading(false);
		})
  }, [contentType])

	const itemOverview = (item) => {
		setSelectedItem(item);
		setOverview(true);
	}

	return (
		<>
			<ItemOverview setLoading={setLoading} loading={loading} setOverview={setOverview} overview={overview} selectedItem={selectedItem} />
			{searchData.length != 0 ? <SearchResults loading={loading} itemOverview={itemOverview} searchData={searchData}/>:
			<>
					<Slider items={movies}/>
					
					<div className='home-container'>
						<WatchList watchList={watchList} setWatchList={setWatchList} selectedItem={itemOverview}/>
						<div className='popularFilms'>
							<h2>Trending</h2>
							<ItemRow selectedItem={itemOverview} loading={loading} items={movies} watchList={watchList} setWatchList={setWatchList}/>
						</div>
					</div>
				</>
			}
		</>
	);
}

