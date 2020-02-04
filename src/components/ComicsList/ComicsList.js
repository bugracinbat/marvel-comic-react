import './ComicsList.css';

import React from 'react';
import { Button } from 'reactstrap';

import { getComic, searchComics } from '../../api';
import Comic from '../Comic/Comic';

const ComicsList = ({
	searchResults,
	resultsOffset,
	resultsTotal,
	searchString,
	toggleLoading,
	onResultsChange,
	onComicClick
}) => {
	const handleClick = event => {
		getComic(event.currentTarget.dataset.id).then(data => {
			onComicClick({ data });
		});
	};

	const handleNext = () => {
		const queryOffset = resultsOffset + 20;
		toggleLoading(true);
		searchComics(searchString, queryOffset).then(response => {
			onResultsChange(response);
			toggleLoading(false);
		});
	};

	const handlePrev = () => {
		const queryOffset = resultsOffset - 20;
		toggleLoading(true);
		searchComics(searchString, queryOffset).then(response => {
			onResultsChange(response);
			toggleLoading(false);
		});
	};

	const list = searchResults.map(comic => {
		return <Comic comic={comic} key={comic.id} handleClick={handleClick} />;
	});

	let next, prev;

	if (resultsTotal > resultsOffset * 20) {
		next = (
			<Button color="info" onClick={handleNext}>
				Next Page &#8594;
			</Button>
		);
	}

	if (resultsOffset >= 20) {
		prev = (
			<Button color="info" onClick={handlePrev} className="prevButton">
				&#8592; Previous Page
			</Button>
		);
	}

	return (
		<>
			<div className="thumbnailContainer">{list}</div>
			<div className="paginationContainer">
				{prev}
				{next}
			</div>
		</>
	);
};

export default ComicsList;
