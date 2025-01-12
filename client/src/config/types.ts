export interface Product {
	id: number;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
	rating: { rate: number; count: number };
	quantity?: number;
}

export interface Review {
	id: number;
	userId: number;
	productId: number;
	text: string;
	rating: number;
	createdAt: string;
	updatedAt: string;
	username: string;
}
