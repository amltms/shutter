import {useRef} from "react";

export const Search = ({handleInput, display}) => {
	const searchInput = useRef(null)
	function handleFocus(){
		searchInput.current.focus()
	}
    return <input onChange={handleInput} className={`search-bar ${display && ' display'}`}/>
}
