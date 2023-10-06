// Imports
import React from 'react';
import styled from 'styled-components';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

// Manual approach for stars (just to understand)
// BBsStarFill => Full fill star
// BsStarHalf => Half fill star
// BsStar => Empty star
/*
<span>
	{ stars >= 1 ? <BBsStarFill/> : stars >= 0.5 ? <BsStarHalf/> : <BsStar/> }
</span>
etc...
*/

// Component
const Stars = ({ stars, reviews }) => {

	// Stars
	// Creating an array of stars, iterating and return single star each time
	const tempStars = Array.from({ length:5 }, (_, index) => {
		const number = index + 0.5;
		return(
			<span key={ index }>
				{
					stars >= index + 1 ? <BsStarFill/> : stars >= number ? <BsStarHalf/> : <BsStar/>
				}
			</span>
		);
	});
	
	// Return
	return(
		<Wrapper>
			<div className="stars">
				{ tempStars }
			</div>
			<p className="reviews">({ reviews } customer reviews)</p>
		</Wrapper>
	);

};

// Styled
const Wrapper = styled.div`
	display: flex;
	align-items: center;
	span {
		color: #ffb900;
		font-size: 1rem;
		margin-right: 0.25rem;
	}
	p {
		margin-left: 0.5rem;
		margin-bottom: 0;
	}
	margin-bottom: 0.5rem;
`;

// Export
export default Stars;