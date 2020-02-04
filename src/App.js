import './App.css';

import React, { useEffect, useState } from 'react';

import { searchComics } from './api';
import ComicDetails from './components/ComicDetails/ComicDetails';
import ComicsList from './components/ComicsList/ComicsList';
import Loading from './components/Loading/Loading';
import Search from './components/Search/Search';

function App() {
	const [isLoading, setIsLoading] = useState(true);
	const [showComicDetails, setShowComicDetails] = useState(false);

	const [searchInput, setSearchInput] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [searchResultsOffset, setSearchResultsOffset] = useState(0);
	const [searchResultsCount, setSearchResultsCount] = useState(0);

	const [selectedComic, setSelectedComic] = useState('');
	const [comicData, setComicData] = useState({});

	useEffect(() => {
		window.history.pushState(null, document.title, window.location.href);
		window.addEventListener('popstate', () => {
			window.history.pushState(null, document.title, window.location.href);
		});

		return () => window.removeEventListener('popstate', () => {});
	}, []);

	useEffect(() => {
		searchComics('').then(response => {
			onResultsChange(response);
			setIsLoading(false);
		});
	}, []);

	const onSearchChange = input => {
		setSearchInput(input);
	};

	const onResultsChange = response => {
		setShowComicDetails(false);
		setSearchResultsOffset(0);
		setSearchResultsCount(response.data.total);
		setSearchResultsOffset(response.data.offset);
		setSearchResults(response.data.results);
	};

	const onClick = response => {
		setSelectedComic(response.data.data.results[0].id);
		setComicData(response.data.data.results[0]);
		setShowComicDetails(true);
	};

	const toggleLoading = boolean => {
		setIsLoading(boolean);
	};

	const onBack = boolean => {
		setShowComicDetails(boolean);
	};

	const renderContent = () => {
		if (showComicDetails) {
			return (
				<ComicDetails
					selectedComic={selectedComic}
					comic={comicData}
					onBack={onBack}
				/>
			);
		} else if (searchResults.length > 0) {
			return (
				<ComicsList
					searchString={searchInput}
					searchResults={searchResults}
					resultsOffset={searchResultsOffset}
					resultsTotal={searchResultsCount}
					onResultsChange={onResultsChange}
					onComicClick={onClick}
					toggleLoading={toggleLoading}
				/>
			);
		} else {
			return <p>No results found for that search query.</p>;
		}
	};

	return (
		<div className="app">
			<header className="appHeader">
				<h1 className="title">Marvel Comics</h1>
				<Search
					searchString={searchInput}
					onSearchChange={onSearchChange}
					onResultsChange={onResultsChange}
					toggleLoading={toggleLoading}
				/>
			</header>
			<main>{isLoading ? <Loading /> : renderContent()}</main>
		</div>
	);
}

export default App;
