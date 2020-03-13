import React from "react";
// import classNames from "classnames/bind";

var classNames = require("classnames");

class Pagination extends React.Component {
	shouldComponentUpdate(nextProps, nextState) {
		if (
			nextProps.page !== this.props.page ||
			nextProps.total_pages !== this.props.total_pages
		) {
			return true;
		}
		return false;
	}

	render() {
		const { page, total_pages, updatePage } = this.props;
		console.log("PAG page: ", page);

		const handleClick = (value) => () => {
			updatePage(value);
		};

		var btnPrev = classNames({
			"page-item": true,
			disabled: page <= 1
		});
		var btnNext = classNames({
			"page-item": true,
			disabled: page === total_pages
		});

		return (
			<ul className="pagination justify-content-center">
				<li className={btnPrev}>
					<div className="page-link" tabIndex="-1" onClick={handleClick(1)}>
						First
					</div>
				</li>
				<li className={btnPrev}>
					<div
						className="page-link"
						tabIndex="-1"
						onClick={handleClick(page - 1)}
					>
						Previous
					</div>
				</li>
				<li className="page-item active ">
					<div
						className="page-link"
						onClick={handleClick(page)}
						aria-disabled="true"
					>
						{page}
					</div>
				</li>
				<li className={btnNext}>
					<div className="page-link" onClick={handleClick(page + 1)}>
						Next
					</div>
				</li>
				<li className={btnNext}>
					<div className="page-link" onClick={handleClick(total_pages)}>
						Last
					</div>
				</li>
			</ul>
		);
	}
}

export default Pagination;
