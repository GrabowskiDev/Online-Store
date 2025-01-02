'use client';
import { Grid, Image } from '@mantine/core';
import ProductPageMenu from './ProductPageMenu';

export default function ProductArea() {
	// return (
	// 	<div
	// 		style={{
	// 			display: 'grid',
	// 			gridTemplateColumns: '1fr 1fr 1fr',
	// 			width: '100%',
	// 			height: '100%',
	// 		}}>
	// 		<div></div>
	// 		<div
	// 			style={{
	// 				display: 'flex',
	// 				alignItems: 'center',
	// 			}}>
	// 			<Image
	// 				src="/images/product.jpg"
	// 				alt="Product"
	// 				style={{
	// 					border: '1px solid black',
	// 					width: '90%',
	// 					height: '90%',
	// 					objectFit: 'cover',
	// 				}}
	// 			/>
	// 		</div>
	// 		<ProductPageMenu />
	// 	</div>
	// );
	return (
		<Grid>
			<Grid.Col span={2}></Grid.Col>
			<Grid.Col span={5} style={{ display: 'flex', justifyContent: 'center' }}>
				<Image
					src="/images/product.jpg"
					alt="Product"
					style={{
						border: '1px solid black',
						width: '85%',
						height: '85%',
						objectFit: 'cover',
					}}
					p="md"
				/>
			</Grid.Col>
			<Grid.Col p="none" span={3}>
				<ProductPageMenu />
			</Grid.Col>
			<Grid.Col span={2}></Grid.Col>
		</Grid>
	);
}
