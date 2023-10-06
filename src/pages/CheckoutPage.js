// Imports
import React from 'react';
import styled from 'styled-components';
import { PageHero, StripeCheckout } from '../components';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

// Component
const CheckoutPage = () => {

	// Store
	const { cart } = useSelector((store) => { return store.cart; });

	// Return
	return(
		<main>
			<PageHero title="checkout"/>
			<Wrapper className="page">
				{
					cart.length < 1
					? <div className="empty">
						<h2>Your cart is empty...</h2>
						<Link to="/products" className="btn">Fill it !</Link>
					</div>
					: <StripeCheckout/>
				}
			</Wrapper>
		</main>
	);

};

// Styled
const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	.empty{
		text-align: center;
	}
`;

// Export
export default CheckoutPage;