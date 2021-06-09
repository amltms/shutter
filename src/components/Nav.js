import {Search} from './Search';

export const Nav = ({handleInput}) => {
    return (
        <nav>
            <h1>Cactus</h1>
            <Search handleInput={handleInput}/>
        </nav>
    )
}
