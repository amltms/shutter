import { useEffect, useState } from 'react';
import {fetchPopular} from './api/fetchData';
import {ItemGrid} from './components/ItemGrid';
import {SlideShow} from './components/SlideShow';
export const Home = ({itemOverview, loading, setLoading}) => {
    const [movies, setMovies] = useState([]);
    
    useEffect(() => {
        const test = async () => {
            const data = await fetchPopular();
            setMovies(data.results);
            setLoading(false);
        }
        test();
    }, [])

    return (
        <>
            <SlideShow items={movies}/>
            <h1>Most Popular</h1>
            <ItemGrid selectedItem={itemOverview} loading={loading} items={movies}/>
        </>
    );
}

