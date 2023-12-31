// Imports
import React from 'react';
import styled from 'styled-components';
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { formatPrice } from '../utils/helpers';
import { Link } from 'react-router-dom';

// Component
const CartTotals = () => {

	// Store
	const { totalAmount, shippingFee } = useSelector((store) => { return store.cart; });
	const { myUser } = useSelector((store) => { return store.user; });
	
	// Auth0 login
	const { loginWithRedirect } = useAuth0();
	
	// Return
	return(
		<Wrapper>
			<div>
				<article>
					<h5>
						Subtotal : <span>{ formatPrice(totalAmount) }</span>
					</h5>
					<p>
						Shipping fee : <span>{ formatPrice(shippingFee) }</span>
					</p>
					<hr />
					<h4>
						Order total : <span>{ formatPrice(totalAmount + shippingFee) }</span>
					</h4>
				</article>
				{
					myUser
					? <Link to="/checkout" className="btn">
						Proceed to checkout
					</Link>
					: <button type="button" className="btn" onClick={ loginWithRedirect }>
						Login to checkout
					</button>
				}
			</div>
		</Wrapper>
	);
	
};

// Styled
const Wrapper = styled.section`
	margin-top: 3rem;
	display: flex;
	justify-content: center;
	article {
		border: 1px solid var(--clr-grey-8);
		border-radius: var(--radius);
		padding: 1.5rem 3rem;
	}
	h4, h5, p {
		display: grid;
		grid-template-columns: 200px 1fr;
	}
	p {
		text-transform: capitalize;
	}
	h4 {
		margin-top: 2rem;
	}
	@media (min-width: 776px) {
		justify-content: flex-end;
	}
	.btn {
		width: 100%;
		margin-top: 1rem;
		text-align: center;
		font-weight: 700;
	}
`;

// Export
export default CartTotals;