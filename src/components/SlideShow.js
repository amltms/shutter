export const SlideShow = ({items}) => {
    return items.length !== 0 &&
        <div className='slideshow'>
            <img src={`https://image.tmdb.org/t/p/original/${items[12].backdrop_path}`} alt="poster"></img>
            <div className='slideshow-overlay'></div>
        </div>
    
}
