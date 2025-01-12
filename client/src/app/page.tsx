import SearchBar from '@/components/Home/SearchBar';
import styles from './page.module.css';
import { Container, Paper, Title } from '@mantine/core';
import ProductsGrid from '@/components/Home/ProductsGrid';

export default function Home() {
	return (
		<main className={styles.page}>
			<Container size="xl">
				<SearchBar />
				<Paper withBorder p="xl">
					<Title mb="xl">All products</Title>
					<ProductsGrid />
				</Paper>
			</Container>
		</main>
	);
}
