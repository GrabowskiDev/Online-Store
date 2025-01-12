'use client';
import SearchBar from '@/components/Home/SearchBar';
import styles from './page.module.css';
import { Container, Paper, Title } from '@mantine/core';
import ProductsGrid from '@/components/Home/ProductsGrid';
import { useState } from 'react';

export default function Home() {
	const [search, setSearch] = useState('');
	const [categories, setCategories] = useState<string[]>([]);
	const [sort, setSort] = useState<string | null>('');

	const handleSearch = (search: string, categories: string[], sort: string | null) => {
		setSearch(search);
		setCategories(categories);
		setSort(sort);
	};

	return (
		<main className={styles.page}>
			<Container size="xl">
				<SearchBar onSearch={handleSearch} />
				<Paper withBorder p="xl">
					<Title mb="xl">All products</Title>
					<ProductsGrid search={search} categories={categories} sort={sort} />
				</Paper>
			</Container>
		</main>
	);
}
