import { useState, useEffect } from 'react';
import {Slide} from './Slide';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

export const Slider = ({items}) => {
	const [dragging, setDragging] = useState(false);
	const [originalX, setOriginalX] = useState(0);
	const [currentX, setCurrentX] = useState(0)
	const [prevX, setPrevX] = useState(0)
	const [currentSlide, setCurrentSlide] = useState(0)
	let sliderArr = [items[0],items[1], items[2]]
	console.log(items);
	
	const mouseDown = (event) => {
		setDragging(true);
		setOriginalX(event.pageX)
		setPrevX(currentX);
	}
	
	const mouseMove = (event) => {
		dragging && setCurrentX(prevX+((event.pageX-originalX)/10));	
		}

	const mouseUp = (event)  => {
		if (dragging){
			setDragging(false);
			if(originalX != event.pageX){
				currentX > prevX ? setCurrentSlide(v => v-1) : setCurrentSlide(v => v+1);
			}
		}
	}

	useEffect(() => {
		if (currentSlide < 0){
			setCurrentSlide(sliderArr.length-1)
		}else if (currentSlide > sliderArr.length-1){
			setCurrentSlide(0)
		}else {
			setCurrentX(-100*currentSlide)	
		}
	}, [currentSlide])

	return (
		<>

			<div className='slider-container'>
				<button className='next btn-slider'onClick={() => setCurrentSlide(currentSlide+1)}><MdNavigateNext/></button>
				<button className='prev btn-slider' onClick={() => setCurrentSlide(currentSlide-1)}><MdNavigateBefore/></button>
				<div className='slider' onMouseDown={mouseDown} onMouseMove={mouseMove}
				onMouseUp={mouseUp}  onMouseLeave={mouseUp} style={{transform:`translateX(${currentX}%)`, transition: dragging? '0.1s': '1s' }}>
					{items.length !=0 && sliderArr.map((item, i) =>{
						return(<Slide key={i} slide={item} />)
					})}
				</div>
			</div>
		</>
	)
}
