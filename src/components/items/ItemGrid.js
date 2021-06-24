import {Item} from './Item';
export const ItemGrid = ({loading, items, selectedItem}) => {
    return !loading &&  (
        <div className='item-grid'>
            {items.map(i => i.poster_path && <Item key={i.id} selectedItem={selectedItem} item={i}/>)}
        </div>
    )
}
