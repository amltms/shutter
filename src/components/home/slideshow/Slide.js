export const Slide = ({slide}) => {
	return (
		slide.backdrop_path &&
		<div className='slide'>
			<div className='slide-content'>
				<h1>{slide.original_title ? slide.original_title : slide.original_name}</h1>
				<p>{slide.overview}</p>
				<button>More Details</button>
			</div>
			<img src={`https://image.tmdb.org/t/p/original/${slide.backdrop_path}`} />
		</div>
	)
}
