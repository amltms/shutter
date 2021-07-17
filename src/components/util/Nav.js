import {useRef} from "react";
import {MdSearch} from 'react-icons/md';
import {HiUserCircle} from 'react-icons/hi';
import { useState } from 'react';

export const Nav = ({handleInput, setContentType}) => {
	const searchInput = useRef(null)
	const [displaySearch, setDisplaySearch] = useState(false)
	
	function startSearch(){
		searchInput.current.focus()
		setDisplaySearch(v => !v)
	}
	return (
		<nav className='flex align-center space-between'>
			<div className='nav-left flex align-center'>
  			<button className='logo btn' onClick={()=>setContentType('all')}>Cactus</button>
				<button onClick={()=>setContentType('movie')}>Films</button>
				<button onClick={()=>setContentType('tv')}>TV</button>
			</div>
			<div class="nav-right">
				<input onChange={handleInput} ref={searchInput} className={`search-bar ${displaySearch && 'display'}`}/>
				<MdSearch onClick={() =>	startSearch() } />
				<HiUserCircle />	
			</div>
		</nav>
	)
}
