// Imports
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import { sortProduct, filterProducts } from "../store/features/productsSlice";
import { Filters, ProductList, Sort, PageHero } from '../components';

// Component
const ProductsPage = () => {

	// Store
	const { sort, filters } = useSelector((store) => { return store.products; });

	// Dispatch
	const dispatch = useDispatch();

	// Sort products when sort or filters change in store
	useEffect(() => {
		dispatch(filterProducts());
		dispatch(sortProduct());
	}, [dispatch, sort, filters]);

	// Return
	return(
		<main>
			<PageHero title="Products"/>
			<Wrapper className="page">
				<div className="section-center products">
					<Filters/>
					<div>
						<Sort/>
						<ProductList/>
					</div>
				</div>
			</Wrapper>
		</main>
	);

};

// Styled
const Wrapper = styled.div`
	.products {
		display: grid;
		gap: 3rem 1.5rem;
		margin: 4rem auto;
	}
	@media (min-width: 768px) {
		.products {
			grid-template-columns: 200px 1fr;
		}
	}
`;

// Export
export default ProductsPage;