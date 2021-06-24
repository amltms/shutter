import { useEffect, useState } from 'react';
import {fetchPopular} from '../../api/fetchData';
import {ItemGrid} from '../items/ItemGrid';
import {Slider} from './slideshow/Slider';
export const Home = ({itemOverview, loading, setLoading}) => {
  const [movies, setMovies] = useState([]);
    
  useEffect(() => {
		fetchPopular().then((data) =>{
			setMovies(data.results);
      setLoading(false);
		})
  }, [])

	return (
		<>
			<Slider items={movies}/>
			<div className='popularFilms'>
				<ItemGrid selectedItem={itemOverview} loading={loading} items={movies}/>
			</div>
		</>
	);
}

