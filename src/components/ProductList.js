// Imports
import React from 'react';
import { useSelector } from "react-redux";
import GridView from './GridView';
import ListView from './ListView';

// Component
const ProductList = () => {

	// Store
	const { filteredProducts:products, productsLoading:loading, 
		productsError:error, gridView } = useSelector((store) => { return store.products; });
	
	// Returns
	if (loading){
		return <div className="loading"/>;
	}
	if (error){
		return <h5 style={ { textTransform:'none' } }>Sorry, no product available...</h5>;
	}
	if (products.length < 1){
		return <h5 style={ { textTransform:'none' } }>Sorry, no product matched your search...</h5>
	}
	if (!gridView){
		return <ListView products={ products }/>
	}
	return <GridView products={ products }/>

};

// Export
export default ProductList;