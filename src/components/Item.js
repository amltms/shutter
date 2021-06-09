export const Item = ({item, selectedItem}) => {
    return (
        <div key={item.id} className="item" onClick={() => selectedItem(item.id)}>
            <img className='poster-img' src={`https://image.tmdb.org/t/p/w200/${item.poster_path}`} alt="poster"></img>
        </div>
    )
}
