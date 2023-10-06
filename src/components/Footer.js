// Imports
import React from 'react';
import styled from 'styled-components';

// Component
const Footer = () => {

	// Return
	return(
		<Wrapper>
			<h5>&copy; { new Date().getFullYear() }</h5>
			<span>Comfy Sloth</span>
			<h5>All rights reserved</h5>
		</Wrapper>
	);

};

// Styled
const Wrapper = styled.footer`
	height: 5rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: var(--clr-black);
	text-align: center;
	span {
		color: var(--clr-primary-5);
		font-size: 18px;
		margin: 0 10px 0 0;
	}
	h5 {
		color: var(--clr-white);
		margin: 0 10px 0 0;
		font-weight: 400;
		text-transform: none;
		line-height: 1.25;
		&:last-of-type{
			margin: 0;
		}
	}
	@media (min-width: 776px) {
		flex-direction: row;
	}
`;

// Export
export default Footer;