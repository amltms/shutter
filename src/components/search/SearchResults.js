import {ItemRow} from '../items/ItemRow';

export const SearchResults = ({searchData, loading, itemOverview}) => {
    return (
        <div>
            <ItemRow selectedItem={itemOverview} loading={loading} items={searchData}/>
        </div>
    )
}
