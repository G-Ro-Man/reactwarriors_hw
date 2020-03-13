import React from "react";

class MovieItem extends React.Component {
	constructor() {
		super();

		this.state = {
			willWatch: false
		};
	}

	componentWillUnmount() {
		// console.log("unmount: ", this.props.movie.title);
	}

	render() {
		const {
			movie,
			removeMovie,
			addMovieToWillWatch,
			removeMovieFromWillWatch
		} = this.props;

		const getWillWatch = (value) => {
			return value ? (
				<button
					onClick={() => {
						this.setState({
							willWatch: false
						});
						removeMovieFromWillWatch(movie);
					}}
					type="button"
					className="btn btn-success"
				>
					Remove Will Watch
				</button>
			) : (
				<button
					onClick={() => {
						this.setState({
							willWatch: true
						});
						addMovieToWillWatch(movie);
					}}
					type="button"
					className="btn btn-secondary"
				>
					Add Will Watch
				</button>
			);
		};

		const getSrcImg = (value) => {
			return value !== "https://image.tmdb.org/t/p/w500null" ? (
				<img className="card-img-top" src={value} alt="" />
			) : (
				<img
					className="card-img-top"
					src="https://image.tmdb.org/t/p/w500/wXBCE6sS94zb8IlnQ51OPApgfhC.jpg"
					alt=""
				/>
			);
		};

		return (
			<div className="card">
				{getSrcImg(
					`https://image.tmdb.org/t/p/w500${movie.backdrop_path ||
						movie.poster_path}`
				)}
				<div className="card-body">
					<h6 className="card-title">{movie.title}</h6>
					<div className="d-flex justify-content-between align-items-center">
						<p className="mb-0">Rating: {movie.vote_average}</p>
						{getWillWatch(this.state.willWatch)}
					</div>
					<button onClick={removeMovie.bind(this, movie)} type="button">
						del item
					</button>
				</div>
			</div>
		);
	}
}

export default MovieItem;
