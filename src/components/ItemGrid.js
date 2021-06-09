import {Item} from './Item';
export const ItemGrid = ({loading, items, selectedItem}) => {
    return loading ? (<h1>Loading</h1>) : (
        <div className='item-grid'>
            {items.map(i => i.poster_path && <Item key={i.id} selectedItem={selectedItem} item={i}/>)}
        </div>
    )
}
