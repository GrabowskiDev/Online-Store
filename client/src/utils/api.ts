async function fetchProduct(productId: number) {
	try {
		const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return await response.json();
	} catch (error) {
		console.error('Error fetching product:', error);
		throw error;
	}
}

async function fetchAllProducts() {
	try {
		const response = await fetch(`https://fakestoreapi.com/products`);
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return await response.json();
	} catch (error) {
		console.error('Error fetching product:', error);
		throw error;
	}
}

export { fetchProduct, fetchAllProducts };
