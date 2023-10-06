// Imports
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "../store/features/productsSlice";
import { single_product_url as url } from '../utils/constants';
import { formatPrice } from '../utils/helpers';
import { Loading, Error, ProductImages, AddToCart, Stars, PageHero } from '../components';
import { Link } from 'react-router-dom';

// Component
const SingleProductPage = () => {

	// Store
	const { singleProduct:product, singleProductLoading:loading, 
		singleProductError:error } = useSelector((store) => { return store.products; });

	// Dispatch
	const dispatch = useDispatch();

	// Fetch single product
	const { id } = useParams();
	useEffect(() => {
		dispatch(fetchSingleProduct(`${ url }${ id }`));
	}, [id, dispatch]);

	// Returns
	if (loading){
		return(
			<Wrapper>
				<div className="section section-center page-100">
					<Loading/>
				</div>
			</Wrapper>
		)
	}
	if (error){
		return(
			<Wrapper>
				<div className="section section-center page-100">
					<Error redirect/>
				</div>
			</Wrapper>
		)
	}
	// Single product data
	const { id:sku, name, price, description, stock, stars, reviews, company, images } = product;
	return(
		<Wrapper>
			<PageHero title={ name } product/>
			<div className="section section-center page">
				<Link to="/products" className="btn">Back to products</Link>
				<div className="product-center">
					{ images?.length > 0 && <ProductImages images={ images }/> }
					<section className="content">
						<h2>{ name }</h2>
						<Stars stars={ stars } reviews={ reviews }/>
						<h5 className="price">{ formatPrice(price) }</h5>
						<p className="description">{ description }</p>
						<p className="info">
							<span>Available :</span>
							{ stock > 0 ? `${ stock } in stock` : 'Not available' }
						</p>
						<p className="info">
							<span>SKU : </span>{ sku }
						</p>
						<p className="info">
							<span>Brand :</span>{ company }
						</p>
						<hr />
						{ stock > 0 && <AddToCart product={ product }/> }
					</section>
				</div>
			</div>
		</Wrapper>
	);
};

// Styled
const Wrapper = styled.main`
	.product-center {
		display: grid;
		gap: 4rem;
		margin-top: 2rem;
	}
	.price {
		color: var(--clr-primary-5);
	}
	.desc {
		line-height: 2;
		max-width: 45em;
	}
	.info {
		text-transform: capitalize;
		width: 300px;
		display: grid;
		grid-template-columns: 125px 1fr;
		span {
			font-weight: 700;
		}
	}
	@media (min-width: 992px) {
		.product-center {
			grid-template-columns: 1fr 1fr;
			align-items: center;
		}
		.price {
			font-size: 1.25rem;
		}
	}
`;

// Export
export default SingleProductPage;