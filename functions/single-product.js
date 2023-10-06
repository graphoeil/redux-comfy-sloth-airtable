// Imports
require('dotenv').config();
const axios = require('axios');

// Handler
exports.handler = async(event, context, callback) => {
	// Product Id
	const productId = event.queryStringParameters.id;
	// Fetch single product
	if (productId){
		try {
			const response = await axios.get(`https://api.airtable.com/v0/${ process.env.REACT_APP_AIRTABLE_BASE }/${ process.env.REACT_APP_AIRTABLE_TABLE }/${ productId }`, {
				headers:{
					Authorization:`Bearer ${ process.env.REACT_APP_AIRTABLE_TOKEN }`
				}
			});
			// Product
			const { id, fields } = response.data;
			const product = { id, ...fields };
			// Return
			return {
				statusCode:200,
				body:JSON.stringify(product)
			};
		} catch (error){
			console.log(error);
			// Return
			return {
				statusCode:500,
				body:'There was an error'
			};
		}
	}
	// Not found ;-)
	return {
		statusCode:400,
		body:'Please provide a valid product id !'
	};
};