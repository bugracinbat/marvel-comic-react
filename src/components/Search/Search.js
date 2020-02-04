import React from 'react';
import { Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';

import { searchComics } from '../../api';

const Search = ({
	onSearchChange,
	searchString,
	onResultsChange,
	toggleLoading
}) => {
	const handleChange = e => {
		onSearchChange(e.target.value);
	};

	const handleSubmit = event => {
		toggleLoading(true);
		event.preventDefault();
		searchComics(searchString).then(response => {
			onResultsChange(response);
			toggleLoading(false);
		});
	};

	return (
		<div>
			<InputGroup>
				<Input placeholder="Search by comic title" onChange={handleChange} />
				<InputGroupAddon addonType="append">
					<Button color="info" onClick={handleSubmit}>
						Search
					</Button>
				</InputGroupAddon>
			</InputGroup>
		</div>
	);
};

export default Search;
