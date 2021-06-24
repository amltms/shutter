import {useRef} from "react";
import {MdSearch} from 'react-icons/md';
import {HiUserCircle} from 'react-icons/hi';
import { useState } from 'react';

export const Nav = ({handleInput}) => {
	const searchInput = useRef(null)
	const [displaySearch, setDisplaySearch] = useState(false)
	
	function startSearch(){
		searchInput.current.focus()
		setDisplaySearch(v => !v)
	}
	return (
		<nav>
  		<a className='logo' href="#home">Cactus</a>
			<div class="nav-right">
				<input onChange={handleInput} ref={searchInput} className={`search-bar ${displaySearch && 'display'}`}/>
				<MdSearch onClick={() =>	startSearch() } />
				<HiUserCircle />	
			</div>
		</nav>
	)
}
