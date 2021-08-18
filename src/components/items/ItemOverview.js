import { useEffect, useState } from "react";
import reactDom from "react-dom";
import { fetchItem, fetchCredits } from "../../api/fetchData";
import { VscChromeClose, VscLoading } from "react-icons/vsc";
import { Loading } from "../util/Loading";

export const ItemOverview = ({ setOverview, overview, selectedItem }) => {
  const [itemDetails, setItemDetails] = useState({});
  const [credits, setCredits] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchItem(selectedItem.id, selectedItem.media_type).then((data) => {
      setItemDetails(data);
      setLoading(true);
    });
    fetchCredits(selectedItem.id, selectedItem.media_type).then((data) => {
      setCredits(data);
    });
  }, [selectedItem]);

  return reactDom.createPortal(
    <div
      className="overview"
      style={{ transform: `translateY(${overview ? "0%" : "-100%"})` }}
    >
      <div className="exit-btn" onClick={() => setOverview(false)}>
        <VscChromeClose />
      </div>
      {itemDetails && (
        <>
          <img
            src={`https://image.tmdb.org/t/p/original/${itemDetails.backdrop_path}`}
            alt="poster"
          ></img>
          <div className="overview-content">
            <h1>{itemDetails.title || itemDetails.original_name}</h1>
            <h3 className="overview-subheading">
              <span>
                {(
                  itemDetails.release_date ||
                  itemDetails.first_air_date ||
                  "----"
                ).substring(0, 4)}
              </span>{" "}
              <span>{itemDetails.runtime} mins</span>
            </h3>
            <div className="overview-flex">
              <div className="poster">
                <img
                  className="poster-img"
                  src={`https://image.tmdb.org/t/p/w300/${itemDetails.poster_path}`}
                  alt="poster"
                ></img>
              </div>
              <div className="overview-text">
                <div className="genre">
                  {itemDetails.genres &&
                    itemDetails.genres.map((g) => <span>{g.name} </span>)}
                </div>
                <p>{itemDetails.overview}</p>
              </div>
              <div className="overview-rating">
                <h1>{itemDetails.vote_average}</h1>
                <h2>{itemDetails.vote_count}</h2>
              </div>
            </div>
            <div></div>
          </div>
        </>
      )}
    </div>,
    document.getElementById("portal")
  );
};
