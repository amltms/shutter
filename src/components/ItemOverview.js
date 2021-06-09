import { useEffect, useState } from "react";
import {fetchItem} from '../api/fetchData';
import { VscChromeClose } from 'react-icons/vsc';
import {Loading} from './Loading';

export const ItemOverview = ({setOverview, selectedItem, setLoading, loading}) => {
    const [itemDetails, setItemDetails] = useState({})
    
    useEffect(() => {
        const test = async () => {
            const data = await fetchItem(selectedItem);
            setItemDetails(data);
            setLoading(false);
        }
        test();
    }, [selectedItem])

    return (
        !loading &&
        <div className={`${loading ? ' hidden':' display'}`} >
            <div className='exit-btn' onClick={() => setOverview(false)}><VscChromeClose/></div>
            <img src={`https://image.tmdb.org/t/p/original/${itemDetails.backdrop_path}`} alt="poster"></img>
            <div className='overview-content'>
                <h1>{itemDetails.title}</h1>
                <h3 className='overview-subheading'><span>{(itemDetails.release_date).slice(0, 4)}</span> <span>{itemDetails.runtime} mins</span></h3>
                <div className='overview-flex'>
                    <div className='poster'>                    
                        <img className='poster-img' src={`https://image.tmdb.org/t/p/w300/${itemDetails.poster_path}`} alt="poster"></img>
                    </div>
                    <div className='overview-text'>
                        <div className='genre'>{itemDetails.genres.map(g => <span>{g.name} </span>)}</div>
                        <p>{itemDetails.overview}</p>
                    </div>
                    <div className='overview-rating'>
                        <h1>{itemDetails.vote_average}</h1>
                        <h2>{itemDetails.vote_count}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}
