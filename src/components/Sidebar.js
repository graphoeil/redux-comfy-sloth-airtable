// Imports
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import { closeSidebar } from "../store/features/productsSlice";
import { links } from '../utils/constants';
import logo from '../assets/logo.svg';
import CartButtons from './CartButtons';

/* The sidebar is hidden on the left side, we make it appear when clicking 
on the mobile button  in Navbar.js via a translate(0) with transition, 
we close it here via a click, the whole thing is managed 
from productsSlice.js */

// Component
const Sidebar = () => {

	// Store
	const { isSidebarOpen } = useSelector((store) => { return store.products; });
	const { myUser } = useSelector((store) => { return store.user; });

	// Dispatch
	const dispatch = useDispatch();

	// Return
	return(
		<SidebarContainer>
			<aside className={ `sidebar ${ isSidebarOpen ? 'show-sidebar' : '' }` }>
				<div className="sidebar-header">
					<img src={ logo } alt="Comfy Sloth" className="logo" />
					<button type="button" className="close-btn" onClick={ () => { dispatch(closeSidebar()); } }>
						<FaTimes/>
					</button>
				</div>
				<ul className="links">
					{
						links.map((link) => {
							const { id, text, url } = link;
							return(
								<li key={ id }>
									<NavLink key={ id } to={ url } className={ ({ isActive }) => {
										return isActive ? 'active' : '';
									} } end onClick={ () => { dispatch(closeSidebar()); } }>
										{ text }
									</NavLink>
								</li>
							);
						})
					}
					{
						myUser && <li>
							<NavLink to="/checkout" className={ ({ isActive }) => {
								return isActive ? 'active' : '';
							} } end onClick={ () => { dispatch(closeSidebar()); } }>
								Checkout
							</NavLink>
						</li>
					}
				</ul>
				<CartButtons/>
			</aside>
		</SidebarContainer>
	);
	
};

// Styled
const SidebarContainer = styled.div`
	text-align: center;
	.sidebar-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 1.5rem;
	}
	.close-btn {
		font-size: 2rem;
		background: transparent;
		border-color: transparent;
		color: var(--clr-primary-5);
		transition: var(--transition);
		cursor: pointer;
		color: var(--clr-red-dark);
		margin-top: 0.2rem;
	}
	.close-btn:hover {
		color: var(--clr-red-light);
	}
	.logo {
		justify-self: center;
		height: 45px;
	}
	.links {
		margin-bottom: 2rem;
	}
	.links a {
		display: block;
		text-align: left;
		font-size: 1rem;
		text-transform: capitalize;
		padding: 1rem 1.5rem;
		color: var(--clr-grey-3);
		transition: var(--transition);
		letter-spacing: var(--spacing);
	}
	.links a:hover, .links a.active {
		padding: 1rem 1.5rem;
		padding-left: 2rem;
		background: var(--clr-grey-10);
		color: var(--clr-grey-2);
	}
	.sidebar {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: var(--clr-white);
		transition: var(--transition);
		transform: translate(-100%);
		z-index: -1;
	}
	.show-sidebar {
		transform: translate(0);
		z-index: 999;
	}
	.cart-btn-wrapper {
		margin: 2rem auto;
	}
	@media screen and (min-width: 992px) {
		.sidebar {
			display: none;
		}
	}
`;

// Export
export default Sidebar;