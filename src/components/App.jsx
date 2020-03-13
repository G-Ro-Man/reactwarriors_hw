import React from "react";
// import { moviesData } from "../moviesData";
import MovieItem from "./MovieItem";
import { API_URL, API_KEY_3 } from "../utils/api";
import MovieTabs from "./MovieTabs";
import Pagination from "./Pagination";

//UI = fn(state, props)

class App extends React.Component {
	constructor() {
		super();

		this.state = {
			movies: [],
			moviesWillWatch: [],
			sort_by: "popularity.desc",
			page: 1,
			total_pages: 0
		};
		// console.log("App constuctor");
	}

	componentDidMount() {
		// console.log("App did mount");

		this.getMovies();
		// console.log("after fetch");
	}

	componentDidUpdate(prevProps, prevState) {
		// console.log("App didUpdate");
		// console.log("App prev: ", prevState, prevProps);
		// console.log("App this: ", this.props, this.state);
		if (prevState.sort_by !== this.state.sort_by) {
			// console.log("App call API");
			this.setState({
				page: 1
			});
			this.getMovies();
		}
		if (prevState.page !== this.state.page) {
			// console.log("App call API");
			this.getMovies();
		}
		if (prevState.total_pages !== this.state.total_pages) {
			// console.log("App call API");

			this.getMovies();
		}
	}

	getMovies = () => {
		fetch(
			`${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${this.state.sort_by}&page=${this.state.page}`
		)
			.then((response) => {
				// console.log("App then");
				return response.json();
			})
			.then((data) => {
				console.log("App data", data);
				this.setState({
					movies: data.results,
					total_pages: data.total_pages
				});
			});
	};

	removeMovie = (movie) => {
		const updateMovies = this.state.movies.filter(function(item) {
			return item.id !== movie.id;
		});
		this.setState({
			movies: updateMovies
		});
	};

	addMovieToWillWatch = (movie) => {
		// this.state.moviesWillWatch.push(movie);
		// const updateMovieWillWatch = [...this.state.moviesWillWatch];
		// updateMovieWillWatch.push(movie);
		const updateMovieWillWatch = [...this.state.moviesWillWatch, movie];
		this.setState({
			moviesWillWatch: updateMovieWillWatch
		});
	};

	removeMovieFromWillWatch = (movie) => {
		const updateMovieWillWatch = this.state.moviesWillWatch.filter(function(
			item
		) {
			return item.id !== movie.id;
		});
		this.setState({
			moviesWillWatch: updateMovieWillWatch
		});
	};

	updateSortBy = (value) => {
		this.setState({
			sort_by: value
		});
	};

	updatePage = (value) => {
		this.setState({
			page: value
		});
	};

	render() {
		console.log("App render", this.state.sort_by);

		return (
			<div className="container">
				<div className="row">
					<div className="col-9">
						<div className="row mb-4">
							<div className="col-12">
								<MovieTabs
									sort_by={this.state.sort_by}
									updateSortBy={this.updateSortBy}
								/>
							</div>
						</div>
						<div className="row mb-4">
							<div className="col-12 mb-0">
								<Pagination
									page={this.state.page}
									total_pages={this.state.total_pages}
									updatePage={this.updatePage}
								/>
							</div>
							<div>
								page {this.state.page} of {this.state.total_pages}
							</div>
						</div>
						<div className="row">
							{this.state.movies.map((movie) => {
								return (
									<div className="col-6 mb-4" key={movie.id}>
										<MovieItem
											movie={movie}
											removeMovie={this.removeMovie}
											addMovieToWillWatch={this.addMovieToWillWatch}
											removeMovieFromWillWatch={this.removeMovieFromWillWatch}
										/>
									</div>
								);
							})}
						</div>
					</div>
					<p>Will Watch: {this.state.moviesWillWatch.length}</p>
					<div className="col-3"></div>
				</div>
			</div>
		);
	}
}

// function App() {
//     return <div>Hello Roman</div>
// }

export default App;
