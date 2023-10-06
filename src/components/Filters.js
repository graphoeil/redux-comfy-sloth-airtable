// Imports
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import { updateFilters, clearFilters } from "../store/features/productsSlice";
import { getUniqueValues, formatPrice } from '../utils/helpers';
import { FaCheck } from 'react-icons/fa';

// Component
const Filters = () => {

	// Store
	const { filters:{ text, category, company, color, 
		minPrice, maxPrice, shipping }, products } = useSelector((store) => { return store.products; });

	// Dispatch
	const dispatch = useDispatch();

	// Send request with debouncing for search input
	const [value, setValue] = useState(text);
	useEffect(() => {
		const timerText = setTimeout(() => {
			dispatch(updateFilters({ name:'text', value:value }));
		}, 250);
		return () => {
			clearTimeout(timerText);
		}
	}, [dispatch, value]);

	// Send request with debouncing for price
	const [priceValue, setPriceValue] = useState(maxPrice);
	// Init
	// We must observe change in maxPrice, if not priceValue = 0 !
	useEffect(() => {
		setPriceValue(maxPrice);
	}, [maxPrice]);
	useEffect(() => {
		const timerPrice = setTimeout(() => {
			dispatch(updateFilters({ name:'price', value:priceValue }));
		}, 500);
		return () => {
			clearTimeout(timerPrice);
		}
	}, [dispatch, priceValue]);

	// Unique data
	/* We will extract from products for example all the categories, 
	then thanks to new Set() we return the list of categories without 
	duplicates to be able to map on them in the return ;-) */
	const categories = getUniqueValues(products, 'category');
	const companies = getUniqueValues(products, 'company');
	const colors = getUniqueValues(products, 'colors');

	// Clear filters
	const handleClearFilters = () => {
		setPriceValue(maxPrice);
		setValue('');
		dispatch(clearFilters());
	};

	// Init on mount
	// Remove it to keep products filtered while navigating ;-)
	useEffect(() => {
		setPriceValue(maxPrice);
		setValue('');
		dispatch(clearFilters());
	}, [dispatch, maxPrice]);

	// Return
	return(
		<Wrapper>
			<form onSubmit={ (e) => { e.preventDefault(); } }>

				{/* Search input */}
				<div className="form-control">
					<input type="text" placeholder="Search" 
						className="search-input" value={ value } 
						onChange={ (e) => { setValue(e.target.value); } }/>
				</div>
				{/* Search input */}

				{/* Category */}
				<div className="form-control">
					<h5>Category</h5>
					<div>
						{
							categories.map((cat, index) => {
								return(
									<button type="button" key={ index } 
										className={ cat === category ? 'active' : '' } 
										onClick={ () => { dispatch(updateFilters({ name:'category', value:cat })); } }>
										{ cat }
									</button>
								);
							})
						}
					</div>
				</div>
				{/* Category */}

				{/* Companies */}
				<div className="form-control">
					<h5>Company</h5>
					<select value={ company } 
						onChange={ (e) => { dispatch(updateFilters({ name:'company', value:e.target.value })); } }>
						{
							companies.map((company, index) => {
								return(
									<option key={ index } value={ company }>
										{ company.substring(0,1).toUpperCase() + company.substring(1) }
									</option>
								);
							})
						}
					</select>
				</div>
				{/* Companies */}

				{/* Colors */}
				<div className="form-control">
					<h5>Color</h5>
					<div className="colors">
						{
							colors.map((col, index) => {
								// All colors
								if (col === 'all'){
									return(
										<button key={ index } 
											className={ `all-btn ${ color === 'all' ? 'active' : '' }` } 
											onClick={ () => { dispatch(updateFilters({ name:'color', value:col })); } }>
											All
										</button>
									);
								}
								// Others colors
								return(
									<button key={ index } 
										className={ `color-btn ${ color === col ? 'active' : '' }` } 
										style={ { backgroundColor:col } }
										onClick={ () => { dispatch(updateFilters({ name:'color', value:col })); } }>
										{ color === col && <FaCheck/> }
									</button>
								);
							})
						}
					</div>
				</div>
				{/* Colors */}

				{/* Price */}
				<div className="form-control">
					<h5>Price</h5>
					<p className="price">{ formatPrice(priceValue) }</p>
					<input type="range" min={ minPrice } max={ maxPrice } value={ priceValue } 
						onChange={ (e) => { setPriceValue(Number(e.target.value)); } }/>
				</div>
				{/* Price */}

				{/* Shipping */}
				<div className="form-control shipping">
					<label htmlFor="shipping">Free shipping</label>
					<input type="checkbox" checked={ shipping } id="shipping" 
						onChange={ (e) => { dispatch(updateFilters({ name:'shipping', value:e.target.checked })); } }/>
				</div>
				{/* Shipping */}

			</form>

			{/* Clear filters */}
			<button type="button" className="clear-btn" onClick={ handleClearFilters }>
				Clear filters
			</button>
			{/* Clear filters */}

		</Wrapper>
	);

};

// Styled
const Wrapper = styled.section`
	.form-control {
		margin-bottom: 1.25rem;
		h5 {
			margin-bottom: 0.5rem;
		}
	}
	.search-input {
		padding: 0.5rem;
		background: var(--clr-grey-10);
		border-radius: var(--radius);
		border-color: transparent;
		letter-spacing: var(--spacing);
	}
	.search-input::placeholder {
		text-transform: capitalize;
	}

	button {
		display: block;
		margin: 0.25em 0;
		padding: 0.25rem 0;
		text-transform: capitalize;
		background: transparent;
		border: none;
		border-bottom: 1px solid transparent;
		letter-spacing: var(--spacing);
		color: var(--clr-grey-5);
		cursor: pointer;
	}
	.active {
		border-color: var(--clr-grey-5);
	}
	.company {
		background: var(--clr-grey-10);
		border-radius: var(--radius);
		border-color: transparent;
		padding: 0.25rem;
	}
	.colors {
		display: flex;
		align-items: center;
	}
	.color-btn {
		display: inline-block;
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		background: #222;
		margin-right: 0.5rem;
		border: none;
		cursor: pointer;
		opacity: 0.5;
		display: flex;
		align-items: center;
		justify-content: center;
		svg {
			font-size: 0.5rem;
			color: var(--clr-white);
		}
	}
	.all-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 0.5rem;
		opacity: 0.5;
	}
	.active {
		opacity: 1;
	}
	.all-btn .active {
		text-decoration: underline;
	}
	.price {
		margin-bottom: 0.25rem;
	}
	.shipping {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
		text-transform: capitalize;
		column-gap: 0.5rem;
		font-size: 1rem;
		max-width: 200px;
	}
	.clear-btn {
		background: var(--clr-red-dark);
		color: var(--clr-white);
		padding: 0.25rem 0.5rem;
		border-radius: var(--radius);
	}
	@media (min-width: 768px) {
		.content {
			position: sticky;
			top: 1rem;
		}
	}
`;

// Export
export default Filters;