import {Item} from './Item';
export const ItemRow = ({loading, items, selectedItem, watchList, setWatchList}) => {
    return !loading &&  (<>
        <div className='item-grid'>
            {items.slice(0,10).map(i => i.poster_path && <Item key={i.id} selectedItem={selectedItem} item={i} watchList={watchList} setWatchList={setWatchList}/>)}
        </div>
				<div className='item-grid'>
            {items.slice(10,20).map(i => i.poster_path && <Item key={i.id} selectedItem={selectedItem} item={i} watchList={watchList} setWatchList={setWatchList}/>)}
        </div></>
    )
}
