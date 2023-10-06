// Imports
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from "react-redux";
import Error from './Error';
import Loading from './Loading';
import Product from './Product';

// Component
const FeaturedProducts = () => {

	// Store
	const { featuredProducts:featured, productsLoading:loading, 
		productsError:error } = useSelector((store) => { return store.products; });

	// Returns
	if (loading){
		return <Loading/>;
	}
	if (error){
		return <Error/>;
	}
	return(
		<Wrapper className="section">
			<div className="title">
				<h2>Featured products</h2>
				<div className="underline"/>
			</div>
			<div className="section-center featured">
				{
					/* The slice method allows us here to map only the first 3 products, 
					to have the last 3 we use .slice(-3) */
					featured.slice(0,3).map((product) => {
						return <Product key={ product.id } { ...product }/>
					})
				}
			</div>
			<Link to="/products" className="btn">All products</Link>
		</Wrapper>
	);

};

// Styled
const Wrapper = styled.section`
	background: var(--clr-grey-10);
	.featured {
		margin: 4rem auto;
		display: grid;
		gap: 2.5rem;
		img {
			height: 225px;
		}
	}
	.btn {
		display: block;
		width: 148px;
		margin: 0 auto;
		text-align: center;
	}
	@media (min-width: 576px) {
		.featured {
			grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
		}
	}
`;

// Export
export default FeaturedProducts;