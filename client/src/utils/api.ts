import { SERVER_IP } from '../config/config';
import { notifications } from '@mantine/notifications';

async function fetchProduct(productId: number, useCache: boolean = true) {
	try {
		const response = await fetch(`https://fakestoreapi.com/products/${productId}`, {
			cache: useCache ? 'default' : 'no-store',
		});
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return await response.json();
	} catch (error) {
		console.error('Error fetching product:' + error + 'productId:' + productId);
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

async function addProductToCart(
	productId: number,
	quantity: number,
	token: string,
	price: number,
) {
	try {
		const response = await fetch(`${SERVER_IP}/cart`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ productId, quantity, price }),
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

async function deleteReview(reviewId: number, token: string | null) {
	try {
		const response = await fetch(`${SERVER_IP}/reviews/${reviewId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		if (response.ok) {
			notifications.show({
				title: 'Review deleted',
				message: 'Your review has been deleted',
				color: 'green',
			});
		} else {
			notifications.show({
				title: 'Error',
				message: 'An error has occured',
				color: 'red',
			});
		}
	} catch {
		notifications.show({
			title: 'Error',
			message: 'An error has occured',
			color: 'red',
		});
	}
}

export { fetchProduct, fetchAllProducts, addProductToCart, deleteReview };
