import React from 'react';

const Comic = ({ comic, handleClick }) => {
	return (
		<div
			className="thumbnail"
			key={comic.id}
			data-id={comic.id}
			onClick={handleClick}
		>
			<img
				className="thumbnailImg"
				alt={comic.title}
				src={
					comic.thumbnail.path +
					'/portrait_uncanny.' +
					comic.thumbnail.extension
				}
			/>
			<h2 className="truncated">{comic.title}</h2>
		</div>
	);
};

export default Comic;
