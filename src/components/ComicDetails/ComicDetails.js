import './ComicDetails.css';

import moment from 'moment';
import React from 'react';
import { Button, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';

const ComicDetails = ({ comic, onBack }) => {
	const handleBack = () => onBack(false);

	return (
		<div className="detailsContainer">
			<h1 className="comicTitle">{comic.title}</h1>
			<div className="resultsArea">
				<div className="left">
					<img
						alt={comic.title}
						className="img"
						src={
							comic.thumbnail.path +
							'/portrait_uncanny.' +
							comic.thumbnail.extension
						}
					/>
				</div>
				<div className="right">
					<ListGroup className="listArea">
						<ListGroupItem>
							<ListGroupItemHeading>
								<Button color="danger" size="lg" block onClick={handleBack}>
									Back to results
								</Button>
							</ListGroupItemHeading>
						</ListGroupItem>
						{comic.creators.items.length > 0 && (
							<ListGroupItem>
								<ListGroupItemHeading>Created By</ListGroupItemHeading>
								<ListGroupItemText>
									{comic.creators.items[0].name}
								</ListGroupItemText>
							</ListGroupItem>
						)}

						<ListGroupItem>
							<ListGroupItemHeading>Description</ListGroupItemHeading>
							<ListGroupItemText>{comic.description}</ListGroupItemText>
						</ListGroupItem>
						<ListGroupItem>
							<ListGroupItemHeading>On Sale Date</ListGroupItemHeading>
							<ListGroupItemText>
								{moment(comic.dates[0].date).format('MMMM Do YYYY')}
							</ListGroupItemText>
						</ListGroupItem>
						<ListGroupItem>
							<ListGroupItemHeading>Original Print Price</ListGroupItemHeading>
							<ListGroupItemText>${comic.prices[0].price}</ListGroupItemText>
						</ListGroupItem>
						<ListGroupItem>
							<ListGroupItemHeading>Pages</ListGroupItemHeading>
							<ListGroupItemText>{comic.pageCount}</ListGroupItemText>
						</ListGroupItem>
						<ListGroupItem>
							<ListGroupItemHeading>
								<a
									target="_blank"
									rel="noopener noreferrer"
									href={`${comic.urls[0].url}`}
								>
									More Details
								</a>
							</ListGroupItemHeading>
						</ListGroupItem>
						<ListGroupItem>
							<ListGroupItemHeading>
								<a
									target="_blank"
									rel="noopener noreferrer"
									href={`${comic.urls[1].url}`}
								>
									Buy Now
								</a>
							</ListGroupItemHeading>
						</ListGroupItem>
					</ListGroup>
				</div>
			</div>
		</div>
	);
};

export default ComicDetails;
