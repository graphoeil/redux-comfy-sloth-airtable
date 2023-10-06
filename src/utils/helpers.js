// Format price
export const formatPrice = (price) => {
	return Intl.NumberFormat('en-US', {
		style:'currency',
		currency:'USD'
	}).format(price / 100);
};

// Get unique values
export const getUniqueValues = (data, type) => {
	let unique = data.map((item) => {
		return item[type];
	});
	if (type === 'colors'){
		// Becase initialy colors is an array of array
		unique = unique.flat();
	}
	return ['all', ...new Set(unique)];
};