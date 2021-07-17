import { Item } from "../items/Item";
import { RiAddLine } from 'react-icons/ri';
export const WatchList = ({watchList, setWatchList, selectedItem}) => {
	return (
		<div>
			<h2>Watch List</h2>
			<div className="watchlist">
				{watchList.length === 0 ? <div className='item watchlist-add'><RiAddLine /></div>:
				watchList.map(i => i.poster_path && <Item key={i.id} item={i} selectedItem={selectedItem}  watchList={watchList} setWatchList={setWatchList} />)}
			</div>
		</div>
	)
}
