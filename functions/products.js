// Imports
require('dotenv').config();
const axios = require('axios');

// Handler
exports.handler = async(event, context, callback) => {
	// Fetch products
	try {
		const response = await axios.get(`https://api.airtable.com/v0/${ process.env.REACT_APP_AIRTABLE_BASE }/${ process.env.REACT_APP_AIRTABLE_TABLE }`, {
			headers:{
				Authorization:`Bearer ${ process.env.REACT_APP_AIRTABLE_TOKEN }`
			}
		});
		// Products
		const products = response.data.records.map((product) => {
			const { id, fields } = product;
			const { name, featured, price, colors, company, description, category, shipping, images } = fields;
			const { url } = images[0];
			return { id, name, featured, price, colors, company, description, category, shipping, image:url };
		});
		// Return
		return {
			statusCode:200,
			body:JSON.stringify(products)
		};
	} catch (error){
		console.log(error);
		// Return
		return {
			statusCode:500,
			body:'There was an error'
		};
	}
};