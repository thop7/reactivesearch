import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {
	ReactiveBase,
	DataSearch,
	ResultList,
	SelectedFilters,
} from '@appbaseio/reactivesearch';

import './index.css';

class Main extends Component {
	render() {
		return (
			<ReactiveBase
				app="good-books-ds"
				credentials="nY6NNTZZ6:27b76b9f-18ea-456c-bc5e-3a5263ebc63d"
			>
				<div className="row">
					<div className="col">
						<DataSearch
							title="DataSearch"
							dataField={['original_title', 'original_title.search']}
							categoryField="authors.raw"
							componentId="BookSensor"
						/>
					</div>

					<div className="col">
						<SelectedFilters componentId="BookSensor" />
						<ResultList
							componentId="SearchResult"
							dataField="original_title"
							size={10}
							onData={this.onData}
							className="result-list-container"
							pagination
							react={{
								and: 'BookSensor',
							}}
						/>
					</div>
				</div>
			</ReactiveBase>
		);
	}

	onData(data) {
		return ({
			title: <div className="book-title" dangerouslySetInnerHTML={{ __html: data.original_title }} />,
			description: (
				<div className="flex column justify-space-between">
					<div>
						<div>by <span className="authors-list">{data.authors}</span></div>
						<div className="ratings-list flex align-center">
							<span className="stars">
								{
									Array(data.average_rating_rounded).fill('x')
										.map((item, index) => <i className="fas fa-star" key={index} />) // eslint-disable-line
								}
							</span>
							<span className="avg-rating">({data.average_rating} avg)</span>
						</div>
					</div>
					<span className="pub-year">Pub {data.original_publication_year}</span>
				</div>
			),
			image: data.image,
		});
	}
}

ReactDOM.render(<Main />, document.getElementById('root'));