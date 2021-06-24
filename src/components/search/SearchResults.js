import {ItemGrid} from '../items/ItemGrid';

export const SearchResults = ({searchData, loading, itemOverview}) => {
    return (
        <div>
            <ItemGrid selectedItem={itemOverview} loading={loading} items={searchData}/>
        </div>
    )
}
