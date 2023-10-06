// Imports
import React from 'react';
import { GiCompass, GiDiamondHard, GiStabbedNote } from 'react-icons/gi';

// Links
export const links = [
	{
		id:1,
		text:'home',
		url:'/'
	},
	{
		id:2,
		text:'about',
		url:'/about'
	},
	{
		id:3,
		text:'products',
		url:'/products'
	}
];

// Services
export const services = [
	{
		id:1,
		icon:<GiCompass/>,
		title:'mission',
		text:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi'
	},
	{
		id:2,
		icon:<GiDiamondHard/>,
		title:'vision',
		text:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi'
	},
	{
		id:3,
		icon:<GiStabbedNote/>,
		title:'history',
		text:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi'
	}
];

// URLs
export const products_url = '/.netlify/functions/products';
export const single_product_url = `/.netlify/functions/single-product?id=`;