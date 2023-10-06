// Imports
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { useDispatch } from "react-redux";
import { addToCart } from "../store/features/cartSlice";
import AmountButtons from './AmountButtons';

// Component
const AddToCart = ({ product }) => {

	// Dispatch
	const dispatch = useDispatch();

	// Variables
	// colors is an array ['#000','#fa001']
	const { id, stock, colors } = product;

	// States
	const [amount, setAmount] = useState(1);
	const [mainColor, setMainColor] = useState(colors[0]);

	// Cart buttons event
	const increase = () => {
		setAmount((oldAmount) => {
			let tempAmount = oldAmount + 1;
			if (tempAmount > stock){
				tempAmount = stock;
			}
			return tempAmount;
		});
	};
	const decrease = () => {
		setAmount((oldAmount) => {
			let tempAmount = oldAmount - 1;
			if (tempAmount < 1){
				tempAmount = 1;
			}
			return tempAmount;
		});
	};
	
	// Return
	return(
		<Wrapper>
			<div className="colors">
				<span>Colors : </span>
				<div>
					{
						colors.map((color, index) => {
							return(
								<button type="button" key={ index } 
									className={ `color-btn ${ mainColor === color ? 'active' : '' }` }
									style={ { backgroundColor:color } } onClick={ () => { setMainColor(color); } }>
									{ mainColor === color && <FaCheck/> }
								</button>
							);
						})
					}
				</div>
			</div>
			<div className="btn-container">
				<AmountButtons increase={ increase } decrease={ decrease } amount={ amount }/>
				<Link to="/cart" className="btn" onClick={ () => { dispatch(addToCart({ id, color:mainColor, amount, product })) } }>
					Add to cart
				</Link>
			</div>
		</Wrapper>
	);

};

// Styled
const Wrapper = styled.section`
	margin-top: 2rem;
	.colors {
		display: grid;
		grid-template-columns: 125px 1fr;
		align-items: center;
		margin-bottom: 1rem;
		span {
			text-transform: capitalize;
			font-weight: 700;
		}
		div {
			display: flex;
		}
	}
	.color-btn {
		display: inline-block;
		width: 1.5rem;
		height: 1.5rem;
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
			font-size: 0.75rem;
			color: var(--clr-white);
		}
	}
	.active {
		opacity: 1;
	}
	.btn-container {
		margin-top: 2rem;
	}
	.btn {
		margin-top: 1rem;
		width: 140px;
	}
`;

// Export
export default AddToCart;