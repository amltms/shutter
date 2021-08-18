import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

export const Item = ({ item, selectedItem, watchList, setWatchList }) => {
  const watchListValidation = (item) => {
    if (watchList && watchList.some((i) => i.id === item.id)) {
      setWatchList(watchList.filter((i) => i.id !== item.id));
    } else {
      setWatchList((prevState) => [...prevState, item]);
    }
  };

  const sliceDate = (date) => {
    return date && date.slice(0, 4);
  };

  return (
    <div key={item.id} className="item btn">
      <img
        className="poster-img"
        src={`https://image.tmdb.org/t/p/w200/${item.poster_path}`}
        alt="poster"
      />

      <div className="item-preview">
        <div
          className="add-watchlist"
          onClick={() => watchListValidation(item)}
        >
          {watchList && watchList.some((i) => i.id === item.id) ? (
            <BsBookmarkFill />
          ) : (
            <BsBookmark />
          )}
        </div>
        <img
          onClick={() => selectedItem(item)}
          className="poster-img"
          src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
          alt="poster"
        />
        <div onClick={() => selectedItem(item)} className="text">
          <h3>{item.title ? item.title : item.original_name}</h3>
          <p>
            {sliceDate(
              item.release_date ? item.release_date : item.first_air_date
            )}{" "}
            - {item.vote_average}
          </p>
        </div>
      </div>
    </div>
  );
};
