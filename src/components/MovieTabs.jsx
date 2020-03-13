import React from "react";

class MovieTabs extends React.Component {
	shouldComponentUpdate(nextProps, nextState) {
		if (nextProps.sort_by !== this.props.sort_by) {
			return true;
		}
		return false;
	}

	render() {
		const { sort_by, updateSortBy } = this.props;

		const handleClick = (value) => () => {
			updateSortBy(value);
		};

		const getClassLink = (value) => {
			return `nav-link ${sort_by === value ? "active" : ""}`;
		};

		console.log("MT movie tabs render");

		return (
			<ul className="nav nav-pills nav-fill">
				<li className="nav-item">
					<div
						className={getClassLink("popularity.desc")}
						onClick={handleClick("popularity.desc")}
					>
						Popularity desc
					</div>
				</li>
				<li className="nav-item">
					<div
						className={getClassLink("revenue.desc")}
						onClick={handleClick("revenue.desc")}
					>
						Revenue desc
					</div>
				</li>
				<li className="nav-item">
					<div
						className={getClassLink("vote_average.desc")}
						onClick={handleClick("vote_average.desc")}
					>
						Vote Avarege desc
					</div>
				</li>
			</ul>
		);
	}
}

export default MovieTabs;
