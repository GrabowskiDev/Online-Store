import { SERVER_IP } from '../config/config';

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

async function addProductToCart(productId: number, quantity: number, token: string) {
	try {
		const response = await fetch(`${SERVER_IP}/cart`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ productId, quantity }),
		});

		if (!response.ok) {
			const errorData = await response.json();
			console.error('Error adding product to cart:', errorData);
			return null;
		}

		return response;
	} catch (error) {
		console.error('Network error adding product to cart:', error);
		return null;
	}
}

export { fetchProduct, fetchAllProducts, addProductToCart };
