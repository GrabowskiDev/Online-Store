'use client';
import { Paper, Group, TextInput, MultiSelect, Box, Select, Button } from '@mantine/core';
import { useState } from 'react';

export default function SearchBar() {
	const [categories, setCategories] = useState<string[]>([]);
	const [sort, setSort] = useState<string | null>('');
	const categoryPlaceholder = 'Pick any you want';

	return (
		<Paper withBorder shadow="md" pt="md" pb="md" mb="xl">
			<Group align="end" justify="space-evenly" mb="lg">
				<Box w={300}>
					<TextInput label="Product name" placeholder="What are you looking for?" />
				</Box>
				<Box w={300}>
					<MultiSelect
						label="Category"
						placeholder={categories.length ? '' : categoryPlaceholder}
						data={["men's clothing", 'jewelery', 'electronics', "women's clothing"]}
						value={categories}
						onChange={setCategories}
					/>
				</Box>
				<Box w={300}>
					<Select
						label="Sort by"
						placeholder="Default"
						data={[
							'A-Z',
							'Z-A',
							'Price ascending',
							'Price descending',
							'Rating ascending',
							'Rating descending',
						]}
						value={sort}
						onChange={setSort}
					/>
				</Box>
				<Button variant="gradient" gradient={{ from: 'red', to: 'grape', deg: 138 }}>
					Search
				</Button>
			</Group>
		</Paper>
	);
}
